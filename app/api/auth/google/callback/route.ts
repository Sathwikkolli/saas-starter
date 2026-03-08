import { and, eq, isNull } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db/drizzle';
import { hashPassword, setSession } from '@/lib/auth/session';
import { teamMembers, teams, users } from '@/lib/db/schema';

type GoogleUser = {
  email?: string;
  name?: string;
};

export async function GET(request: Request) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: 'Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET.' },
      { status: 500 }
    );
  }

  const url = new URL(request.url);
  const origin = url.origin;
  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI || `${origin}/api/auth/google/callback`;

  const code = url.searchParams.get('code');
  const returnedState = url.searchParams.get('state');
  const cookieStore = await cookies();
  const expectedState = cookieStore.get('google_oauth_state')?.value;

  if (!code || !returnedState || !expectedState || returnedState !== expectedState) {
    return NextResponse.redirect(new URL('/sign-in?error=oauth_state', origin));
  }

  cookieStore.delete('google_oauth_state');

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri
    })
  });

  if (!tokenResponse.ok) {
    return NextResponse.redirect(new URL('/sign-in?error=oauth_token', origin));
  }

  const tokenJson = (await tokenResponse.json()) as { access_token?: string };
  if (!tokenJson.access_token) {
    return NextResponse.redirect(new URL('/sign-in?error=oauth_token', origin));
  }

  const profileResponse = await fetch(
    'https://openidconnect.googleapis.com/v1/userinfo',
    {
      headers: { Authorization: `Bearer ${tokenJson.access_token}` }
    }
  );

  if (!profileResponse.ok) {
    return NextResponse.redirect(new URL('/sign-in?error=oauth_profile', origin));
  }

  const profile = (await profileResponse.json()) as GoogleUser;
  if (!profile.email) {
    return NextResponse.redirect(new URL('/sign-in?error=oauth_email', origin));
  }

  const existing = await db
    .select()
    .from(users)
    .where(and(eq(users.email, profile.email), isNull(users.deletedAt)))
    .limit(1);

  let user = existing[0];

  if (!user) {
    const passwordHash = await hashPassword(crypto.randomUUID());
    const createdUsers = await db
      .insert(users)
      .values({
        email: profile.email,
        name: profile.name ?? profile.email.split('@')[0],
        passwordHash,
        role: 'owner'
      })
      .returning();

    user = createdUsers[0];
    if (!user) {
      return NextResponse.redirect(new URL('/sign-in?error=oauth_user_create', origin));
    }
  }

  const memberRows = await db
    .select()
    .from(teamMembers)
    .where(eq(teamMembers.userId, user.id))
    .limit(1);

  if (memberRows.length === 0) {
    const createdTeams = await db
      .insert(teams)
      .values({ name: `${user.email}'s Team` })
      .returning();
    const team = createdTeams[0];
    if (!team) {
      return NextResponse.redirect(new URL('/sign-in?error=oauth_team_create', origin));
    }

    await db.insert(teamMembers).values({
      userId: user.id,
      teamId: team.id,
      role: 'owner'
    });
  }

  await setSession(user);
  return NextResponse.redirect(new URL('/dashboard', origin));
}

