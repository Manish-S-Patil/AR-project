import nodemailer from 'nodemailer'
import { Resend } from 'resend'

// Email service configuration with multiple providers
const EMAIL_CONFIG = {
  // Primary: Resend (recommended for production)
  resend: {
    enabled: !!process.env.RESEND_API_KEY,
    apiKey: process.env.RESEND_API_KEY,
    fromEmail: process.env.RESEND_FROM_EMAIL || 'noreply@yourdomain.com',
    fromName: process.env.RESEND_FROM_NAME || 'AR CyberGuard',
    client: process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
  },
  
  // Fallback: Gmail SMTP
  gmail: {
    enabled: !!process.env.GMAIL_APP_PASSWORD,
    transporter: nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER || "kns.cyber.project@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD || "cxgswgbywzxomcki",
      },
      connectionTimeout: 30000,
      greetingTimeout: 15000,
      socketTimeout: 30000,
      pool: false,
      tls: {
        rejectUnauthorized: false
      },
      debug: process.env.NODE_ENV === 'development',
      logger: process.env.NODE_ENV === 'development'
    }),
    fromEmail: process.env.GMAIL_USER || "kns.cyber.project@gmail.com",
    fromName: "AR CyberGuard"
  },
  
  // Alternative: SendGrid
  sendgrid: {
    enabled: !!process.env.SENDGRID_API_KEY,
    apiKey: process.env.SENDGRID_API_KEY,
    fromEmail: process.env.SENDGRID_FROM_EMAIL || 'noreply@yourdomain.com',
    fromName: process.env.SENDGRID_FROM_NAME || 'AR CyberGuard'
  }
}

// Email service class with multiple provider support
class EmailService {
  constructor() {
    this.providers = this.initializeProviders()
    this.primaryProvider = this.getPrimaryProvider()
  }

  initializeProviders() {
    const providers = []
    
    // Add Resend if available
    if (EMAIL_CONFIG.resend.enabled) {
      providers.push({
        name: 'resend',
        priority: 1,
        send: this.sendViaResend.bind(this)
      })
    }
    
    // Add SendGrid if available
    if (EMAIL_CONFIG.sendgrid.enabled) {
      providers.push({
        name: 'sendgrid',
        priority: 2,
        send: this.sendViaSendGrid.bind(this)
      })
    }
    
    // Add Gmail as fallback
    if (EMAIL_CONFIG.gmail.enabled) {
      providers.push({
        name: 'gmail',
        priority: 3,
        send: this.sendViaGmail.bind(this)
      })
    }
    
    return providers.sort((a, b) => a.priority - b.priority)
  }

  getPrimaryProvider() {
    return this.providers[0] || null
  }

  // Resend API implementation using SDK
  async sendViaResend(toEmail, subject, text, html) {
    try {
      const result = await EMAIL_CONFIG.resend.client.emails.send({
        from: `${EMAIL_CONFIG.resend.fromName} <${EMAIL_CONFIG.resend.fromEmail}>`,
        to: [toEmail],
        subject: subject,
        text: text,
        html: html || `<p>${text.replace(/\n/g, '<br>')}</p>`
      })
      
      console.log('📧 Resend: Email sent successfully:', result.data?.id)
      return { success: true, messageId: result.data?.id, provider: 'resend' }
    } catch (error) {
      console.error('📧 Resend error:', error.message)
      throw error
    }
  }

