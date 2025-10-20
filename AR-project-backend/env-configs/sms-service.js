import request from 'request';

const MESSAGECENTRAL_CONFIG = {
  baseUrl: 'https://cpaas.messagecentral.com/verification/v3/send',
  customerId: process.env.MESSAGECENTRAL_CUSTOMER_ID || 'C-F9DBF9664CE5487',
  senderId: process.env.MESSAGECENTRAL_SENDER_ID || 'UTOMOB',
  authToken: process.env.MESSAGECENTRAL_AUTH_TOKEN || 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDLUY5REJGOTY2NENFNTQ4NyIsImlhdCI6MTc2MDg3MTg4OCwiZXhwIjoxOTE4NTUxODg4fQ.NmZPs5nBesV61UjmA8GG_8bCIfNVWScXYCgRyKLGYqcizZpxOEIXTs-AFckR0kP0LuSA5XD1q0IKKO1l6-mx-g',
  countryCode: process.env.MESSAGECENTRAL_COUNTRY_CODE || '91',
  flowType: process.env.MESSAGECENTRAL_FLOW_TYPE || 'OTP', // OTP recommended for Verify Now
  type: process.env.MESSAGECENTRAL_TYPE || 'SMS',
  // Optional: strict template exactly as approved on DLT (India)
  template: process.env.MESSAGECENTRAL_MESSAGE_TEMPLATE || 'Your verification code is: {CODE}. This code expires in 15 minutes.'
};

function normalizePhoneNumber(rawPhone, countryCode = '91') {
  if (!rawPhone) return '';
  const digits = String(rawPhone).replace(/\D/g, '');
  // Strip leading country code if present
  if (digits.startsWith(countryCode)) {
    return digits.slice(countryCode.length);
  }
  // If starts with 0 and length > 10, trim leading zeros
  return digits.replace(/^0+/, '');
}

function buildMessageFromTemplate(code) {
  return MESSAGECENTRAL_CONFIG.template.replace('{CODE}', code);
}

/**
 * Send SMS verification code via MessageCentral
 * @param {string} phoneNumber - Phone number (without country code)
 * @param {string} code - Verification code
 * @param {string} countryCode - Country code (default: 91 for India)
 * @returns {Promise<{success: boolean, messageId?: string, error?: string}>}
 */
export async function sendSmsVerificationCode(phoneNumber, code, countryCode = MESSAGECENTRAL_CONFIG.countryCode) {
  try {
    const normalized = normalizePhoneNumber(phoneNumber, countryCode);
    const message = buildMessageFromTemplate(code);

    console.log(`📱 Sending SMS verification code ${code} to +${countryCode}${normalized}`);

    const params = new URLSearchParams({
      countryCode: String(countryCode),
      customerId: MESSAGECENTRAL_CONFIG.customerId,
      senderId: MESSAGECENTRAL_CONFIG.senderId,
      type: MESSAGECENTRAL_CONFIG.type,
      flowType: MESSAGECENTRAL_CONFIG.flowType, // Use OTP flow when possible
      mobileNumber: normalized,
      message: message
    });

    const options = {
      method: 'POST',
      url: `${MESSAGECENTRAL_CONFIG.baseUrl}?${params.toString()}`,
      headers: {
        'authToken': MESSAGECENTRAL_CONFIG.authToken,
        'Content-Type': 'application/json'
      }
    };

    return new Promise((resolve) => {
      request(options, function (error, response) {
        if (error) {
          console.error('📱 MessageCentral SMS Error:', error);
          resolve({
            success: false,
            error: error.message || 'Failed to send SMS'
          });
          return;
        }

        try {
          const responseBody = JSON.parse(response.body);
          console.log('📱 MessageCentral SMS Response:', responseBody);

          // Success heuristics based on Verify Now docs/examples
          const topLevelOk = (response.statusCode >= 200 && response.statusCode < 300);
          const bodyOk = (responseBody.message === 'SUCCESS' || responseBody.status === 'success' || responseBody.responseCode === 200 || responseBody.responseCode === '200');
          const dataOk = responseBody.data && (responseBody.data.responseCode === '200' || responseBody.data.status === 'success');

          if (topLevelOk && (bodyOk || dataOk)) {
            const verificationId = responseBody.data?.verificationId || responseBody.verificationId;
            const messageId = responseBody.messageId || responseBody.id || verificationId || 'unknown';
            resolve({
              success: true,
              messageId,
              verificationId,
              provider: 'MessageCentral'
            });
          } else {
            resolve({
              success: false,
              error: responseBody.message || responseBody.error || responseBody.data?.message || `HTTP ${response.statusCode}`
            });
          }
        } catch (parseError) {
          console.error('📱 MessageCentral Response Parse Error:', parseError);
          resolve({
            success: false,
            error: 'Invalid response from SMS service'
          });
        }
      });
    });

  } catch (error) {
    console.error('📱 MessageCentral SMS Service Error:', error);
    return {
      success: false,
      error: error.message || 'SMS service unavailable'
    };
  }
}

