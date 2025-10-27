// Level 1 Evidence Questions - 5 questions needed
// Basic cybersecurity concepts

export const level1Evidence = [
  {
    id: 1,
    question: "What does 'phishing' mean in cybersecurity?",
    options: [
      "A type of virus",
      "Fraudulent emails to steal information",
      "A hacking technique",
      "A password policy"
    ],
    correct: 1,
    explanation: "Phishing is a cybercrime where victims are contacted by email, telephone or text message by someone posing as a legitimate institution to lure individuals into providing sensitive data."
  },
  {
    id: 2,
    question: "What is the strongest type of password?",
    options: [
      "Your pet's name",
      "A mix of letters, numbers, and symbols",
      "123456",
      "password"
    ],
    correct: 1,
    explanation: "A strong password contains uppercase letters, lowercase letters, numbers, and special characters."
  },
  {
    id: 3,
    question: "What should you do if you receive a suspicious email?",
    options: [
      "Click all links to check",
      "Delete it immediately",
      "Forward to everyone",
      "Reply with your password"
    ],
    correct: 1,
    explanation: "Always delete suspicious emails without clicking links or downloading attachments."
  },
  {
    id: 4,
    question: "What is malware?",
    options: [
      "Good software",
      "Malicious software",
      "Antivirus program",
      "Web browser"
    ],
    correct: 1,
    explanation: "Malware (malicious software) is any program or file designed to damage or disrupt computer systems."
  },
  {
    id: 5,
    question: "What does a firewall do?",
    options: [
      "Starts fire",
      "Blocks unauthorized access",
      "Cleans computer",
      "Sends emails"
    ],
    correct: 1,
    explanation: "A firewall is a network security device that monitors and filters incoming and outgoing traffic based on security policies."
  },
  {
    id: 6,
    question: "When should you update your software?",
    options: [
      "Never",
      "Only when it breaks",
      "Regularly as updates are released",
      "Once a year"
    ],
    correct: 2,
    explanation: "Regular software updates provide security patches and fix vulnerabilities."
  },
  {
    id: 7,
    question: "What is two-factor authentication (2FA)?",
    options: [
      "Two passwords",
      "An extra security step beyond password",
      "Two antivirus programs",
      "Double speed internet"
    ],
    correct: 1,
    explanation: "2FA adds an extra layer of security by requiring two different types of credentials."
  },
  {
    id: 8,
    question: "What should you never share online?",
    options: [
      "Your favorite color",
      "Social Security Number",
      "Your pet's name",
      "Your hobby"
    ],
    correct: 1,
    explanation: "Never share sensitive personal information like Social Security Numbers online."
  },
  {
    id: 9,
    question: "What does HTTPS stand for?",
    options: [
      "Hyper Text Transfer Protocol Secure",
      "High Tech Transfer Protocol",
      "Home Technology Transfer Protocol",
      "Hyper Text Transfer Protocol Safe"
    ],
    correct: 0,
    explanation: "HTTPS is the secure version of HTTP, the protocol over which data is sent between your browser and the website."
  },
  {
    id: 10,
    question: "What is a VPN?",
    options: [
      "Very Private Network",
      "Virtual Private Network",
      "Verified Program Network",
      "Visible Platform Network"
    ],
    correct: 1,
    explanation: "A VPN creates a secure, encrypted connection over a less secure network."
  }
];

export const getRandomLevel1Questions = (count) => {
  const shuffled = [...level1Evidence].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

