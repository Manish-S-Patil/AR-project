import nodemailer from 'nodemailer'

// Create transporter using Gmail SMTP with timeout settings
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL_USER || "kns.cyber.project@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD || "cxgswgbywzxomcki",
  },
  connectionTimeout: 60000, // 60 seconds
  greetingTimeout: 30000,   // 30 seconds
  socketTimeout: 60000,     // 60 seconds
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  rateDelta: 20000, // 20 seconds between messages
  rateLimit: 5,      // max 5 messages per rateDelta
})

const fromEmail = process.env.GMAIL_USER || "kns.cyber.project@gmail.com"
const fromName = "AR CyberGuard"
const subjectPrefix = "AR CyberGuard Verification Code"

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


