// Level 4 Evidence Questions - 12 questions needed
// Expert cybersecurity concepts

export const level4Evidence = [
  {
    id: 41,
    question: "What is a Security Information and Event Management (SIEM) system?",
    options: [
      "Email management",
      "Centralized security monitoring and analysis",
      "Database system",
      "Cloud storage"
    ],
    correct: 1,
    explanation: "SIEM provides real-time analysis of security alerts from multiple sources."
  },
  {
    id: 42,
    question: "What is lateral movement in cybersecurity?",
    options: [
      "Moving files laterally",
      "Attackers moving through network to access data",
      "Horizontal scrolling",
      "Page navigation"
    ],
    correct: 1,
    explanation: "Lateral movement is when attackers move through a network to access sensitive data."
  },
  {
    id: 43,
    question: "What is a rootkit?",
    options: [
      "Gardening tool",
      "Malware that maintains privileged system access",
      "Software root",
      "Administrative tool"
    ],
    correct: 1,
    explanation: "A rootkit is malicious software designed to provide unauthorized access while remaining hidden."
  },
  {
    id: 44,
    question: "What is security orchestration?",
    options: [
      "Playing music securely",
      "Automating security tasks and workflows",
      "Network routing",
      "Data organization"
    ],
    correct: 1,
    explanation: "Security orchestration automates and coordinates security tasks across systems."
  },
  {
    id: 45,
    question: "What is Kerberos authentication?",
    options: [
      "Network authentication protocol",
      "Password manager",
      "Biometric system",
      "Token authentication"
    ],
    correct: 0,
    explanation: "Kerberos is a network authentication protocol using secret-key cryptography."
  },
  {
    id: 46,
    question: "What is a security baseline?",
    options: [
      "Minimum security standards",
      "Maximum security",
      "Standard password",
      "Default settings"
    ],
    correct: 0,
    explanation: "A security baseline defines minimum security standards and configurations."
  },
  {
    id: 47,
    question: "What is digital forensics?",
    options: [
      "Investigating cybercrimes using digital evidence",
      "Digital photography",
      "Data entry",
      "Website design"
    ],
    correct: 0,
    explanation: "Digital forensics examines digital devices to investigate cybercrimes."
  },
  {
    id: 48,
    question: "What is a vulnerability assessment?",
    options: [
      "Checking for security flaws",
      "Creating vulnerabilities",
      "Ignoring risks",
      "Updating software"
    ],
    correct: 0,
    explanation: "Vulnerability assessment identifies and evaluates security weaknesses in systems."
  },
  {
    id: 49,
    question: "What is behavioral analytics?",
    options: [
      "Analyzing user behavior patterns for anomalies",
      "Tracking users",
      "Speed analysis",
      "Color analysis"
    ],
    correct: 0,
    explanation: "Behavioral analytics detects anomalies by analyzing user behavior patterns."
  },
  {
    id: 50,
    question: "What is container security?",
    options: [
      "Packaging security",
      "Securing containerized applications",
      "Physical containers",
      "Data containers"
    ],
    correct: 1,
    explanation: "Container security protects containerized applications from vulnerabilities."
  },
  {
    id: 51,
    question: "What is a security perimeter?",
    options: [
      "Network boundary controls",
      "Physical boundary",
      "Firewall shape",
      "Router configuration"
    ],
    correct: 0,
    explanation: "A security perimeter defines network boundaries and access controls."
  },
  {
    id: 52,
    question: "What is application security (AppSec)?",
    options: [
      "App store security",
      "Security practices during application development",
      "Mobile apps only",
      "Web browsers"
    ],
    correct: 1,
    explanation: "AppSec involves secure coding practices throughout the software development lifecycle."
  },
  {
    id: 53,
    question: "What is a security policy?",
    options: [
      "Document outlining security rules and procedures",
      "Insurance policy",
      "Government policy",
      "Privacy policy only"
    ],
    correct: 0,
    explanation: "A security policy defines rules and procedures for protecting information assets."
  },
  {
    id: 54,
    question: "What is identity and access management (IAM)?",
    options: [
      "Managing user identities and access rights",
      "Email management",
      "File management",
      "Database management"
    ],
    correct: 0,
    explanation: "IAM manages user identities and controls access to resources."
  }
];

export const getRandomLevel4Questions = (count) => {
  const shuffled = [...level4Evidence].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

