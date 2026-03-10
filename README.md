# SaaS Starter Platform (Next.js + Stripe)

A full-stack SaaS platform built using **Next.js**, featuring authentication, team management, subscription billing with Stripe, and a secure dashboard for authenticated users.

This project demonstrates the architecture required for modern SaaS applications including **role-based access control, payment workflows, protected APIs, and database-backed user management**.

**Live Demo:**  
https://saas-starter-nine-inky.vercel.app

---

# Overview

This project implements a SaaS application skeleton where users can:

- Create accounts
- Manage teams
- Subscribe to paid plans
- Access protected dashboard features
- Manage billing through Stripe

The application uses a **modern full-stack Next.js architecture** with server actions, middleware, and PostgreSQL-backed data storage.

---

# Features

## Authentication System

- Email and password authentication
- Secure session handling using JWT tokens stored in cookies
- Protected routes using Next.js middleware

---

## User Dashboard

Authenticated users get access to a dashboard where they can:

- Manage their profile
- Create or join teams
- Perform CRUD operations on team members
- View account activity

---

## Role Based Access Control (RBAC)

The system includes basic RBAC with two roles:

| Role | Permissions |
|-----|-------------|
| Owner | Manage team members and billing |
| Member | Limited access to team resources |

---

## Subscription Billing

Stripe integration enables SaaS billing workflows:

- Pricing page connected to Stripe Checkout
- Subscription lifecycle management
- Billing management via Stripe Customer Portal
- Webhook support for subscription updates

---

## Activity Logging

An event logging system tracks important actions such as:

- User registration
- Login events
- Team creation
- Subscription changes

This allows monitoring and auditing of application activity.

---

# Tech Stack

| Layer | Technology |
|------|------------|
| Framework | Next.js |
| Frontend | React |
| Database | PostgreSQL |
| ORM | Drizzle ORM |
| Payments | Stripe |
| UI Components | shadcn/ui |
| Validation | Zod |
| Deployment | Vercel |

---

