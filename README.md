# SOP Platform

Internal SOP knowledge base built with Next.js and Supabase.

## Features

- JWT cookie-based authentication (`/login`, `/api/auth/*`)
- Role-based access control (`admin` and `user`)
- SOP access per category with wildcard support (`"*"` grants all)
- Admin panel for user and category management
- Supabase-backed storage for users and categories

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Supabase (`@supabase/supabase-js`)
- Tailwind CSS
- `jose` for JWT
- `bcryptjs` for password hashing

## Prerequisites

- Node.js 18+ (recommended: current LTS)
- npm
- A Supabase project

## Environment Variables

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
JWT_SECRET=use-a-long-random-secret
```

Notes:

- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are required at startup.
- `JWT_SECRET` is used to sign the `sop_session` cookie.
- Keep real values private and rotate exposed credentials immediately.

## Database Setup (Supabase)

Run the SQL in `supabase/init.sql` against your Supabase database. It:

- Creates `users` and `categories` tables
- Seeds default SOP categories
- Enables RLS and permissive policies for current app behavior
- Inserts an optional bootstrap admin user:
  - email: `admin@example.com`
  - password: `admin123`

After first login, update this account or create a new admin and remove test credentials.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run start` - run production server
- `npm run setup` - legacy local JSON setup script (not used by current Supabase flow)

## App Routes

- `/login` - sign in
- `/dashboard` - list accessible SOP categories
- `/sop/[category]` - category SOP viewer
- `/admin` - admin-only management panel

## API Routes

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/admin/users`
- `POST /api/admin/users`
- `PUT /api/admin/users/[id]`
- `DELETE /api/admin/users/[id]`
- `GET /api/admin/categories`
- `PUT /api/admin/categories`

## Authentication Model

- User signs in via `POST /api/auth/login`.
- Password is verified with bcrypt hash from the `users` table.
- A signed JWT is stored in the `sop_session` HTTP-only cookie.
- Server components and API routes read and validate session data from this cookie.

## Access Control

- `admin` users can access `/admin` and admin APIs.
- `user` accounts can only access assigned categories.
- Category access is determined by `users.categories`:
  - Example: `["media-buying", "content-creation"]`
  - Wildcard: `["*"]` grants all categories
