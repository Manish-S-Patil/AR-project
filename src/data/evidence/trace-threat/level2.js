// Trace The Threat - Level 2 Evidence
// Advanced suspicious events and logs

export const level2Evidence = [
    {
      "id": 51,
      "type": "email",
      "title": "Password Change Reminder",
      "content": "Monthly reminder email sent automatically by IT to update passwords.",
      "isSuspicious": false,
      "timestamp": "2024-02-10 09:00:00",
      "source": "IT Department"
    },
    {
      "id": 52,
      "type": "log",
      "title": "Unusual Login Attempt",
      "content": "Login attempt from unfamiliar IP 203.0.113.45 at late hours.",
      "isSuspicious": true,
      "timestamp": "2024-02-10 23:14:17",
      "source": "Authentication Server"
    },
    {
      "id": 53,
      "type": "file",
      "title": "VPN Setup Instructions",
      "content": "VPN configuration document downloaded from IT portal.",
      "isSuspicious": false,
      "timestamp": "2024-02-11 10:20:00",
      "source": "IT Portal"
    },
    {
      "id": 54,
      "type": "log",
      "title": "Brute Force Alert",
      "content": "Multiple failed login attempts for user emma@company.com detected.",
      "isSuspicious": true,
      "timestamp": "2024-02-12 02:32:18",
      "source": "Security System"
    },
    {
      "id": 55,
      "type": "email",
      "title": "HR Survey",
      "content": "Survey link distributed to all employees, no sensitive data requested.",
      "isSuspicious": false,
      "timestamp": "2024-02-11 08:00:00",
      "source": "HR Department"
    },
    {
      "id": 56,
      "type": "log",
      "title": "Printer Usage Log",
      "content": "High-volume color print detected at 10:30 AM from HR.",
      "isSuspicious": false,
      "timestamp": "2024-02-13 10:30:31",
      "source": "Printer Server"
    },
    {
      "id": 57,
      "type": "file",
      "title": "Meeting Minutes",
      "content": "Project meeting summary filed in SharePoint for team review.",
      "isSuspicious": false,
      "timestamp": "2024-02-10 18:24:21",
      "source": "SharePoint"
    },
    {
      "id": 58,
      "type": "log",
      "title": "Firewall Alert",
      "content": "Blocked outgoing traffic to suspicious port 445 from workstation102.",
      "isSuspicious": true,
      "timestamp": "2024-02-13 17:18:20",
      "source": "Firewall"
    },
    {
      "id": 59,
      "type": "email",
      "title": "Holiday Announcement",
      "content": "All-staff email: confirmed public holiday on Monday.",
      "isSuspicious": false,
      "timestamp": "2024-02-08 13:15:00",
      "source": "Admin Office"
    },
    {
      "id": 60,
      "type": "file",
      "title": "Suspicious File Detected",
      "content": "Unrecognized executable update_patch.exe found in downloads.",
      "isSuspicious": true,
      "timestamp": "2024-02-10 14:34:13",
      "source": "Antivirus"
    },
    {
      "id": 61,
      "type": "file",
      "title": "Backup Completed Log",
      "content": "Daily encrypted backup succeeded, verified by IT.",
      "isSuspicious": false,
      "timestamp": "2024-02-11 06:00:00",
      "source": "Backup System"
    },
    {
      "id": 62,
      "type": "log",
      "title": "System Time Change",
      "content": "System clock manually edited without approval at 3:00 AM.",
      "isSuspicious": true,
      "timestamp": "2024-02-13 03:00:01",
      "source": "Workstation104"
    },
    {
      "id": 63,
      "type": "email",
      "title": "Team Lunch Invite",
      "content": "Join us for team lunch this Friday at 1 PM.",
      "isSuspicious": false,
      "timestamp": "2024-02-12 11:33:00",
      "source": "HR Department"
    },
    {
      "id": 64,
      "type": "log",
      "title": "Privilege Escalation",
      "content": "Temporary admin rights granted to Michael; reason documented.",
      "isSuspicious": true,
      "timestamp": "2024-02-13 14:40:59",
      "source": "IT System"
    },
    {
      "id": 65,
      "type": "file",
      "title": "Finance Report",
      "content": "Monthly finance statement for internal review only.",
      "isSuspicious": false,
      "timestamp": "2024-02-10 15:01:00",
      "source": "Finance Drive"
    },
    {
      "id": 66,
      "type": "email",
      "title": "Unusual Payment Request",
      "content": "Wire transfer request with urgent subject received.",
      "isSuspicious": true,
      "timestamp": "2024-02-15 09:20:00",
      "source": "Finance Team"
    },
    {
      "id": 67,
      "type": "log",
      "title": "VPN Connection",
      "content": "VPN accessed remotely from new country at 2:01 AM.",
      "isSuspicious": true,
      "timestamp": "2024-02-12 02:01:44",
      "source": "VPN Gateway"
    },
    {
      "id": 68,
      "type": "file",
      "title": "Password List Detected",
      "content": "Excel file named passwords_list.xlsx located on desktop.",
      "isSuspicious": true,
      "timestamp": "2024-02-13 11:50:00",
      "source": "User PC"
    },
    {
      "id": 69,
      "type": "log",
      "title": "Software Update Applied",
      "content": "Office suite updated to new version at 1:00 AM.",
      "isSuspicious": false,
      "timestamp": "2024-02-11 01:00:00",
      "source": "Update Server"
    },
    {
      "id": 70,
      "type": "email",
      "title": "Conference RSVP",
      "content": "RSVP for annual business conference; link provided.",
      "isSuspicious": false,
      "timestamp": "2024-02-12 17:00:00",
      "source": "Conference Organizer"
    },
    {
      "id": 71,
      "type": "file",
      "title": "Contact List",
      "content": "Company contacts spreadsheet updated, reviewed by admin.",
      "isSuspicious": false,
      "timestamp": "2024-02-11 14:24:00",
      "source": "Directory System"
    },
    {
      "id": 72,
      "type": "log",
      "title": "USB Device Connected",
      "content": "Unknown USB connected to system after hours.",
      "isSuspicious": true,
      "timestamp": "2024-02-10 22:41:09",
      "source": "Workstation120"
    },
    {
      "id": 73,
      "type": "email",
      "title": "Policy Update Notification",
      "content": "Corporate security policy documents revised.",
      "isSuspicious": false,
      "timestamp": "2024-02-13 10:00:00",
      "source": "Compliance Desk"
    },
    {
      "id": 74,
      "type": "log",
      "title": "Account Locked",
      "content": "User account locked after six bad password attempts.",
      "isSuspicious": true,
      "timestamp": "2024-02-14 15:40:22",
      "source": "Authentication System"
    },
    {
      "id": 75,
      "type": "file",
      "title": "Unknown App Installer",
      "content": "File unknown_setup.exe detected in downloads folder.",
      "isSuspicious": true,
      "timestamp": "2024-02-13 07:10:13",
      "source": "Download Folder"
    },
    {
      "id": 76,
      "type": "email",
      "title": "Password Expiration Warning",
      "content": "Notification: password set to expire in 7 days.",
      "isSuspicious": false,
      "timestamp": "2024-02-13 09:45:00",
      "source": "Auth System"
    },
    {
      "id": 77,
      "type": "log",
      "title": "Meeting Room Booked",
      "content": "Meeting room reserved by John at 10:00 AM.",
      "isSuspicious": false,
      "timestamp": "2024-02-13 09:01:00",
      "source": "Room Scheduler"
    },
    {
      "id": 78,
      "type": "file",
      "title": "Completed Onboarding File",
      "content": "Onboarding checklist marked complete for new hire.",
      "isSuspicious": false,
      "timestamp": "2024-02-10 13:00:00",
      "source": "HR System"
    },
    {
      "id": 79,
      "type": "log",
      "title": "Web Filter Blocked Site",
      "content": "Social media website access attempt denied by filter.",
      "isSuspicious": true,
      "timestamp": "2024-02-12 16:32:19",
      "source": "Web Filter"
    },
    {
      "id": 80,
      "type": "email",
      "title": "System Maintenance Notice",
      "content": "Server maintenance scheduled on Sunday; brief downtime expected.",
      "isSuspicious": false,
      "timestamp": "2024-02-13 17:00:00",
      "source": "Support Desk"
    },
    {
      "id": 81,
      "type": "file",
      "title": "Expense Claim Log",
      "content": "Regular work-related expense claim recorded.",
      "isSuspicious": false,
      "timestamp": "2024-02-10 14:12:12",
      "source": "Finance Portal"
    },
    {
      "id": 82,
      "type": "log",
      "title": "Browser Extension Installed",
      "content": "Chrome plugin ‘QuickPDF’ added to user browser.",
      "isSuspicious": true,
      "timestamp": "2024-02-13 15:27:30",
      "source": "Workstation112"
    },
    {
      "id": 83,
      "type": "email",
      "title": "Suspicious File Attachment",
      "content": "‘invoice.pdf’ attached to message from unknown sender.",
      "isSuspicious": true,
      "timestamp": "2024-02-13 16:32:00",
      "source": "Email Filter"
    },
    {
      "id": 84,
      "type": "log",
      "title": "User Added to Group",
      "content": "Steve added to project group ‘AI-Innovation’.",
      "isSuspicious": false,
      "timestamp": "2024-02-13 15:35:01",
      "source": "Directory System"
    },
    {
      "id": 85,
      "type": "file",
      "title": "Project Plan",
      "content": "Project management plan, Gantt chart included.",
      "isSuspicious": false,
      "timestamp": "2024-02-12 13:45:33",
      "source": "PM Drive"
    },
    {
      "id": 86,
      "type": "email",
      "title": "External Access Notification",
      "content": "Your account was accessed from India and Singapore within 20 minutes.",
      "isSuspicious": true,
      "timestamp": "2024-02-13 07:29:00",
      "source": "Security Center"
    },
    {
      "id": 87,
      "type": "log",
      "title": "Critical Patch Deployed",
      "content": "Security patch deployed on all desktops.",
      "isSuspicious": false,
      "timestamp": "2024-02-13 13:23:30",
      "source": "Update Server"
    },
    {
      "id": 88,
      "type": "file",
      "title": "Public Data Detected",
      "content": "Company document marked confidential found in public folder.",
      "isSuspicious": true,
      "timestamp": "2024-02-13 19:00:12",
      "source": "Data Audit Tool"
    },
    {
      "id": 89,
      "type": "email",
      "title": "Password Tip Reminder",
      "content": "IT: Use strong, unique passwords.",
      "isSuspicious": false,
      "timestamp": "2024-02-13 12:47:09",
      "source": "IT Communication"
    },
    {
      "id": 90,
      "type": "log",
      "title": "2FA Failure Alert",
      "content": "Six failed 2FA attempts by User-24 within one hour.",
      "isSuspicious": true,
      "timestamp": "2024-02-13 19:10:04",
      "source": "Auth Module"
    },
    {
      "id": 91,
      "type": "file",
      "title": "Project Schedule Revision",
      "content": "Revised timeline for product launch.",
      "isSuspicious": false,
      "timestamp": "2024-02-12 13:44:13",
      "source": "PM Tools"
    },
    {
      "id": 92,
      "type": "email",
      "title": "Suspicious Email Link",
      "content": "Email contains unfamiliar and strange looking hyperlink.",
      "isSuspicious": true,
      "timestamp": "2024-02-12 11:18:59",
      "source": "Spam Filter"
    },
    {
      "id": 93,
      "type": "log",
      "title": "Scheduled Logout Executed",
      "content": "User SarahW logged out at 7:01 PM by system auto-logout.",
      "isSuspicious": false,
      "timestamp": "2024-02-13 19:01:11",
      "source": "Workstation227"
    },
    {
      "id": 94,
      "type": "file",
      "title": "Shared Folder Log",
      "content": "Access logs for shared folder show no anomalies.",
      "isSuspicious": false,
      "timestamp": "2024-02-12 22:19:23",
      "source": "SharePoint"
    },
    {
      "id": 95,
      "type": "email",
      "title": "Unrecognized Admin Change",
      "content": "Admin rights granted to new user with no explanation.",
      "isSuspicious": true,
      "timestamp": "2024-02-14 13:15:00",
      "source": "Directory System"
    },
    {
      "id": 96,
      "type": "log",
      "title": "Camera Reboot",
      "content": "Security camera for server room restarted (routine check).",
      "isSuspicious": false,
      "timestamp": "2024-02-13 02:31:10",
      "source": "Security Office"
    },
    {
      "id": 97,
      "type": "file",
      "title": "Employee Credentials Document",
      "content": "File passwords.docx discovered in Documents folder.",
      "isSuspicious": true,
      "timestamp": "2024-02-13 14:44:23",
      "source": "User Laptop"
    },
    {
      "id": 98,
      "type": "email",
      "title": "Message From Unknown Domain",
      "content": "Received message from unknown domain ending in .top.",
      "isSuspicious": true,
      "timestamp": "2024-02-13 15:02:08",
      "source": "Spam Filter"
    },
    {
      "id": 99,
      "type": "log",
      "title": "Printer Firmware Update",
      "content": "Main printer firmware updated to latest version.",
      "isSuspicious": false,
      "timestamp": "2024-02-10 09:30:00",
      "source": "Printer Server"
    },
    {
      "id": 100,
      "type": "file",
      "title": "Onboarding Checklist",
      "content": "Checklist for new hires completed.",
      "isSuspicious": false,
      "timestamp": "2024-02-13 09:00:00",
      "source": "HR Department"
    }
  ];

export const getRandomLevel2Evidence = (count) => {
  const shuffled = [...level2Evidence].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

