import { NextRequest, NextResponse } from 'next/server';
import { and, eq, gt } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import { emailLoginTokens, teamMembers, teams, users } from '@/lib/db/schema';
import { createRawToken, hashToken } from '@/lib/auth/magic-link';
import { hashPassword, setSession } from '@/lib/auth/session';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/sign-in?error=invalid-link', request.url));
  }

  const tokenHash = hashToken(token);

  const [tokenRow] = await db
    .select()
    .from(emailLoginTokens)
    .where(
      and(
        eq(emailLoginTokens.tokenHash, tokenHash),
        eq(emailLoginTokens.used, false),
        gt(emailLoginTokens.expiresAt, new Date())
      )
    )
    .limit(1);

  if (!tokenRow) {
    return NextResponse.redirect(new URL('/sign-in?error=expired-link', request.url));
  }

  await db
    .update(emailLoginTokens)
    .set({ used: true })
    .where(eq(emailLoginTokens.id, tokenRow.id));

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, tokenRow.email))
    .limit(1);

  let signedInUser = user;

  if (!signedInUser) {
    const passwordHash = await hashPassword(createRawToken());

    const [createdUser] = await db
      .insert(users)
      .values({
        email: tokenRow.email,
        passwordHash,
        role: 'owner'
      })
      .returning();

    const [createdTeam] = await db
      .insert(teams)
      .values({
        name: `${tokenRow.email}'s Team`
      })
      .returning();

    await db.insert(teamMembers).values({
      userId: createdUser.id,
      teamId: createdTeam.id,
      role: 'owner'
    });

    signedInUser = createdUser;
  }

  await setSession(signedInUser);

  return NextResponse.redirect(new URL('/dashboard', request.url));
}
