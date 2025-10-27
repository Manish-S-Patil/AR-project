// Level 3 Evidence Questions - 9 questions needed
// Advanced cybersecurity concepts

export const level3Evidence = [
  {
    id: 21,
    question: "What is an Advanced Persistent Threat (APT)?",
    options: [
      "A persistent virus",
      "A sophisticated, long-term cyberattack",
      "A firewall feature",
      "An antivirus program"
    ],
    correct: 1,
    explanation: "APTs are sophisticated, long-term attacks where attackers maintain access to compromised systems."
  },
  {
    id: 22,
    question: "What is end-to-end encryption?",
    options: [
      "Encryption at the end of messages",
      "Encryption only visible to sender and receiver",
      "Basic encryption",
      "Double encryption"
    ],
    correct: 1,
    explanation: "End-to-end encryption ensures only the sender and intended recipient can read messages."
  },
  {
    id: 23,
    question: "What is an intrusion detection system (IDS)?",
    options: [
      "System that prevents intrusions",
      "System that monitors network for suspicious activity",
      "Antivirus software",
      "Firewall system"
    ],
    correct: 1,
    explanation: "IDS monitors network traffic to detect and alert about potential threats."
  },
  {
    id: 24,
    question: "What is spear phishing?",
    options: [
      "General phishing email",
      "Targeted phishing against specific individual",
      "Phishing with spear icon",
      "Slow phishing"
    ],
    correct: 1,
    explanation: "Spear phishing targets specific individuals with personalized messages."
  },
  {
    id: 25,
    question: "What is a honeypot?",
    options: [
      "A trap to detect attackers",
      "A type of malware",
      "A firewall",
      "A password"
    ],
    correct: 0,
    explanation: "A honeypot is a security system designed to lure and detect attackers."
  },
  {
    id: 26,
    question: "What is multi-factor authentication (MFA)?",
    options: [
      "One authentication method",
      "Multiple verification methods (2FA, 3FA, etc.)",
      "Multiple passwords",
      "Email verification"
    ],
    correct: 1,
    explanation: "MFA requires multiple verification methods to enhance security."
  },
  {
    id: 27,
    question: "What is a man-in-the-middle attack?",
    options: [
      "Direct attack on target",
      "Intercepting communication between two parties",
      "Inside job attack",
      "Group attack"
    ],
    correct: 1,
    explanation: "MITM attacks intercept communication between two parties."
  },
  {
    id: 28,
    question: "What is penetration testing?",
    options: [
      "Unauthorized hacking",
      "Authorized security testing",
      "Bug testing",
      "Software testing"
    ],
    correct: 1,
    explanation: "Penetration testing is authorized security testing to find vulnerabilities."
  },
  {
    id: 29,
    question: "What is a security audit?",
    options: [
      "Financial audit",
      "Systematic evaluation of security measures",
      "File check",
      "Network speed test"
    ],
    correct: 1,
    explanation: "A security audit evaluates security policies, procedures, and implementations."
  },
  {
    id: 30,
    question: "What is threat intelligence?",
    options: [
      "Collecting data about potential threats",
      "Guessing threats",
      "Ignoring threats",
      "Creating threats"
    ],
    correct: 0,
    explanation: "Threat intelligence is evidence-based knowledge about potential cyberattacks."
  },
  {
    id: 31,
    question: "What is a security incident response?",
    options: [
      "Ignoring incidents",
      "Structured approach to handling security breaches",
      "Deleting logs",
      "Shutting down systems"
    ],
    correct: 1,
    explanation: "Incident response is a coordinated effort to address security breaches."
  },
  {
    id: 32,
    question: "What is data loss prevention (DLP)?",
    options: [
      "Losing data",
      "Technologies to prevent data exfiltration",
      "Deleting data",
      "Storing data"
    ],
    correct: 1,
    explanation: "DLP technologies prevent sensitive data from leaving the organization."
  }
];

export const getRandomLevel3Questions = (count) => {
  const shuffled = [...level3Evidence].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

