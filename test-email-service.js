#!/usr/bin/env node

/**
 * Test script for the improved email service
 * This script tests email delivery with different providers
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, 'AR-project-backend', '.env') });

import { sendVerificationCode, sendPasswordResetCode, emailService } from './AR-project-backend/env-configs/mailer-improved.js';

const TEST_EMAIL = 'your-test-email@gmail.com'; // Replace with your real email

console.log('🧪 Testing Improved Email Service');
console.log('=' .repeat(50));

// Test 1: Check available providers
console.log('\n📋 Available Email Providers:');
emailService.providers.forEach((provider, index) => {
  console.log(`${index + 1}. ${provider.name} (priority: ${provider.priority})`);
});

if (emailService.primaryProvider) {
  console.log(`\n🎯 Primary provider: ${emailService.primaryProvider.name}`);
} else {
  console.log('\n❌ No email providers configured!');
  console.log('Please set up at least one email service:');
  console.log('- RESEND_API_KEY for Resend');
  console.log('- SENDGRID_API_KEY for SendGrid');
  console.log('- GMAIL_APP_PASSWORD for Gmail');
  process.exit(1);
}

// Test 2: Send verification code
console.log(`\n📧 Testing verification code to: ${TEST_EMAIL}`);
try {
  const result = await sendVerificationCode(TEST_EMAIL, '123456');
  
  if (result.success) {
    console.log('✅ Verification code sent successfully!');
    console.log(`   Provider: ${result.provider}`);
    console.log(`   Message ID: ${result.messageId}`);
  } else {
    console.log('❌ Failed to send verification code');
    console.log(`   Error: ${result.error}`);
  }
} catch (error) {
  console.log('❌ Error sending verification code:', error.message);
}

// Test 3: Send password reset code
console.log(`\n🔐 Testing password reset code to: ${TEST_EMAIL}`);
try {
  const result = await sendPasswordResetCode(TEST_EMAIL, '789012');
  
  if (result.success) {
    console.log('✅ Password reset code sent successfully!');
    console.log(`   Provider: ${result.provider}`);
    console.log(`   Message ID: ${result.messageId}`);
  } else {
    console.log('❌ Failed to send password reset code');
    console.log(`   Error: ${result.error}`);
  }
} catch (error) {
  console.log('❌ Error sending password reset code:', error.message);
}

console.log('\n' + '='.repeat(50));
console.log('🎉 Email service test completed!');
console.log('\n📝 Next steps:');
console.log('1. Check your email inbox (and spam folder)');
console.log('2. If no emails received, try setting up Resend or SendGrid');
console.log('3. Check server logs for detailed error information');
console.log('4. Update environment variables with your email service API keys');
