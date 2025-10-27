// Trace The Threat - Level 5 Evidence
// Master-level sophisticated attacks and advanced threats

export const level5Evidence = [
    {
      "id": 201,
      "type": "log",
      "title": "Privilege Escalation Exploit",
      "content": "User ‘temp-admin’ gained root via CVE-2024-1234 vulnerability.",
      "isSuspicious": true,
      "timestamp": "2024-05-02 02:21:13",
      "source": "Security Monitor"
    },
    {
      "id": 202,
      "type": "file",
      "title": "Memory Dump",
      "content": "Full process memory dump created after unknown process crash.",
      "isSuspicious": true,
      "timestamp": "2024-05-03 09:18:44",
      "source": "Server01"
    },
    {
      "id": 203,
      "type": "email",
      "title": "Whaling Attempt",
      "content": "CEO receives spear-phishing email requesting W-2 tax forms.",
      "isSuspicious": true,
      "timestamp": "2024-05-04 17:20:08",
      "source": "Executive Email"
    },
    {
      "id": 204,
      "type": "log",
      "title": "SQL Injection Attack",
      "content": "Blocked SQL command ‘OR 1=1’ on client portal login field.",
      "isSuspicious": true,
      "timestamp": "2024-05-01 20:30:45",
      "source": "Web Application"
    },
    {
      "id": 205,
      "type": "file",
      "title": "Credential File Found",
      "content": "Excel sheet with admin credentials stored on public share.",
      "isSuspicious": true,
      "timestamp": "2024-05-02 09:07:36",
      "source": "Public Share"
    },
    {
      "id": 206,
      "type": "email",
      "title": "Office 365 Bypass Alert",
      "content": "Detection of multiple failed O365 login attempts through Tor network.",
      "isSuspicious": true,
      "timestamp": "2024-05-05 04:18:14",
      "source": "Security Team"
    },
    {
      "id": 207,
      "type": "log",
      "title": "Zero-Day Exploit Attempt",
      "content": "Unusual script detected exploiting CVE-2024-4123 in HR software.",
      "isSuspicious": true,
      "timestamp": "2024-05-05 01:01:02",
      "source": "HR Application"
    },
    {
      "id": 208,
      "type": "file",
      "title": "Suspicious DLL Injection",
      "content": "DLL ‘libmalicious.dll’ injected into ‘payroll.exe’ process.",
      "isSuspicious": true,
      "timestamp": "2024-05-01 15:44:38",
      "source": "Server04"
    },
    {
      "id": 209,
      "type": "email",
      "title": "Fake Legal Notice",
      "content": "Document claims receiver is named in court case, requesting payment.",
      "isSuspicious": true,
      "timestamp": "2024-05-03 12:20:00",
      "source": "Legal Department"
    },
    {
      "id": 210,
      "type": "log",
      "title": "Remote Access Trojan",
      "content": "Process ‘rat.exe’ communicates with IP 91.200.113.97.",
      "isSuspicious": true,
      "timestamp": "2024-05-04 03:16:05",
      "source": "Endpoint Security"
    },
    {
      "id": 211,
      "type": "file",
      "title": "Encrypted Traffic Spike",
      "content": "Outbound encrypted traffic tripled at 04:00 AM.",
      "isSuspicious": true,
      "timestamp": "2024-05-05 04:00:00",
      "source": "Firewall"
    },
    {
      "id": 212,
      "type": "email",
      "title": "Compromised Account Recovery",
      "content": "User receives recovery email for non-existent account.",
      "isSuspicious": true,
      "timestamp": "2024-05-02 08:42:07",
      "source": "Support"
    },
    {
      "id": 213,
      "type": "log",
      "title": "Unusual Sudo Calls",
      "content": "Sudo called 112 times by unknown user on DB04.",
      "isSuspicious": true,
      "timestamp": "2024-05-01 16:10:29",
      "source": "Linux Logs"
    },
    {
      "id": 214,
      "type": "file",
      "title": "Fake SSL Certificate",
      "content": "SSL cert encountered fails CA check; issued for ‘company-alt.net’.",
      "isSuspicious": true,
      "timestamp": "2024-05-03 13:32:20",
      "source": "Security Scanner"
    },
    {
      "id": 215,
      "type": "email",
      "title": "Unusual Invoice Template",
      "content": "Invoice template from ‘accounting-support@vendor.net’ asks for ACH details.",
      "isSuspicious": true,
      "timestamp": "2024-05-04 18:17:00",
      "source": "Finance Team"
    },
    {
      "id": 216,
      "type": "log",
      "title": "Malicious Batch Script",
      "content": "‘cleanup.bat’ scheduled for every 10 minutes on finance server.",
      "isSuspicious": true,
      "timestamp": "2024-05-02 05:11:54",
      "source": "Finance Server"
    },
    {
      "id": 217,
      "type": "file",
      "title": "Unexpected File Extension",
      "content": "File ‘config.pdf.exe’ opened by HR, flagged by endpoint protection.",
      "isSuspicious": true,
      "timestamp": "2024-05-05 15:02:27",
      "source": "HR Desktop"
    },
    {
      "id": 218,
      "type": "email",
      "title": "Spoofed Internal Sender",
      "content": "Email spoofed to appear from ceo@company.com; authentic sender in headers is external.",
      "isSuspicious": true,
      "timestamp": "2024-05-05 12:34:00",
      "source": "CEO Email"
    },
    {
      "id": 219,
      "type": "log",
      "title": "Unexpected Firewall Configuration",
      "content": "Firewall rules altered outside maintenance window.",
      "isSuspicious": true,
      "timestamp": "2024-05-03 00:09:37",
      "source": "Firewall Logs"
    },
    {
      "id": 220,
      "type": "file",
      "title": "Remote Desktop Host",
      "content": "New remote desktop host enabled without IT approval.",
      "isSuspicious": true,
      "timestamp": "2024-05-01 20:30:45",
      "source": "Workstation242"
    },
    {
      "id": 221,
      "type": "email",
      "title": "Critical Vulnerability Alert",
      "content": "Immediate patch required for exploit CVE-2024-5678.",
      "isSuspicious": false,
      "timestamp": "2024-05-04 10:12:08",
      "source": "IT Security"
    },
    {
      "id": 222,
      "type": "log",
      "title": "Long-running Malware Process",
      "content": "‘minerd.exe’ has been running for 37 hours on desktop.",
      "isSuspicious": true,
      "timestamp": "2024-05-05 13:19:33",
      "source": "Malware Scanner"
    },
    {
      "id": 223,
      "type": "file",
      "title": "Unapproved Registry Script",
      "content": "‘regupdate.vbs’ launched by non-admin user.",
      "isSuspicious": true,
      "timestamp": "2024-05-01 22:21:22",
      "source": "Windows Logs"
    },
    {
      "id": 224,
      "type": "email",
      "title": "Fake Password Recovery",
      "content": "Password recovery link for a different account sent to employee.",
      "isSuspicious": true,
      "timestamp": "2024-05-02 07:31:41",
      "source": "Support Desk"
    },
    {
      "id": 225,
      "type": "log",
      "title": "Outbound Data Transfer",
      "content": "Large outbound transfer (5.4 GB) to Russian IP during off-hours.",
      "isSuspicious": true,
      "timestamp": "2024-05-05 02:17:17",
      "source": "Network Monitor"
    },
    {
      "id": 226,
      "type": "file",
      "title": "Steganography Tool Found",
      "content": "Executable ‘imgencode.exe’ discovered in user downloads.",
      "isSuspicious": true,
      "timestamp": "2024-05-03 06:18:39",
      "source": "Downloads"
    },
    {
      "id": 227,
      "type": "email",
      "title": "Fake Meeting Invitation",
      "content": "Calendar invite sent with link to non-corporate video platform.",
      "isSuspicious": true,
      "timestamp": "2024-05-01 13:23:16",
      "source": "Calendar Desk"
    },
    {
      "id": 228,
      "type": "log",
      "title": "Antivirus Tampering",
      "content": "Antivirus disabled by unknown process on server02.",
      "isSuspicious": true,
      "timestamp": "2024-05-02 04:41:29",
      "source": "AV Console"
    },
    {
      "id": 229,
      "type": "file",
      "title": "Access Control Policy Update",
      "content": "Access Control policy updated (documented and authorized).",
      "isSuspicious": false,
      "timestamp": "2024-05-02 11:30:31",
      "source": "Policy Library"
    },
    {
      "id": 230,
      "type": "email",
      "title": "Phishing Simulation Results",
      "content": "Report: only 8 of 50 staff identified fake email simulation.",
      "isSuspicious": false,
      "timestamp": "2024-05-03 08:22:17",
      "source": "HR Team"
    },
    {
      "id": 231,
      "type": "log",
      "title": "Suspicious Cron Job",
      "content": "Cron job scheduled for ‘malupdate.sh’ runs every 15 minutes.",
      "isSuspicious": true,
      "timestamp": "2024-05-04 01:01:39",
      "source": "Linux Server"
    },
    {
      "id": 232,
      "type": "file",
      "title": "Encrypted Archive",
      "content": "File ‘secret_project.zip’ encrypted with unknown method.",
      "isSuspicious": true,
      "timestamp": "2024-05-05 07:10:00",
      "source": "Project Files"
    },
    {
      "id": 233,
      "type": "email",
      "title": "Fake Vendor Payment Request",
      "content": "Payment request from ‘vendor-pay@secure-mail.net’ flagged as suspicious.",
      "isSuspicious": true,
      "timestamp": "2024-05-03 14:03:21",
      "source": "Accounts Dept"
    },
    {
      "id": 234,
      "type": "log",
      "title": "Multiple False Login Attempts",
      "content": "100+ wrong password attempts for one user within 1 hour.",
      "isSuspicious": true,
      "timestamp": "2024-05-01 06:19:44",
      "source": "Authentication Logs"
    },
    {
      "id": 235,
      "type": "file",
      "title": "Policy Handbook Update",
      "content": "Policy Handbook updated and digitally signed last week.",
      "isSuspicious": false,
      "timestamp": "2024-05-03 13:10:10",
      "source": "HR Archive"
    },
    {
      "id": 236,
      "type": "email",
      "title": "Unusual File Downloaded",
      "content": "Alert: email contained .scr file attachment (potential screensaver worm).",
      "isSuspicious": true,
      "timestamp": "2024-05-04 06:35:55",
      "source": "Email Security"
    },
    {
      "id": 237,
      "type": "log",
      "title": "Patch Rollback",
      "content": "Latest critical patch rolled back on server at 11:01 PM.",
      "isSuspicious": true,
      "timestamp": "2024-05-01 23:01:00",
      "source": "Patch Manager"
    },
    {
      "id": 238,
      "type": "file",
      "title": "Unscanned External Drive",
      "content": "External drive connected and not scanned before use.",
      "isSuspicious": true,
      "timestamp": "2024-05-04 17:43:52",
      "source": "Workstation210"
    },
    {
      "id": 239,
      "type": "email",
      "title": "Unapproved Account Creation",
      "content": "Account created for user ’temp999’ outside onboarding process.",
      "isSuspicious": true,
      "timestamp": "2024-05-03 10:02:12",
      "source": "HR System"
    },
    {
      "id": 240,
      "type": "log",
      "title": "Malware Alert: Coinminer",
      "content": "‘coinminer.exe’ detected in background process scan.",
      "isSuspicious": true,
      "timestamp": "2024-05-05 03:21:24",
      "source": "Malware Scanner"
    },
    {
      "id": 241,
      "type": "file",
      "title": "Credential Dump File",
      "content": "File ‘2024_admin_dump.txt’ stored in secure vault.",
      "isSuspicious": true,
      "timestamp": "2024-05-01 07:45:37",
      "source": "Audit System"
    },
    {
      "id": 242,
      "type": "email",
      "title": "Suspicious HTML Attachment",
      "content": "Received email with HTML file attachment; link points to external host.",
      "isSuspicious": true,
      "timestamp": "2024-05-02 11:54:08",
      "source": "Spam Filter"
    },
    {
      "id": 243,
      "type": "log",
      "title": "Multiple Unauthorized Access Attempts",
      "content": "Detected unauthorized login attempts for admin account from 4 IPs.",
      "isSuspicious": true,
      "timestamp": "2024-05-05 06:21:16",
      "source": "Security Monitor"
    },
    {
      "id": 244,
      "type": "file",
      "title": "Backup Failed",
      "content": "Scheduled backup to cloud failed: checksum mismatch.",
      "isSuspicious": false,
      "timestamp": "2024-05-04 08:45:12",
      "source": "Backup System"
    },
    {
      "id": 245,
      "type": "email",
      "title": "Spoofed IT Support",
      "content": "Email claims urgent action required; sender domain is ‘itsecure-mail.com’.",
      "isSuspicious": true,
      "timestamp": "2024-05-01 14:14:15",
      "source": "IT Support"
    },
    {
      "id": 246,
      "type": "log",
      "title": "Unapproved Role Change",
      "content": "Role ‘System Owner’ assigned to user with expired credentials.",
      "isSuspicious": true,
      "timestamp": "2024-05-03 16:42:33",
      "source": "Directory Logs"
    },
    {
      "id": 247,
      "type": "file",
      "title": "Network Map Update",
      "content": "Map of server and switch locations, updated for compliance.",
      "isSuspicious": false,
      "timestamp": "2024-05-02 10:21:01",
      "source": "IT Infrastructure"
    },
    {
      "id": 248,
      "type": "email",
      "title": "Security Training Reminder",
      "content": "All staff required to attend mandatory security training.",
      "isSuspicious": false,
      "timestamp": "2024-05-05 08:00:00",
      "source": "HR Team"
    },
    {
      "id": 249,
      "type": "log",
      "title": "Ransomware Alert",
      "content": "Encrypted files and ransom note ‘README.txt’ detected.",
      "isSuspicious": true,
      "timestamp": "2024-05-01 23:57:23",
      "source": "Endpoint Security"
    },
    {
      "id": 250,
      "type": "file",
      "title": "Onboarding Checklist",
      "content": "Checklist fully completed, all items verified by HR.",
      "isSuspicious": false,
      "timestamp": "2024-05-03 09:00:00",
      "source": "HR Department"
    }
  ];

export const getRandomLevel5Evidence = (count) => {
  const shuffled = [...level5Evidence].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

