// Trace The Threat - Level 1 Evidence
// These are suspicious logs/events for analysis

export const level1Evidence = [
    {
      "id": 1,
      "type": "email",
      "title": "Password Change Reminder",
      "content": "Monthly reminder email from IT to update passwords.",
      "isSuspicious": false,
      "timestamp": "2024-01-10 09:00:00",
      "source": "IT Department"
    },
    {
      "id": 2,
      "type": "log",
      "title": "Successful Login Record",
      "content": "User James logged in from office IP at 9:01 AM.",
      "isSuspicious": false,
      "timestamp": "2024-01-10 09:01:23",
      "source": "Authentication Server"
    },
    {
      "id": 3,
      "type": "file",
      "title": "Policy Document",
      "content": "Cybersecurity Policy.pdf downloaded from company intranet.",
      "isSuspicious": false,
      "timestamp": "2024-01-10 15:04:11",
      "source": "Company Intranet"
    },
    {
      "id": 4,
      "type": "log",
      "title": "System Startup Log",
      "content": "Workstation booted successfully at 8:57 AM.",
      "isSuspicious": false,
      "timestamp": "2024-01-10 08:57:30",
      "source": "Workstation101"
    },
    {
      "id": 5,
      "type": "email",
      "title": "Welcome to the Team",
      "content": "HR onboarding email sent with helpful links.",
      "isSuspicious": false,
      "timestamp": "2024-01-09 08:00:00",
      "source": "HR Department"
    },
    {
      "id": 6,
      "type": "log",
      "title": "Printer Usage Log",
      "content": "Printer used by Sarah at 10:15 AM for HR documents.",
      "isSuspicious": false,
      "timestamp": "2024-01-14 10:15:49",
      "source": "Printer Server"
    },
    {
      "id": 7,
      "type": "file",
      "title": "Employee Handbook",
      "content": "Standard handbook file in HR folder.",
      "isSuspicious": false,
      "timestamp": "2024-01-09 09:30:00",
      "source": "HR Shared Drive"
    },
    {
      "id": 8,
      "type": "log",
      "title": "Logout Record",
      "content": "User logged out from HR application at 6:02 PM.",
      "isSuspicious": false,
      "timestamp": "2024-01-10 18:02:19",
      "source": "HR Application"
    },
    {
      "id": 9,
      "type": "email",
      "title": "Holiday Notice",
      "content": "Official holiday announcement from admin@company.com.",
      "isSuspicious": false,
      "timestamp": "2024-01-08 13:15:00",
      "source": "Administration Office"
    },
    {
      "id": 10,
      "type": "file",
      "title": "Backup Verification",
      "content": "Daily backup completed successfully. 1.2TB of data backed up to secure cloud storage.",
      "isSuspicious": false,
      "timestamp": "2024-01-09 06:00:00",
      "source": "Backup System"
    },
    {
      "id": 11,
      "type": "file",
      "title": "Training Guide",
      "content": "Phishing Awareness PDF assigned to all staff.",
      "isSuspicious": false,
      "timestamp": "2024-01-09 11:17:30",
      "source": "Training Portal"
    },
    {
      "id": 12,
      "type": "log",
      "title": "Password Update",
      "content": "User updated password at 12:13 PM, confirmed by IT.",
      "isSuspicious": false,
      "timestamp": "2024-01-10 12:13:22",
      "source": "IT Support"
    },
    {
      "id": 13,
      "type": "email",
      "title": "Meeting Invite",
      "content": "Team meeting scheduled for Monday 2:00 PM.",
      "isSuspicious": false,
      "timestamp": "2024-01-11 09:30:00",
      "source": "Calendaring System"
    },
    {
      "id": 14,
      "type": "log",
      "title": "System Health Check",
      "content": "All systems functional, no issues detected.",
      "isSuspicious": false,
      "timestamp": "2024-01-10 10:10:12",
      "source": "Monitoring Application"
    },
    {
      "id": 15,
      "type": "file",
      "title": "Payroll Spreadsheet",
      "content": "Payroll_March.xlsx accessed by Finance at 3:01 PM.",
      "isSuspicious": false,
      "timestamp": "2024-01-15 15:01:00",
      "source": "Finance Shared Drive"
    },
    {
      "id": 16,
      "type": "email",
      "title": "Office Maintenance",
      "content": "Notification about air conditioning maintenance.",
      "isSuspicious": false,
      "timestamp": "2024-01-12 07:30:00",
      "source": "Facilities"
    },
    {
      "id": 17,
      "type": "log",
      "title": "User Role Assignment",
      "content": "New user assigned Staff role by HR.",
      "isSuspicious": false,
      "timestamp": "2024-01-09 16:12:11",
      "source": "HR System"
    },
    {
      "id": 18,
      "type": "file",
      "title": "VPN Instructions",
      "content": "VPN_Setup.pdf in IT shared folder.",
      "isSuspicious": false,
      "timestamp": "2024-01-10 13:00:00",
      "source": "IT Shared Drive"
    },
    {
      "id": 19,
      "type": "log",
      "title": "Network Scan Log",
      "content": "Routine scan showed no vulnerabilities.",
      "isSuspicious": false,
      "timestamp": "2024-01-12 22:30:10",
      "source": "Network Scanner"
    },
    {
      "id": 20,
      "type": "email",
      "title": "Conference RSVP",
      "content": "RSVP link for annual business conference.",
      "isSuspicious": false,
      "timestamp": "2024-01-11 17:00:00",
      "source": "Conference Organizer"
    },
    {
      "id": 21,
      "type": "file",
      "title": "Contact List",
      "content": "Updated company contact Excel file.",
      "isSuspicious": false,
      "timestamp": "2024-01-09 14:24:00",
      "source": "Directory Server"
    },
    {
      "id": 22,
      "type": "log",
      "title": "Scheduled Software Update",
      "content": "Version 1.2.1 installed on main server.",
      "isSuspicious": false,
      "timestamp": "2024-01-10 20:00:00",
      "source": "Main Server"
    },
    {
      "id": 23,
      "type": "email",
      "title": "Admin Policy Reminder",
      "content": "Reminder about proper use of admin privileges.",
      "isSuspicious": false,
      "timestamp": "2024-01-13 10:00:00",
      "source": "IT Policy Desk"
    },
    {
      "id": 24,
      "type": "log",
      "title": "Printer Connection Established",
      "content": "New office printer added to network.",
      "isSuspicious": false,
      "timestamp": "2024-01-13 14:30:22",
      "source": "Printer Server"
    },
    {
      "id": 25,
      "type": "file",
      "title": "Secure Browsing Rules",
      "content": "PDF outlining safe browsing practices.",
      "isSuspicious": false,
      "timestamp": "2024-01-09 11:12:12",
      "source": "Policy Repository"
    },
    {
      "id": 26,
      "type": "email",
      "title": "Password Expiration Alert",
      "content": "Alert about password expiring in 7 days.",
      "isSuspicious": false,
      "timestamp": "2024-01-14 09:45:00",
      "source": "Authentication Server"
    },
    {
      "id": 27,
      "type": "log",
      "title": "USB Removal Log",
      "content": "USB safely removed by IT technician.",
      "isSuspicious": false,
      "timestamp": "2024-01-13 15:00:11",
      "source": "Workstation108"
    },
    {
      "id": 28,
      "type": "file",
      "title": "Meeting Minutes",
      "content": "Minutes of last team meeting uploaded to SharePoint.",
      "isSuspicious": false,
      "timestamp": "2024-01-12 18:24:21",
      "source": "SharePoint"
    },
    {
      "id": 29,
      "type": "log",
      "title": "IT Support Ticket Closed",
      "content": "Issue #205 resolved regarding application access.",
      "isSuspicious": false,
      "timestamp": "2024-01-10 16:50:02",
      "source": "IT Helpdesk"
    },
    {
      "id": 30,
      "type": "email",
      "title": "System Downtime Warning",
      "content": "Scheduled downtime for updates this Sunday.",
      "isSuspicious": false,
      "timestamp": "2024-01-14 17:00:00",
      "source": "Support Team"
    },
    {
      "id": 31,
      "type": "file",
      "title": "Network Policy",
      "content": "Updated PDF about company network usage.",
      "isSuspicious": false,
      "timestamp": "2024-01-13 15:25:00",
      "source": "IT Policy Desk"
    },
    {
      "id": 32,
      "type": "log",
      "title": "Workstation Locked",
      "content": "User locked workstation before lunch break.",
      "isSuspicious": false,
      "timestamp": "2024-01-15 12:35:31",
      "source": "Workstation101"
    },
    {
      "id": 33,
      "type": "email",
      "title": "Cafeteria Menu",
      "content": "Weekly menu from company cafe.",
      "isSuspicious": false,
      "timestamp": "2024-01-11 08:01:00",
      "source": "Cafeteria Management"
    },
    {
      "id": 34,
      "type": "log",
      "title": "User Added to Group",
      "content": "Emily added to Developers group.",
      "isSuspicious": false,
      "timestamp": "2024-01-10 15:35:01",
      "source": "HR System"
    },
    {
      "id": 35,
      "type": "file",
      "title": "Leave Form",
      "content": "Standard leave request form.",
      "isSuspicious": false,
      "timestamp": "2024-01-09 13:47:33",
      "source": "HR Shared Drive"
    },
    {
      "id": 36,
      "type": "email",
      "title": "Birthday Wishes",
      "content": "HR sending birthday greetings.",
      "isSuspicious": false,
      "timestamp": "2024-01-09 07:57:00",
      "source": "HR Team"
    },
    {
      "id": 37,
      "type": "log",
      "title": "Security Camera Check",
      "content": "All office cameras online and recording.",
      "isSuspicious": false,
      "timestamp": "2024-01-12 10:33:00",
      "source": "Security System"
    },
    {
      "id": 38,
      "type": "file",
      "title": "Expense Claim Form",
      "content": "Excel sheet for work expense submissions.",
      "isSuspicious": false,
      "timestamp": "2024-01-09 19:42:00",
      "source": "Finance Shared Drive"
    },
    {
      "id": 39,
      "type": "email",
      "title": "Feedback Survey",
      "content": "Anonymous employee feedback survey link.",
      "isSuspicious": false,
      "timestamp": "2024-01-12 13:21:00",
      "source": "HR Department"
    },
    {
      "id": 40,
      "type": "log",
      "title": "HR System Update Log",
      "content": "HR software updated at 2:17 PM.",
      "isSuspicious": false,
      "timestamp": "2024-01-14 14:17:21",
      "source": "HR System"
    },
    {
      "id": 41,
      "type": "file",
      "title": "Cyber Tips Poster",
      "content": "Cybersecurity_Tips.jpg shared for awareness.",
      "isSuspicious": false,
      "timestamp": "2024-01-11 10:44:32",
      "source": "Policy Repository"
    },
    {
      "id": 42,
      "type": "email",
      "title": "Password Complexity Tip",
      "content": "IT shares advice to create complex passwords.",
      "isSuspicious": false,
      "timestamp": "2024-01-13 12:09:00",
      "source": "IT Department"
    },
    {
      "id": 43,
      "type": "log",
      "title": "Identity Confirmation Log",
      "content": "MFA confirmed for user account at 4:45 PM.",
      "isSuspicious": false,
      "timestamp": "2024-01-11 16:45:59",
      "source": "Authentication Server"
    },
    {
      "id": 44,
      "type": "file",
      "title": "Risk Policy Statement",
      "content": "Risk management PDF in management folder.",
      "isSuspicious": false,
      "timestamp": "2024-01-10 14:32:11",
      "source": "Management Server"
    },
    {
      "id": 45,
      "type": "email",
      "title": "Office Renovation Notice",
      "content": "Upcoming workspace renovation schedule.",
      "isSuspicious": false,
      "timestamp": "2024-01-10 07:22:00",
      "source": "Facilities"
    },
    {
      "id": 46,
      "type": "log",
      "title": "Account Role Downgrade",
      "content": "User role changed from Admin to Staff.",
      "isSuspicious": false,
      "timestamp": "2024-01-09 16:01:00",
      "source": "HR System"
    },
    {
      "id": 47,
      "type": "file",
      "title": "Workspace Map",
      "content": "Updated Office_Map.pdf on shared drive.",
      "isSuspicious": false,
      "timestamp": "2024-01-14 08:08:10",
      "source": "Facilities"
    },
    {
      "id": 48,
      "type": "email",
      "title": "Quarterly Results",
      "content": "Q2 financial results from Finance department.",
      "isSuspicious": false,
      "timestamp": "2024-01-13 18:00:00",
      "source": "Finance Department"
    },
    {
      "id": 49,
      "type": "log",
      "title": "Scheduled Logout Log",
      "content": "User scheduled for auto logout at 7:01 PM.",
      "isSuspicious": false,
      "timestamp": "2024-01-10 19:01:11",
      "source": "Workstation110"
    },
    {
      "id": 50,
      "type": "file",
      "title": "Onboarding Checklist",
      "content": "Standard checklist for new employee onboarding.",
      "isSuspicious": false,
      "timestamp": "2024-01-13 09:00:00",
      "source": "HR Department"
    }
  ];

export const getRandomLevel1Evidence = (count) => {
  const shuffled = [...level1Evidence].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

