import nodemailer from 'nodemailer'

// SMTP config from environment
const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com'
const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10)
const smtpSecure = String(process.env.SMTP_SECURE || 'true') === 'true'
const smtpUser = process.env.SMTP_USER
const smtpPass = process.env.SMTP_PASS

// Create transporter
const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  auth: smtpUser && smtpPass ? { user: smtpUser, pass: smtpPass } : undefined,
})

const fromEmail = process.env.MAIL_FROM_EMAIL || smtpUser || 'no-reply@example.com'
const fromName = process.env.MAIL_FROM_NAME || 'AR CyberGuard'
const subjectPrefix = process.env.MAIL_SUBJECT_PREFIX || 'AR CyberGuard Verification Code'

export async function sendEmail(toEmail, toName, subject, text) {
  try {
    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: toEmail,
      subject: `${subjectPrefix} ${subject}`,
      text: text,
      html: `<p>${text.replace(/\n/g, '<br>')}</p>`
    })
    
    console.log('📧 Email sent:', info.messageId)
    console.log('📧 Preview URL:', nodemailer.getTestMessageUrl(info))
    return { queued: true, messageId: info.messageId }
  } catch (e) {
    console.error('Nodemailer error:', e)
    return { queued: false, error: e?.message }
  }
}

export async function sendVerificationCode(toEmail, code) {
  const subject = 'Verify your email'
  const text = `Your verification code is: ${code}\n\nThis code expires in 15 minutes.`
  return sendEmail(toEmail, toEmail, subject, text)
}

export async function sendPasswordResetCode(toEmail, code) {
  const subject = 'Password reset code'
  const text = `Your password reset code is: ${code}\n\nThis code expires in 15 minutes.`
  return sendEmail(toEmail, toEmail, subject, text)
}