  // SendGrid API implementation
  async sendViaSendGrid(toEmail, subject, text, html) {
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${EMAIL_CONFIG.sendgrid.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: toEmail }],
            subject: subject
          }],
          from: {
            email: EMAIL_CONFIG.sendgrid.fromEmail,
            name: EMAIL_CONFIG.sendgrid.fromName
          },
          content: [
            {
              type: 'text/plain',
              value: text
            },
            {
              type: 'text/html',
              value: html || `<p>${text.replace(/\n/g, '<br>')}</p>`
            }
          ]
        })
      })

      if (response.ok) {
        console.log('📧 SendGrid: Email sent successfully')
        return { success: true, messageId: response.headers.get('x-message-id'), provider: 'sendgrid' }
      } else {
        const error = await response.text()
        throw new Error(`SendGrid API error: ${error}`)
      }
    } catch (error) {
      console.error('📧 SendGrid error:', error.message)
      throw error
    }
  }

  // Gmail SMTP implementation
  async sendViaGmail(toEmail, subject, text, html) {
    try {
      const info = await EMAIL_CONFIG.gmail.transporter.sendMail({
        from: `"${EMAIL_CONFIG.gmail.fromName}" <${EMAIL_CONFIG.gmail.fromEmail}>`,
        to: toEmail,
        subject: subject,
        text: text,
        html: html || `<p>${text.replace(/\n/g, '<br>')}</p>`
      })
      
      console.log('📧 Gmail: Email sent successfully:', info.messageId)
      return { success: true, messageId: info.messageId, provider: 'gmail' }
    } catch (error) {
      console.error('📧 Gmail error:', error.message)
      throw error
    }
  }

  // Main send method with fallback
  async sendEmail(toEmail, subject, text, html = null, retries = 3) {
    if (!this.primaryProvider) {
      throw new Error('No email providers configured')
    }

    for (let attempt = 1; attempt <= retries; attempt++) {
      for (const provider of this.providers) {
        try {
          console.log(`📧 Attempting to send email via ${provider.name} (attempt ${attempt}/${retries}) to: ${toEmail}`)
          
          const result = await provider.send(toEmail, subject, text, html)
          
          if (result.success) {
            console.log(`📧 Email sent successfully via ${provider.name}`)
            return result
          }
        } catch (error) {
          console.error(`📧 ${provider.name} attempt ${attempt} failed:`, error.message)
          
          // If this is the last provider and last attempt, throw error
          if (provider === this.providers[this.providers.length - 1] && attempt === retries) {
            throw new Error(`All email providers failed. Last error: ${error.message}`)
          }
          
          // Wait before trying next provider or retry
          if (attempt < retries) {
            const delay = Math.pow(2, attempt) * 1000
            console.log(`📧 Waiting ${delay}ms before retry...`)
            await new Promise(resolve => setTimeout(resolve, delay))
          }
        }
      }
    }
  }
}

// Create singleton instance
const emailService = new EmailService()

// Export functions for backward compatibility
export async function sendEmail(toEmail, toName, subject, text, retries = 3) {
  const html = `<p>${text.replace(/\n/g, '<br>')}</p>`
  return emailService.sendEmail(toEmail, subject, text, html, retries)
}

export async function sendVerificationCode(toEmail, code) {
  const subject = 'Verify your email - AR CyberGuard'
  const text = `Your verification code is: ${code}\n\nThis code expires in 15 minutes.\n\nIf you didn't request this code, please ignore this email.`
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">AR CyberGuard - Email Verification</h2>
      <p>Your verification code is:</p>
      <div style="background-color: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
        <span style="font-size: 32px; font-weight: bold; color: #1f2937; letter-spacing: 4px;">${code}</span>
      </div>
      <p>This code expires in 15 minutes.</p>
      <p style="color: #6b7280; font-size: 14px;">If you didn't request this code, please ignore this email.</p>
    </div>
  `
  return emailService.sendEmail(toEmail, subject, text, html)
}

export async function sendPasswordResetCode(toEmail, code) {
  const subject = 'Password Reset - AR CyberGuard'
  const text = `Your password reset code is: ${code}\n\nThis code expires in 15 minutes.\n\nIf you didn't request this code, please ignore this email.`
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #dc2626;">AR CyberGuard - Password Reset</h2>
      <p>Your password reset code is:</p>
      <div style="background-color: #fef2f2; padding: 20px; text-align: center; margin: 20px 0;">
        <span style="font-size: 32px; font-weight: bold; color: #dc2626; letter-spacing: 4px;">${code}</span>
      </div>
      <p>This code expires in 15 minutes.</p>
      <p style="color: #6b7280; font-size: 14px;">If you didn't request this code, please ignore this email.</p>
    </div>
  `
  return emailService.sendEmail(toEmail, subject, text, html)
}

// Export the service instance for advanced usage
export { emailService }

// Log available providers on startup
console.log('📧 Email service initialized with providers:', emailService.providers.map(p => p.name).join(', '))
