## Backend Setup Guide

### Prerequisites
- Node.js 18+
- PostgreSQL (DATABASE_URL)
- Redis (optional but recommended)

### Install
```
npm install
npx prisma generate
```

### Environment Variables (.env)
Required:
- `DATABASE_URL=postgresql://USER:PASS@HOST:PORT/DB`
- `JWT_SECRET=your-jwt-secret`

SMTP (Gmail example):
- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=465`
- `SMTP_SECURE=true`
- `SMTP_USER=your@gmail.com`
- `SMTP_PASS=app_password`
- `MAIL_FROM_EMAIL=your@gmail.com`
- `MAIL_FROM_NAME=AR CyberGuard`
- `MAIL_SUBJECT_PREFIX=[AR CyberGuard]`

Redis (optional):
- `REDIS_URL=redis://localhost:6379`

Other (optional):
- `REFRESH_TTL_DAYS=30`
- `JWT_EXPIRES_IN=7d`

### Run Locally
```
npx prisma db push
npm start
```

### Email Verification Flow
- `POST /api/auth/register` → creates user (unverified) + emails 6‑digit code.
- `POST /api/auth/verify-email` `{ email, code }` → verifies email.
- `POST /api/auth/resend-code` `{ email }` → 60s cooldown enforced via Redis.
- `POST /api/auth/change-password` → set real password after verification (Bearer token).

### Redis Usage
- Caching users list: `users:all`.
- Resend code cooldown: `verify:resend:<email>` (TTL 60s).

### Admin APIs
- `GET /api/auth/admin/users`
- `DELETE /api/auth/admin/user/:id` (cannot delete admins)

### Health
- `GET /` → basic status JSON

### Deployment Notes
- Ensure env vars are set in the host (DB, SMTP, JWT, REDIS).
- If Redis is unavailable, app continues without caching.