/**
 * Send password reset SMS via MessageCentral
 * @param {string} phoneNumber - Phone number (without country code)
 * @param {string} code - Reset code
 * @param {string} countryCode - Country code (default: 91 for India)
 * @returns {Promise<{success: boolean, messageId?: string, error?: string}>}
 */
export async function sendPasswordResetSms(phoneNumber, code, countryCode = MESSAGECENTRAL_CONFIG.countryCode) {
  try {
    const normalized = normalizePhoneNumber(phoneNumber, countryCode);
    const message = buildMessageFromTemplate(code);

    console.log(`📱 Sending password reset SMS code ${code} to +${countryCode}${normalized}`);

    const params = new URLSearchParams({
      countryCode: String(countryCode),
      customerId: MESSAGECENTRAL_CONFIG.customerId,
      senderId: MESSAGECENTRAL_CONFIG.senderId,
      type: MESSAGECENTRAL_CONFIG.type,
      flowType: MESSAGECENTRAL_CONFIG.flowType,
      mobileNumber: normalized,
      message: message
    });

    const options = {
      method: 'POST',
      url: `${MESSAGECENTRAL_CONFIG.baseUrl}?${params.toString()}`,
      headers: {
        'authToken': MESSAGECENTRAL_CONFIG.authToken,
        'Content-Type': 'application/json'
      }
    };

    return new Promise((resolve) => {
      request(options, function (error, response) {
        if (error) {
          console.error('📱 MessageCentral Password Reset SMS Error:', error);
          resolve({
            success: false,
            error: error.message || 'Failed to send password reset SMS'
          });
          return;
        }

        try {
          const responseBody = JSON.parse(response.body);
          console.log('📱 MessageCentral Password Reset SMS Response:', responseBody);

          const topLevelOk = (response.statusCode >= 200 && response.statusCode < 300);
          const bodyOk = (responseBody.message === 'SUCCESS' || responseBody.status === 'success' || responseBody.responseCode === 200 || responseBody.responseCode === '200');
          const dataOk = responseBody.data && (responseBody.data.responseCode === '200' || responseBody.data.status === 'success');

          if (topLevelOk && (bodyOk || dataOk)) {
            const verificationId = responseBody.data?.verificationId || responseBody.verificationId;
            const messageId = responseBody.messageId || responseBody.id || verificationId || 'unknown';
            resolve({
              success: true,
              messageId,
              verificationId,
              provider: 'MessageCentral'
            });
          } else {
            resolve({
              success: false,
              error: responseBody.message || responseBody.error || responseBody.data?.message || `HTTP ${response.statusCode}`
            });
          }
        } catch (parseError) {
          console.error('📱 MessageCentral Password Reset Response Parse Error:', parseError);
          resolve({
            success: false,
            error: 'Invalid response from SMS service'
          });
        }
      });
    });

  } catch (error) {
    console.error('📱 MessageCentral Password Reset SMS Service Error:', error);
    return {
      success: false,
      error: error.message || 'SMS service unavailable'
    };
  }
}

export default {
  sendSmsVerificationCode,
  sendPasswordResetSms
};
