// Trace The Threat - Level 3 Evidence
// Expert-level suspicious events and analysis

export const level3Evidence = [
    {
      "id": 101,
      "type": "log",
      "title": "Unauthorized SSH Connection",
      "content": "SSH login from 178.23.45.22 to server01 with unknown credentials.",
      "isSuspicious": true,
      "timestamp": "2024-03-15 03:18:07",
      "source": "Server Logs"
    },
    {
      "id": 102,
      "type": "file",
      "title": "Encrypted Archive",
      "content": "ZIP file archive_2024.zip found in public folder. Password not documented.",
      "isSuspicious": true,
      "timestamp": "2024-03-12 11:17:00",
      "source": "File Server"
    },
    {
      "id": 103,
      "type": "email",
      "title": "Invoice From Unlisted Vendor",
      "content": "Invoice for $2,150 received from unknown vendor. Request for immediate payment.",
      "isSuspicious": true,
      "timestamp": "2024-03-17 16:12:00",
      "source": "Accounts Email"
    },
    {
      "id": 104,
      "type": "log",
      "title": "Abnormal Data Transfer",
      "content": "Detected 1.2GB upload to external FTP server at 02:05 AM.",
      "isSuspicious": true,
      "timestamp": "2024-03-10 02:05:33",
      "source": "Network Monitor"
    },
    {
      "id": 105,
      "type": "file",
      "title": "Employee Photo Update",
      "content": "Profile photo changed for user Sarah; image passed security screening.",
      "isSuspicious": false,
      "timestamp": "2024-03-11 09:41:00",
      "source": "HR System"
    },
    {
      "id": 106,
      "type": "email",
      "title": "CEO Wire Transfer Request",
      "content": "Email from CEO requesting urgent funds transfer; sent from gmail.com.",
      "isSuspicious": true,
      "timestamp": "2024-03-16 11:03:27",
      "source": "Finance Department"
    },
    {
      "id": 107,
      "type": "log",
      "title": "Repeated Failed 2FA",
      "content": "Seven consecutive failed two-factor attempts for same user in 10 min.",
      "isSuspicious": true,
      "timestamp": "2024-03-10 12:55:14",
      "source": "Authentication Server"
    },
    {
      "id": 108,
      "type": "file",
      "title": "Old Backup File",
      "content": "Backup_January2023.zip found, last modified over a year ago.",
      "isSuspicious": false,
      "timestamp": "2024-03-11 07:12:54",
      "source": "Backup Directory"
    },
    {
      "id": 109,
      "type": "log",
      "title": "Unauthorized Registry Edit",
      "content": "Suspicious edit to system registry detected during non-office hours.",
      "isSuspicious": true,
      "timestamp": "2024-03-14 23:48:00",
      "source": "Workstation Events"
    },
    {
      "id": 110,
      "type": "email",
      "title": "Fake IT Maintenance Notice",
      "content": "‘Update your credentials urgently’ link sent by ‘it-support@company-updates.com’.",
      "isSuspicious": true,
      "timestamp": "2024-03-15 09:15:08",
      "source": "Email Security"
    },
    {
      "id": 111,
      "type": "file",
      "title": "USB Access Policy",
      "content": "Updated policy: no personal USBs allowed. Document acknowledged by all.",
      "isSuspicious": false,
      "timestamp": "2024-03-11 10:12:21",
      "source": "Policy Repository"
    },
    {
      "id": 112,
      "type": "log",
      "title": "Database Export Event",
      "content": "Full client database export performed by admin. Scheduled, change ticket checked.",
      "isSuspicious": false,
      "timestamp": "2024-03-13 07:22:11",
      "source": "DB System"
    },
    {
      "id": 113,
      "type": "email",
      "title": "Phishing Attempt Detected",
      "content": "Email flagged by spam filter: ‘Your account will be disabled today’.",
      "isSuspicious": true,
      "timestamp": "2024-03-12 15:29:00",
      "source": "Spam Filter"
    },
    {
      "id": 114,
      "type": "log",
      "title": "Antivirus Alert",
      "content": "Malware quarantined: Trojan.GenericKD found in downloads.",
      "isSuspicious": true,
      "timestamp": "2024-03-14 16:33:19",
      "source": "Antivirus"
    },
    {
      "id": 115,
      "type": "file",
      "title": "IT Training Completion",
      "content": "John completed annual cybersecurity training; quiz score 97%.",
      "isSuspicious": false,
      "timestamp": "2024-03-10 16:40:31",
      "source": "Training Portal"
    },
    {
      "id": 116,
      "type": "log",
      "title": "VPN Logins Outside Region",
      "content": "VPN login from user LondonOffice in Brazil at 3:22 AM.",
      "isSuspicious": true,
      "timestamp": "2024-03-13 03:22:16",
      "source": "VPN Logs"
    },
    {
      "id": 117,
      "type": "file",
      "title": "Mac Address List",
      "content": "All corporate router allowed MAC addresses reviewed.",
      "isSuspicious": false,
      "timestamp": "2024-03-13 13:24:00",
      "source": "Network Admin"
    },
    {
      "id": 118,
      "type": "email",
      "title": "Account Recovery Request",
      "content": "User requested account recovery for forgotten password via secure form.",
      "isSuspicious": false,
      "timestamp": "2024-03-15 18:22:14",
      "source": "HR Department"
    },
    {
      "id": 119,
      "type": "log",
      "title": "Firewall Block Event",
      "content": "Connection to 183.166.22.13:3389 (RDP) blocked, not on allow-list.",
      "isSuspicious": true,
      "timestamp": "2024-03-12 19:11:10",
      "source": "Firewall"
    },
    {
      "id": 120,
      "type": "file",
      "title": "Invoice Template",
      "content": "Standard invoice template for vendors, reviewed by accounting.",
      "isSuspicious": false,
      "timestamp": "2024-03-13 14:15:13",
      "source": "Accounting"
    },
    {
      "id": 121,
      "type": "email",
      "title": "Unknown Meeting Invite",
      "content": "Calendar invite with link to external Zoom room from unknown sender.",
      "isSuspicious": true,
      "timestamp": "2024-03-12 13:32:00",
      "source": "Calendar System"
    },
    {
      "id": 122,
      "type": "log",
      "title": "Repeated Password Changes",
      "content": "Password changed for same account 3 times in 1 hour.",
      "isSuspicious": true,
      "timestamp": "2024-03-15 15:03:33",
      "source": "IT Admin Logs"
    },
    {
      "id": 123,
      "type": "file",
      "title": "Confidential Project Plan",
      "content": "File marked confidential, permissions intact.",
      "isSuspicious": false,
      "timestamp": "2024-03-11 19:02:13",
      "source": "Project Files"
    },
    {
      "id": 124,
      "type": "log",
      "title": "Unapproved USB Connection",
      "content": "Unknown USB stick attached to server rack on off-hours.",
      "isSuspicious": true,
      "timestamp": "2024-03-14 21:57:24",
      "source": "Server Rack Logs"
    },
    {
      "id": 125,
      "type": "file",
      "title": "Password File",
      "content": "File named ‘passwords.txt’ located in user Documents.",
      "isSuspicious": true,
      "timestamp": "2024-03-13 10:51:15",
      "source": "User Workstation"
    },
    {
      "id": 126,
      "type": "email",
      "title": "External Document Request",
      "content": "Business partner requests urgent document via unencrypted email.",
      "isSuspicious": true,
      "timestamp": "2024-03-13 20:40:00",
      "source": "Business Partner"
    },
    {
      "id": 127,
      "type": "log",
      "title": "Patch Rollback Detected",
      "content": "Critical security patch was rolled back without approval.",
      "isSuspicious": true,
      "timestamp": "2024-03-12 22:10:18",
      "source": "Patch System"
    },
    {
      "id": 128,
      "type": "file",
      "title": "User Agreement",
      "content": "Annual user agreement signed by all staff; policy reviewed.",
      "isSuspicious": false,
      "timestamp": "2024-03-11 12:40:22",
      "source": "Legal"
    },
    {
      "id": 129,
      "type": "email",
      "title": "Mandatory Cybersecurity Quiz",
      "content": "HR sent quiz link: required completion by April 1st.",
      "isSuspicious": false,
      "timestamp": "2024-03-16 13:00:00",
      "source": "HR System"
    },
    {
      "id": 130,
      "type": "log",
      "title": "Suspicious Port Scan",
      "content": "Inbound connection attempts recorded for over 80 ports in 30 seconds.",
      "isSuspicious": true,
      "timestamp": "2024-03-15 06:49:00",
      "source": "Network IDS"
    },
    {
      "id": 131,
      "type": "file",
      "title": "Randomly Named Executable",
      "content": "File ‘zxvwe123.exe’ appeared in temp folder; flagged by AV.",
      "isSuspicious": true,
      "timestamp": "2024-03-12 04:44:44",
      "source": "Antivirus"
    },
    {
      "id": 132,
      "type": "log",
      "title": "System Reboot",
      "content": "All endpoints rebooted per update policy; status OK.",
      "isSuspicious": false,
      "timestamp": "2024-03-13 12:00:00",
      "source": "Update Policy"
    },
    {
      "id": 133,
      "type": "file",
      "title": "Shared Access Request",
      "content": "Request for shared drive access—file owner approved.",
      "isSuspicious": false,
      "timestamp": "2024-03-12 09:43:21",
      "source": "IT Requests"
    },
    {
      "id": 134,
      "type": "email",
      "title": "Security Alert",
      "content": "Security alert: your account failed login from Russia.",
      "isSuspicious": true,
      "timestamp": "2024-03-15 06:15:00",
      "source": "IT Security"
    },
    {
      "id": 135,
      "type": "log",
      "title": "Process Crash",
      "content": "ERP_System.exe crashed with memory overflow error.",
      "isSuspicious": false,
      "timestamp": "2024-03-15 17:12:55",
      "source": "Server Monitor"
    },
    {
      "id": 136,
      "type": "file",
      "title": "Locked PDF Detected",
      "content": "PDF file cannot be edited; password protected as per guidelines.",
      "isSuspicious": false,
      "timestamp": "2024-03-11 10:19:00",
      "source": "Legal"
    },
    {
      "id": 137,
      "type": "email",
      "title": "Unusual Signature Block",
      "content": "Email includes misleading signature: ‘Sent from Windows Phone’.",
      "isSuspicious": true,
      "timestamp": "2024-03-15 20:13:00",
      "source": "Email Filter"
    },
    {
      "id": 138,
      "type": "log",
      "title": "Failed Patch Install",
      "content": "Endpoint failed to install latest update, retry scheduled.",
      "isSuspicious": false,
      "timestamp": "2024-03-14 09:10:00",
      "source": "Update System"
    },
    {
      "id": 139,
      "type": "file",
      "title": "HR Policy File",
      "content": "HR Policy.pdf accessed by payroll in normal hours.",
      "isSuspicious": false,
      "timestamp": "2024-03-12 16:32:00",
      "source": "HR SharePoint"
    },
    {
      "id": 140,
      "type": "email",
      "title": "Bitly Link Message",
      "content": "HR email includes bit.ly link to internal resource; link resolves properly.",
      "isSuspicious": false,
      "timestamp": "2024-03-14 11:18:09",
      "source": "HR Department"
    },
    {
      "id": 141,
      "type": "log",
      "title": "Unscheduled Service Restart",
      "content": "FinanceService.exe restarted at 3:17 AM, not on planned schedule.",
      "isSuspicious": true,
      "timestamp": "2024-03-11 03:17:43",
      "source": "Finance Server"
    },
    {
      "id": 142,
      "type": "file",
      "title": "Group Project Notes",
      "content": "Notes.txt shared for reference. No access issues found.",
      "isSuspicious": false,
      "timestamp": "2024-03-13 21:22:00",
      "source": "Project Folder"
    },
    {
      "id": 143,
      "type": "email",
      "title": "Link From External Domain",
      "content": "Email from supplier contains non-company link requesting login.",
      "isSuspicious": true,
      "timestamp": "2024-03-11 10:46:00",
      "source": "Mail Filter"
    },
    {
      "id": 144,
      "type": "log",
      "title": "User Workstation Login",
      "content": "User Emma logged into her workstation at 8:05 AM as scheduled.",
      "isSuspicious": false,
      "timestamp": "2024-03-15 08:05:01",
      "source": "Device Auth"
    },
    {
      "id": 145,
      "type": "file",
      "title": "System Clean Report",
      "content": "Scan report shows no malware for this session.",
      "isSuspicious": false,
      "timestamp": "2024-03-14 10:00:00",
      "source": "Antivirus"
    },
    {
      "id": 146,
      "type": "email",
      "title": "Subject: URGENT — Immediate Action Needed",
      "content": "High-priority request to download attachment, marked as dangerous.",
      "isSuspicious": true,
      "timestamp": "2024-03-15 19:48:26",
      "source": "Spam Filter"
    },
    {
      "id": 147,
      "type": "log",
      "title": "DNS Record Edit",
      "content": "Public DNS record for finance-app changed at 2:13 AM.",
      "isSuspicious": true,
      "timestamp": "2024-03-12 02:13:11",
      "source": "DNS Manager"
    },
    {
      "id": 148,
      "type": "file",
      "title": "Access Control List",
      "content": "ACL file shows standard permissions; no changes since last audit.",
      "isSuspicious": false,
      "timestamp": "2024-03-12 17:34:02",
      "source": "Security Monitor"
    },
    {
      "id": 149,
      "type": "email",
      "title": "Policy Reminder",
      "content": "Reminder: Acceptable Use Policy signature required by staff.",
      "isSuspicious": false,
      "timestamp": "2024-03-14 08:43:00",
      "source": "Compliance Office"
    },
    {
      "id": 150,
      "type": "log",
      "title": "Root Password Change",
      "content": "Root password changed on prod server at 3:00 AM; no change request found.",
      "isSuspicious": true,
      "timestamp": "2024-03-15 03:00:30",
      "source": "Server Logs"
    }
  ];

export const getRandomLevel3Evidence = (count) => {
  const shuffled = [...level3Evidence].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

