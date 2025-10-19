import request from 'request';

const MESSAGECENTRAL_CONFIG = {
  baseUrl: 'https://cpaas.messagecentral.com/verification/v3/send',
  customerId: process.env.MESSAGECENTRAL_CUSTOMER_ID || 'C-F9DBF9664CE5487',
  senderId: process.env.MESSAGECENTRAL_SENDER_ID || 'UTOMOB',
  authToken: process.env.MESSAGECENTRAL_AUTH_TOKEN || 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDLUY5REJGOTY2NENFNTQ4NyIsImlhdCI6MTc2MDg3MTg4OCwiZXhwIjoxOTE4NTUxODg4fQ.NmZPs5nBesV61UjmA8GG_8bCIfNVWScXYCgRyKLGYqcizZpxOEIXTs-AFckR0kP0LuSA5XD1q0IKKO1l6-mx-g',
  countryCode: process.env.MESSAGECENTRAL_COUNTRY_CODE || '91'
};

/**
 * Send SMS verification code via MessageCentral
 * @param {string} phoneNumber - Phone number (without country code)
 * @param {string} code - Verification code
 * @param {string} countryCode - Country code (default: 91 for India)
 * @returns {Promise<{success: boolean, messageId?: string, error?: string}>}
 */
export async function sendSmsVerificationCode(phoneNumber, code, countryCode = MESSAGECENTRAL_CONFIG.countryCode) {
  try {
    console.log(`📱 Sending SMS verification code ${code} to +${countryCode}${phoneNumber}`);
    
    const message = `Welcome to AR CyberGuard! Your verification code is: ${code}. This code will expire in 15 minutes. - Powered by U2opia`;
    
    const options = {
      method: 'POST',
      url: `${MESSAGECENTRAL_CONFIG.baseUrl}?countryCode=${countryCode}&customerId=${MESSAGECENTRAL_CONFIG.customerId}&senderId=${MESSAGECENTRAL_CONFIG.senderId}&type=SMS&flowType=SMS&mobileNumber=${phoneNumber}&message=${encodeURIComponent(message)}`,
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
          
          if (response.statusCode === 200) {
            resolve({
              success: true,
              messageId: responseBody.messageId || responseBody.id || 'unknown',
              provider: 'MessageCentral'
            });
          } else {
            resolve({
              success: false,
              error: responseBody.message || responseBody.error || `HTTP ${response.statusCode}`
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
    console.log(`📱 Sending password reset SMS code ${code} to +${countryCode}${phoneNumber}`);
    
    const message = `AR CyberGuard Password Reset: Your reset code is ${code}. This code will expire in 15 minutes. Do not share this code with anyone. - Powered by U2opia`;
    
    const options = {
      method: 'POST',
      url: `${MESSAGECENTRAL_CONFIG.baseUrl}?countryCode=${countryCode}&customerId=${MESSAGECENTRAL_CONFIG.customerId}&senderId=${MESSAGECENTRAL_CONFIG.senderId}&type=SMS&flowType=SMS&mobileNumber=${phoneNumber}&message=${encodeURIComponent(message)}`,
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
          
          if (response.statusCode === 200) {
            resolve({
              success: true,
              messageId: responseBody.messageId || responseBody.id || 'unknown',
              provider: 'MessageCentral'
            });
          } else {
            resolve({
              success: false,
              error: responseBody.message || responseBody.error || `HTTP ${response.statusCode}`
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
