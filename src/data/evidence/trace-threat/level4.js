// Trace The Threat - Level 4 Evidence
// Advanced persistent threats and sophisticated attacks

export const level4Evidence = [
    {
      "id": 151,
      "type": "log",
      "title": "Root Access Attempt Failed",
      "content": "Multiple unsuccessful sudo attempts from user guest on server04.",
      "isSuspicious": true,
      "timestamp": "2024-04-03 04:17:01",
      "source": "Server Logs"
    },
    {
      "id": 152,
      "type": "file",
      "title": "Obfuscated JavaScript File",
      "content": "File ‘tracker.js’ found in public web folder, contains packed code.",
      "isSuspicious": true,
      "timestamp": "2024-04-01 09:25:30",
      "source": "Web Application"
    },
    {
      "id": 153,
      "type": "email",
      "title": "Fake Payroll Notification",
      "content": "Payroll email claims bonus payout; sender address not in company records.",
      "isSuspicious": true,
      "timestamp": "2024-04-02 17:16:19",
      "source": "Finance Email"
    },
    {
      "id": 154,
      "type": "log",
      "title": "Suspicious PowerShell Command",
      "content": "PowerShell run with Base64-encoded arguments by user at 2:51 AM.",
      "isSuspicious": true,
      "timestamp": "2024-04-01 02:51:38",
      "source": "Endpoint Logs"
    },
    {
      "id": 155,
      "type": "file",
      "title": "Unsigned Executable Detected",
      "content": "File ‘xupdate.tmp.exe’ in system32; failed signature check.",
      "isSuspicious": true,
      "timestamp": "2024-04-04 12:03:04",
      "source": "Antivirus"
    },
    {
      "id": 156,
      "type": "email",
      "title": "Unsolicited Password Reset Request",
      "content": "Password reset email received without user initiation.",
      "isSuspicious": true,
      "timestamp": "2024-04-04 23:20:05",
      "source": "Spam Filter"
    },
    {
      "id": 157,
      "type": "log",
      "title": "Port Scan Detected",
      "content": "Over 400 ports scanned from external IP in 2 minutes.",
      "isSuspicious": true,
      "timestamp": "2024-04-01 06:09:37",
      "source": "Network IDS"
    },
    {
      "id": 158,
      "type": "file",
      "title": "Shadow IT Report",
      "content": "Unauthorized cloud storage discovered, used by sales team.",
      "isSuspicious": true,
      "timestamp": "2024-04-02 18:00:00",
      "source": "IT Audit"
    },
    {
      "id": 159,
      "type": "email",
      "title": "Business Email Compromise Attempt",
      "content": "Email from fake supplier requests updated payment details.",
      "isSuspicious": true,
      "timestamp": "2024-04-04 14:49:10",
      "source": "Vendor Management"
    },
    {
      "id": 160,
      "type": "log",
      "title": "Remote Desktop Access",
      "content": "Unscheduled RDP connection from IP 76.98.12.202 to finance terminal.",
      "isSuspicious": true,
      "timestamp": "2024-04-03 19:07:45",
      "source": "RDP Audit"
    },
    {
      "id": 161,
      "type": "file",
      "title": "Critical Data Leak",
      "content": "Sensitive document discovered in public cloud folder.",
      "isSuspicious": true,
      "timestamp": "2024-04-05 11:39:21",
      "source": "Data Protection"
    },
    {
      "id": 162,
      "type": "email",
      "title": "Unusual Country Sign-In Alert",
      "content": "Account johndoe signed in from Russia, China, and Argentina within 15 minutes.",
      "isSuspicious": true,
      "timestamp": "2024-04-01 01:54:45",
      "source": "Security Alerts"
    },
    {
      "id": 163,
      "type": "log",
      "title": "AV Definitions Rolled Back",
      "content": "Antivirus definitions reverted on server without approval.",
      "isSuspicious": true,
      "timestamp": "2024-04-05 03:33:09",
      "source": "AV Console"
    },
    {
      "id": 164,
      "type": "file",
      "title": "Admin Access Credentials",
      "content": "Admin login credentials stored in plain text file.",
      "isSuspicious": true,
      "timestamp": "2024-04-02 17:08:11",
      "source": "Admin Workstation"
    },
    {
      "id": 165,
      "type": "email",
      "title": "Attachment With Malicious Macro",
      "content": "Attached Word document contains macro that launches Excel.",
      "isSuspicious": true,
      "timestamp": "2024-04-05 09:21:06",
      "source": "Email Filter"
    },
    {
      "id": 166,
      "type": "log",
      "title": "Cross-Site Scripting Attempt",
      "content": "Detected reflected XSS payload on HR portal.",
      "isSuspicious": true,
      "timestamp": "2024-04-01 05:04:12",
      "source": "Web Security"
    },
    {
      "id": 167,
      "type": "file",
      "title": "Fake PDF Invoice",
      "content": "‘Invoice_0412.pdf’ triggers abnormal pop-ups on opening.",
      "isSuspicious": true,
      "timestamp": "2024-04-03 16:30:41",
      "source": "User Downloads"
    },
    {
      "id": 168,
      "type": "email",
      "title": "Request For Payment Via Bitcoin",
      "content": "Finance department email received, requests urgent payment in Bitcoin.",
      "isSuspicious": true,
      "timestamp": "2024-04-05 11:48:00",
      "source": "Finance Team"
    },
    {
      "id": 169,
      "type": "log",
      "title": "Mass Password Reset",
      "content": "Corporate-wide password resets initiated outside scheduled maintenance.",
      "isSuspicious": true,
      "timestamp": "2024-04-02 00:35:17",
      "source": "Auth System"
    },
    {
      "id": 170,
      "type": "file",
      "title": "Unapproved Application Install",
      "content": "App ‘quickfreevpn.exe’ installed without ticket.",
      "isSuspicious": true,
      "timestamp": "2024-04-03 13:14:24",
      "source": "Workstation233"
    },
    {
      "id": 171,
      "type": "email",
      "title": "Fake Domain Security Alert",
      "content": "‘security-alert@company-secure.net’ email asks for credentials.",
      "isSuspicious": true,
      "timestamp": "2024-04-04 08:10:32",
      "source": "Spam Filter"
    },
    {
      "id": 172,
      "type": "log",
      "title": "Database Export To Remote Host",
      "content": "Database export ran to IP 54.87.21.19 overnight.",
      "isSuspicious": true,
      "timestamp": "2024-04-03 01:14:41",
      "source": "Database Server"
    },
    {
      "id": 173,
      "type": "file",
      "title": "Phishing Simulation Report",
      "content": "HR phishing exercise concluded; 13 users failed simulation.",
      "isSuspicious": false,
      "timestamp": "2024-04-02 15:51:31",
      "source": "HR Portal"
    },
    {
      "id": 174,
      "type": "email",
      "title": "Suspension Notice",
      "content": "Staff suspension notice sent from HR department, correctly formatted.",
      "isSuspicious": false,
      "timestamp": "2024-04-05 16:08:00",
      "source": "HR Department"
    },
    {
      "id": 175,
      "type": "log",
      "title": "Multiple USB Insertions",
      "content": "Three different USB sticks connected in 1 hour to server101.",
      "isSuspicious": true,
      "timestamp": "2024-04-03 23:37:59",
      "source": "Server101"
    },
    {
      "id": 176,
      "type": "file",
      "title": "Unusual App Executable",
      "content": "Executable ‘steganography_tool.exe’ found in Temp.",
      "isSuspicious": true,
      "timestamp": "2024-04-04 03:33:08",
      "source": "Temp Folder"
    },
    {
      "id": 177,
      "type": "email",
      "title": "Server Error Alert",
      "content": "Automated alert: server error detected on DB02 at 4:27 AM.",
      "isSuspicious": false,
      "timestamp": "2024-04-02 04:27:00",
      "source": "DB Monitoring"
    },
    {
      "id": 178,
      "type": "log",
      "title": "Credential Stuffing Attack",
      "content": "Over 500 login attempts detected in 10 minutes.",
      "isSuspicious": true,
      "timestamp": "2024-04-01 08:16:07",
      "source": "Web Application"
    },
    {
      "id": 179,
      "type": "file",
      "title": "Confidential Document Exposed",
      "content": "‘client_contracts_2024.pdf’ found in non-secure shared drive.",
      "isSuspicious": true,
      "timestamp": "2024-04-03 15:19:26",
      "source": "Document Server"
    },
    {
      "id": 180,
      "type": "email",
      "title": "Unusual Login Location",
      "content": "IT alert: login from new device in Australia for user in UK.",
      "isSuspicious": true,
      "timestamp": "2024-04-03 13:23:40",
      "source": "Security Team"
    },
    {
      "id": 181,
      "type": "log",
      "title": "Unapproved Registry Edit",
      "content": "Critical registry value modified by process ‘setup99.exe’.",
      "isSuspicious": true,
      "timestamp": "2024-04-02 12:18:55",
      "source": "Workstation Log"
    },
    {
      "id": 182,
      "type": "file",
      "title": "Unencrypted Password File",
      "content": "File ‘passwords_backup.txt’ not protected by encryption.",
      "isSuspicious": true,
      "timestamp": "2024-04-05 08:43:10",
      "source": "IT Backup"
    },
    {
      "id": 183,
      "type": "email",
      "title": "External File Share Link",
      "content": "Email provides link to Dropbox folder to all staff.",
      "isSuspicious": true,
      "timestamp": "2024-04-03 14:30:22",
      "source": "All Staff"
    },
    {
      "id": 184,
      "type": "log",
      "title": "Account Creation Spike",
      "content": "Fifteen new accounts created in 10 minutes; not audit-approved.",
      "isSuspicious": true,
      "timestamp": "2024-04-02 15:07:47",
      "source": "Directory System"
    },
    {
      "id": 185,
      "type": "file",
      "title": "Encrypted Archive Without Passphrase",
      "content": "File ‘company_data_2024.zip’ cannot be opened; no record of password.",
      "isSuspicious": false,
      "timestamp": "2024-04-05 13:52:17",
      "source": "IT Archive"
    },
    {
      "id": 186,
      "type": "email",
      "title": "High Risk Email Domain",
      "content": "Received message from domain flagged for phishing.",
      "isSuspicious": true,
      "timestamp": "2024-04-01 10:11:08",
      "source": "Spam Filter"
    },
    {
      "id": 187,
      "type": "log",
      "title": "Unscheduled Service Restart",
      "content": "DBService restarted by unknown process at 11:11 PM.",
      "isSuspicious": true,
      "timestamp": "2024-04-01 23:11:18",
      "source": "DB Logs"
    },
    {
      "id": 188,
      "type": "file",
      "title": "Fake Antivirus Installer",
      "content": "Download ‘Antivirus2024_Setup.exe’ was not signed by trusted vendor.",
      "isSuspicious": true,
      "timestamp": "2024-04-05 18:10:10",
      "source": "Downloads"
    },
    {
      "id": 189,
      "type": "email",
      "title": "Unapproved Admin Role Change",
      "content": "Admin rights granted to user ‘guest12’ without ticket.",
      "isSuspicious": true,
      "timestamp": "2024-04-02 14:44:44",
      "source": "Directory System"
    },
    {
      "id": 190,
      "type": "log",
      "title": "DNS Spoofing Detected",
      "content": "Unauthorized DNS record attempted for internal finance server.",
      "isSuspicious": true,
      "timestamp": "2024-04-04 04:04:15",
      "source": "Network Monitor"
    },
    {
      "id": 191,
      "type": "file",
      "title": "Access Rights Document",
      "content": "Document outlines correct access rights for new staff.",
      "isSuspicious": false,
      "timestamp": "2024-04-03 13:00:00",
      "source": "HR Archive"
    },
    {
      "id": 192,
      "type": "email",
      "title": "O365 Impossible Travel Alert",
      "content": "Login from Canada and Japan detected for one user within 5 minutes.",
      "isSuspicious": true,
      "timestamp": "2024-04-02 20:22:31",
      "source": "Security Alerts"
    },
    {
      "id": 193,
      "type": "log",
      "title": "Outbound Spam Burst",
      "content": "1000 emails sent in 5 minutes from same workstation.",
      "isSuspicious": true,
      "timestamp": "2024-04-05 09:40:21",
      "source": "Email Server"
    },
    {
      "id": 194,
      "type": "file",
      "title": "Employee Handbook",
      "content": "HR Employee Handbook.docx downloaded by all new joiners.",
      "isSuspicious": false,
      "timestamp": "2024-04-03 09:30:00",
      "source": "HR Shared Drive"
    },
    {
      "id": 195,
      "type": "email",
      "title": "Security Policy Reminder",
      "content": "Monthly email: all users must review IT policy.",
      "isSuspicious": false,
      "timestamp": "2024-04-01 08:00:00",
      "source": "IT Department"
    },
    {
      "id": 196,
      "type": "log",
      "title": "Credential Dump Detected",
      "content": "File ‘dump2024.txt’ containing credentials found on server.",
      "isSuspicious": true,
      "timestamp": "2024-04-03 05:01:22",
      "source": "Server Audit"
    },
    {
      "id": 197,
      "type": "file",
      "title": "Backup Failed",
      "content": "Scheduled backup to cloud did not complete due to network error.",
      "isSuspicious": false,
      "timestamp": "2024-04-04 08:45:12",
      "source": "Backup System"
    },
    {
      "id": 198,
      "type": "email",
      "title": "Remote File Share Request",
      "content": "User requests Dropbox access for new client data.",
      "isSuspicious": true,
      "timestamp": "2024-04-04 10:54:00",
      "source": "Client Support"
    },
    {
      "id": 199,
      "type": "log",
      "title": "Mac Address Spoof Attempt",
      "content": "Device attempted connection using known admin MAC address.",
      "isSuspicious": true,
      "timestamp": "2024-04-03 17:29:09",
      "source": "Network Security"
    },
    {
      "id": 200,
      "type": "file",
      "title": "Onboarding Checklist",
      "content": "Standard checklist; all steps completed and approved.",
      "isSuspicious": false,
      "timestamp": "2024-04-02 09:00:00",
      "source": "HR Department"
    }
  ];

export const getRandomLevel4Evidence = (count) => {
  const shuffled = [...level4Evidence].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

