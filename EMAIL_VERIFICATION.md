## Email Verification Flow (Frontend + Backend)

### Overview
- Signup is a staged flow: Email → Code → Password.
- Backend sends a 6‑digit verification code via SMTP (Gmail in dev/prod).
- Redis is used for caching and cooldowns (optional but recommended).

### Environment Setup
Backend `.env` keys (examples):
- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=465`
- `SMTP_SECURE=true`
- `SMTP_USER=your@gmail.com`
- `SMTP_PASS=your_app_password`
- `MAIL_FROM_EMAIL=your@gmail.com`
- `MAIL_FROM_NAME=AR CyberGuard`

Optional:
- `REDIS_URL=redis://localhost:6379`

Frontend `.env` (Vite):
- `VITE_API_URL=https://your-backend-host`

### Backend Endpoints
- `POST /api/auth/register` → creates unverified user, sends code, returns token
- `POST /api/auth/verify-email` → body: `{ email, code }` → sets `isVerified=true`
- `POST /api/auth/resend-code` → body: `{ email }` → rate-limited via Redis
- `POST /api/auth/change-password` → sets real password after verification (Bearer token required)

### Frontend Flow
1) Email step: Submit `username` + `email` → call register → show Code step
2) Code step: Enter 6‑digit code → verify → show Password step
   - Include a Resend button with visible cooldown timer (e.g., 60s)
3) Password step: Set strong password → call change‑password with token

### Resend Cooldown (Recommended)
- Backend: store `resend:EMAIL` in Redis with TTL (e.g., 60s). If key exists, reject.
- Frontend: show countdown on Resend button; disable until 0.

### Production Notes
- Use Gmail App Password or a transactional email provider.
- Configure SPF/DKIM to reduce Spam classification.
- Do not commit SMTP credentials; use environment variables.


