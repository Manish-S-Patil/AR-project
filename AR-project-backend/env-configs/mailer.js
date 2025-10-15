import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend'

const apiToken = process.env.MAILERSEND_API_TOKEN
const fromEmail = process.env.MAILERSEND_FROM_EMAIL
const fromName = process.env.MAILERSEND_FROM_NAME || 'AR CyberGuard'
const subjectPrefix = process.env.MAILERSEND_SUBJECT_PREFIX || '[AR CyberGuard]'

let client = null
if (apiToken) {
  client = new MailerSend({ apiKey: apiToken })
}

export async function sendEmail(toEmail, toName, subject, text) {
  if (!client || !fromEmail) {
    // Fallback to console when not configured
    console.log('📧 (dev) email to', toEmail, subject, text)
    return { queued: false }
  }
  try {
    const sentFrom = new Sender(fromEmail, fromName)
    const recipients = [new Recipient(toEmail, toName || toEmail)]
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(`${subjectPrefix} ${subject}`)
      .setText(text)

    await client.email.send(emailParams)
    return { queued: true }
  } catch (e) {
    console.error('MailerSend error:', e)
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


