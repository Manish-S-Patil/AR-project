// Level 2 Evidence Questions - 7 questions needed
// Intermediate cybersecurity concepts

export const level2Evidence = [
  {
    id: 11,
    question: "What is social engineering?",
    options: [
      "A type of computer virus",
      "Manipulating people to reveal confidential information",
      "A software design method",
      "Network configuration"
    ],
    correct: 1,
    explanation: "Social engineering is the art of manipulating people to give up confidential information."
  },
  {
    id: 12,
    question: "What is ransomware?",
    options: [
      "Scareware that blocks data",
      "Encryption software",
      "Malware that encrypts files for payment",
      "Antivirus program"
    ],
    correct: 2,
    explanation: "Ransomware is malware that encrypts files and demands payment to restore access."
  },
  {
    id: 13,
    question: "What is a zero-day exploit?",
    options: [
      "A vulnerability with no patch yet",
      "Zero bugs in code",
      "An attack with zero victims",
      "Exploit on day zero"
    ],
    correct: 0,
    explanation: "A zero-day exploit is a security flaw unknown to vendors with no available patch."
  },
  {
    id: 14,
    question: "What does DNS stand for?",
    options: [
      "Domain Name System",
      "Dynamic Network Service",
      "Digital Network Security",
      "Data Name Service"
    ],
    correct: 0,
    explanation: "DNS translates domain names into IP addresses so browsers can load resources."
  },
  {
    id: 15,
    question: "What is encryption?",
    options: [
      "Compressing files",
      "Converting data to secure format",
      "Deleting data",
      "Sharing data"
    ],
    correct: 1,
    explanation: "Encryption converts readable data into encoded format to protect confidentiality."
  },
  {
    id: 16,
    question: "What is an IP address?",
    options: [
      "Internet Protocol address",
      "Identity Password address",
      "Internal Platform address",
      "Integrated Program address"
    ],
    correct: 0,
    explanation: "An IP address is a unique identifier for devices on a network."
  },
  {
    id: 17,
    question: "What does SSL/TLS do?",
    options: [
      "Slows down websites",
      "Encrypts data transmission",
      "Blocks websites",
      "Compresses data"
    ],
    correct: 1,
    explanation: "SSL/TLS encrypts data sent between your browser and the server."
  },
  {
    id: 18,
    question: "What is a DDoS attack?",
    options: [
      "Distributed Denial of Service",
      "Direct Denial of Service",
      "Digital Delivery of Service",
      "Delayed Delivery of Service"
    ],
    correct: 0,
    explanation: "DDoS attacks overwhelm servers with traffic from multiple sources to make them unavailable."
  },
  {
    id: 19,
    question: "What is biometric authentication?",
    options: [
      "Using passwords",
      "Using physical characteristics (fingerprint, face)",
      "Using email",
      "Using PIN numbers"
    ],
    correct: 1,
    explanation: "Biometric authentication uses unique physical or behavioral characteristics to verify identity."
  },
  {
    id: 20,
    question: "What is a password manager?",
    options: [
      "A person who remembers passwords",
      "Software that stores and manages passwords securely",
      "A document with passwords",
      "Browser password save feature"
    ],
    correct: 1,
    explanation: "Password managers securely store and generate unique passwords for different accounts."
  }
];

export const getRandomLevel2Questions = (count) => {
  const shuffled = [...level2Evidence].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

