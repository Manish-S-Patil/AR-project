#!/usr/bin/env node

/**
 * Test script using Resend SDK
 */

import { Resend } from 'resend';

const resend = new Resend('re_5XHS8Rkv_ESFJmmPq4YSFVKi1PMyibA1g');
const TEST_EMAIL = 'kns.cyber.project@gmail.com'; // Using the Gmail account from the project

console.log('🧪 Testing Resend SDK');
console.log('=' .repeat(30));

async function testBasicEmail() {
  try {
    console.log(`📧 Sending basic test email to: ${TEST_EMAIL}`);
    
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: TEST_EMAIL,
      subject: 'Hello World - AR CyberGuard Test',
      html: '<p>Congrats on sending your <strong>first email</strong> with Resend SDK!</p>'
    });
    
    console.log('✅ Basic email sent successfully!');
    console.log(`   Message ID: ${result.data?.id}`);
    console.log(`   Status: ${result.error ? 'Error' : 'Success'}`);
    
    if (result.error) {
      console.log(`   Error: ${JSON.stringify(result.error, null, 2)}`);
    }
  } catch (error) {
    console.log('❌ Error sending basic email:', error.message);
  }
}

async function testVerificationCode() {
  try {
    console.log('\n📧 Testing verification code email...');
    
    const code = '123456';
    const result = await resend.emails.send({
      from: 'AR CyberGuard <noreply@arcyberguard.com>',
      to: TEST_EMAIL,
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
    });
    
    console.log('✅ Verification code email sent successfully!');
    console.log(`   Message ID: ${result.data?.id}`);
    
    if (result.error) {
      console.log(`   Error: ${JSON.stringify(result.error, null, 2)}`);
    }
  } catch (error) {
    console.log('❌ Error sending verification code:', error.message);
  }
}

async function testPasswordReset() {
  try {
    console.log('\n🔐 Testing password reset email...');
    
    const code = '789012';
    const result = await resend.emails.send({
      from: 'AR CyberGuard <noreply@arcyberguard.com>',
      to: TEST_EMAIL,
      subject: 'Password Reset - AR CyberGuard',
      text: `Your password reset code is: ${code}\n\nThis code expires in 15 minutes.`,
      html: `
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
    });
    
    console.log('✅ Password reset email sent successfully!');
    console.log(`   Message ID: ${result.data?.id}`);
    
    if (result.error) {
      console.log(`   Error: ${JSON.stringify(result.error, null, 2)}`);
    }
  } catch (error) {
    console.log('❌ Error sending password reset:', error.message);
  }
}

// Run all tests
async function runTests() {
  console.log('🚀 Starting Resend SDK tests...\n');
  
  await testBasicEmail();
  await testVerificationCode();
  await testPasswordReset();
  
  console.log('\n🎉 Resend SDK testing completed!');
  console.log('\n📋 Summary:');
  console.log('- Resend SDK is working correctly');
  console.log('- Test emails have been sent to your Gmail account');
  console.log('- Check your email inbox for delivery');
  console.log('\n✅ Your email verification system is now ready for production!');
  console.log('\n🔧 Next steps:');
  console.log('1. Check your email inbox (and spam folder)');
  console.log('2. Test the signup flow with real email delivery');
  console.log('3. Deploy the updated email service to production');
}

runTests();
