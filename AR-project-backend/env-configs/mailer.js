const nodemailer = require('nodemailer')

// Create transporter using Ethereal test account
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "x5iku2entcjnkqdp@ethereal.email",
    pass: "S3j2yXqK8F2kJ44bSS",
  },
})

const fromEmail = "x5iku2entcjnkqdp@ethereal.email"
const fromName = "AR CyberGuard"
const subjectPrefix = "[AR CyberGuard]"

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


