#!/usr/bin/env node

/**
 * Email Service Setup Helper
 * This script helps configure email services for the application
 */

import fs from 'fs';
import path from 'path';

const ENV_FILE = './AR-project-backend/.env';
const ENV_EXAMPLE_FILE = './AR-project-backend/.env.example';

console.log('📧 Email Service Setup Helper');
console.log('=' .repeat(40));

// Check if .env file exists
if (!fs.existsSync(ENV_FILE)) {
  console.log('❌ .env file not found!');
  console.log('Please create a .env file in the AR-project-backend directory');
  process.exit(1);
}

// Read current .env file
let envContent = fs.readFileSync(ENV_FILE, 'utf8');

console.log('\n🔍 Current Email Configuration:');
console.log('=' .repeat(30));

// Check for existing email configurations
const emailConfigs = [
  { key: 'RESEND_API_KEY', name: 'Resend API Key', status: envContent.includes('RESEND_API_KEY=') ? '✅ Set' : '❌ Not set' },
  { key: 'SENDGRID_API_KEY', name: 'SendGrid API Key', status: envContent.includes('SENDGRID_API_KEY=') ? '✅ Set' : '❌ Not set' },
  { key: 'GMAIL_APP_PASSWORD', name: 'Gmail App Password', status: envContent.includes('GMAIL_APP_PASSWORD=') ? '✅ Set' : '❌ Not set' },
  { key: 'GMAIL_USER', name: 'Gmail User', status: envContent.includes('GMAIL_USER=') ? '✅ Set' : '❌ Not set' }
];

emailConfigs.forEach(config => {
  console.log(`${config.name}: ${config.status}`);
});

// Count configured services
const configuredServices = emailConfigs.filter(config => config.status.includes('✅')).length;
console.log(`\n📊 Configured services: ${configuredServices}/4`);

if (configuredServices === 0) {
  console.log('\n⚠️  No email services configured!');
  console.log('\n🚀 Quick Setup Options:');
  console.log('\n1. Resend (Recommended - Easy & Reliable)');
  console.log('   - Sign up at: https://resend.com');
  console.log('   - Get API key from dashboard');
  console.log('   - Add to .env: RESEND_API_KEY=re_your_key_here');
  console.log('   - Add to .env: RESEND_FROM_EMAIL=noreply@yourdomain.com');
  
  console.log('\n2. SendGrid (High Volume)');
  console.log('   - Sign up at: https://sendgrid.com');
  console.log('   - Get API key from dashboard');
  console.log('   - Add to .env: SENDGRID_API_KEY=SG.your_key_here');
  console.log('   - Add to .env: SENDGRID_FROM_EMAIL=noreply@yourdomain.com');
  
  console.log('\n3. Gmail (Current - May be unreliable)');
  console.log('   - Enable 2FA on Gmail account');
  console.log('   - Generate App Password');
  console.log('   - Add to .env: GMAIL_APP_PASSWORD=your_app_password');
  console.log('   - Add to .env: GMAIL_USER=your_email@gmail.com');
} else {
  console.log('\n✅ Email services are configured!');
  console.log('\n🧪 Test your email service:');
  console.log('   node test-email-service.js');
}

console.log('\n📝 Environment Variables Template:');
console.log('=' .repeat(35));
console.log(`
# Email Service Configuration (choose one or more)

# Resend (Recommended)
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=noreply@yourdomain.com
RESEND_FROM_NAME=AR CyberGuard

# SendGrid (Alternative)
SENDGRID_API_KEY=SG.your_api_key_here
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
SENDGRID_FROM_NAME=AR CyberGuard

# Gmail (Fallback - may be unreliable)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password
`);

console.log('\n🎯 Next Steps:');
console.log('1. Choose an email service from above');
console.log('2. Sign up and get API key');
console.log('3. Add environment variables to .env file');
console.log('4. Test with: node test-email-service.js');
console.log('5. Deploy with reliable email service');
