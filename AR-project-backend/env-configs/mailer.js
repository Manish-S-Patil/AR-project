import nodemailer from 'nodemailer'

// Create transporter using Gmail SMTP with improved timeout settings
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // Changed to 587 for better compatibility
  secure: false, // false for 587, true for 465
  auth: {
    user: process.env.GMAIL_USER || "kns.cyber.project@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD || "cxgswgbywzxomcki",
  },
  connectionTimeout: 30000, // 30 seconds
  greetingTimeout: 15000,   // 15 seconds
  socketTimeout: 30000,     // 30 seconds
  pool: false, // Disable pooling to avoid connection issues
  tls: {
    rejectUnauthorized: false // Allow self-signed certificates
  },
  debug: false, // Set to true for debugging
  logger: false // Disable logging to reduce noise
})

const fromEmail = process.env.GMAIL_USER || "kns.cyber.project@gmail.com"
const fromName = "AR CyberGuard"
const subjectPrefix = "AR CyberGuard Verification Code"

export async function sendEmail(toEmail, toName, subject, text, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`📧 Attempting to send email (attempt ${attempt}/${retries}) to: ${toEmail}`)
      
      const info = await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: toEmail,
        subject: `${subjectPrefix} ${subject}`,
        text: text,
        html: `<p>${text.replace(/\n/g, '<br>')}</p>`
      })
      
      console.log('📧 Email sent successfully:', info.messageId)
      console.log('📧 Preview URL:', nodemailer.getTestMessageUrl(info))
      return { queued: true, messageId: info.messageId }
    } catch (e) {
      console.error(`📧 Email attempt ${attempt} failed:`, e.message)
      
      if (attempt === retries) {
        console.error('📧 All email attempts failed')
        return { queued: false, error: e?.message }
      }
      
      // Wait before retrying (exponential backoff)
      const delay = Math.pow(2, attempt) * 1000
      console.log(`📧 Waiting ${delay}ms before retry...`)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
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


