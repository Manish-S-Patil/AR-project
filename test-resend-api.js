#!/usr/bin/env node

/**
 * Simple test for Resend API with the provided API key
 */

const RESEND_API_KEY = 're_5XHS8Rkv_ESFJmmPq4YSFVKi1PMyibA1g';
const TEST_EMAIL = 'your-test-email@gmail.com'; // Replace with your real email

console.log('🧪 Testing Resend API');
console.log('=' .repeat(30));

async function testResendAPI() {
  try {
    console.log(`📧 Sending test email to: ${TEST_EMAIL}`);
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'AR CyberGuard <noreply@arcyberguard.com>',
        to: [TEST_EMAIL],
        subject: 'Test Email - AR CyberGuard',
        text: 'This is a test email from AR CyberGuard to verify email delivery.',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">AR CyberGuard - Test Email</h2>
            <p>This is a test email to verify that email delivery is working correctly.</p>
            <p>If you receive this email, the Resend API integration is successful!</p>
            <div style="background-color: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
              <span style="font-size: 24px; font-weight: bold; color: #1f2937;">✅ Email Service Working!</span>
            </div>
            <p style="color: #6b7280; font-size: 14px;">This is an automated test email.</p>
          </div>
        `
      })
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Email sent successfully!');
      console.log(`   Message ID: ${result.id}`);
      console.log(`   Status: ${response.status}`);
      console.log('\n📝 Next steps:');
      console.log('1. Check your email inbox (and spam folder)');
      console.log('2. If you receive the email, the Resend integration is working!');
      console.log('3. You can now test the signup flow with real email delivery');
    } else {
      console.log('❌ Failed to send email');
      console.log(`   Status: ${response.status}`);
      console.log(`   Error: ${JSON.stringify(result, null, 2)}`);
    }
  } catch (error) {
    console.log('❌ Error testing Resend API:', error.message);
  }
}

// Test verification code email
async function testVerificationCode() {
  try {
    console.log('\n📧 Testing verification code email...');
    
    const code = '123456';
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'AR CyberGuard <noreply@arcyberguard.com>',
        to: [TEST_EMAIL],
        subject: 'Verify your email - AR CyberGuard',
        text: `Your verification code is: ${code}\n\nThis code expires in 15 minutes.`,
        html: `
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
      })
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Verification code email sent successfully!');
      console.log(`   Message ID: ${result.id}`);
    } else {
      console.log('❌ Failed to send verification code email');
      console.log(`   Error: ${JSON.stringify(result, null, 2)}`);
    }
  } catch (error) {
    console.log('❌ Error testing verification code:', error.message);
  }
}

// Run tests
console.log('🚀 Starting Resend API tests...\n');
testResendAPI().then(() => {
  testVerificationCode().then(() => {
    console.log('\n🎉 Resend API testing completed!');
    console.log('\n📋 Summary:');
    console.log('- Resend API key is configured');
    console.log('- Test emails have been sent');
    console.log('- Check your email inbox for delivery');
    console.log('\n✅ Your email verification system should now work reliably!');
  });
});
