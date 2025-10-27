// Level 5 Evidence Questions - 15 questions needed
// Master-level cybersecurity concepts

export const level5Evidence = [
  {
    id: 61,
    question: "What is a blockchain security mechanism?",
    options: [
      "Distributed ledger security",
      "Database security",
      "Password security",
      "Network security"
    ],
    correct: 0,
    explanation: "Blockchain uses distributed consensus and cryptographic hashing for security."
  },
  {
    id: 62,
    question: "What is quantum cryptography?",
    options: [
      "Security using quantum computing",
      "Physics-based security methods",
      "Quantum physics principles",
      "Light-based security"
    ],
    correct: 1,
    explanation: "Quantum cryptography uses quantum mechanics for secure communication."
  },
  {
    id: 63,
    question: "What is microsegmentation?",
    options: [
      "Small data analysis",
      "Dividing network into secure zones",
      "File splitting",
      "Code optimization"
    ],
    correct: 1,
    explanation: "Microsegmentation isolates workloads and applies security controls individually."
  },
  {
    id: 64,
    question: "What is Zero Trust security model?",
    options: [
      "Trusting nobody by default",
      "Verifying everything, trusting nothing",
      "No security model",
      "Complete trust"
    ],
    correct: 1,
    explanation: "Zero Trust never implicitly trusts anything and continuously verifies."
  },
  {
    id: 65,
    question: "What is DevSecOps?",
    options: [
      "Developer security operations",
      "Integrating security throughout DevOps lifecycle",
      "Developer operations only",
      "Security operations only"
    ],
    correct: 1,
    explanation: "DevSecOps integrates security practices throughout the DevOps pipeline."
  },
  {
    id: 66,
    question: "What is extended detection and response (XDR)?",
    options: [
      "Extended security monitoring across systems",
      "Extended data routing",
      "Extended network",
      "Extended storage"
    ],
    correct: 0,
    explanation: "XDR provides unified security visibility across endpoints, cloud, and networks."
  },
  {
    id: 67,
    question: "What is confidential computing?",
    options: [
      "Secret computing",
      "Protecting data in use through encryption",
      "Private computing",
      "Isolated computing"
    ],
    correct: 1,
    explanation: "Confidential computing encrypts data while it's being processed."
  },
  {
    id: 68,
    question: "What is an air-gapped system?",
    options: [
      "Wireless system",
      "Isolated system not connected to networks",
      "Cloud system",
      "Networked system"
    ],
    correct: 1,
    explanation: "Air-gapped systems are physically isolated from unsecured networks."
  },
  {
    id: 69,
    question: "What is Security as Code (SaC)?",
    options: [
      "Security coding standards",
      "Managing security through code/automation",
      "Writing secure code",
      "Code security only"
    ],
    correct: 1,
    explanation: "SaC manages security policies and controls through automated code."
  },
  {
    id: 70,
    question: "What is threat modeling?",
    options: [
      "Identifying potential security threats",
      "Creating threats",
      "Ignoring threats",
      "Modeling threats"
    ],
    correct: 0,
    explanation: "Threat modeling identifies potential security threats before development."
  },
  {
    id: 71,
    question: "What is security architecture?",
    options: [
      "Building design",
      "Designing secure systems and frameworks",
      "Network design only",
      "Physical security"
    ],
    correct: 1,
    explanation: "Security architecture designs secure systems, networks, and data flows."
  },
  {
    id: 72,
    question: "What is a Security Operations Center (SOC)?",
    options: [
      "Centralized security monitoring team",
      "Security office",
      "Security training center",
      "Security storage"
    ],
    correct: 0,
    explanation: "A SOC monitors and defends organizations against cyberattacks 24/7."
  },
  {
    id: 73,
    question: "What is a Security Development Lifecycle (SDL)?",
    options: [
      "Security process throughout development",
      "Development only",
      "Testing only",
      "Deployment only"
    ],
    correct: 0,
    explanation: "SDL integrates security practices throughout software development lifecycle."
  },
  {
    id: 74,
    question: "What is cloud security posture management?",
    options: [
      "Managing cloud security settings",
      "Posture training",
      "Physical posture",
      "Network posture"
    ],
    correct: 0,
    explanation: "CSPM continuously monitors and manages cloud security configurations."
  },
  {
    id: 75,
    question: "What is supply chain security?",
    options: [
      "Securing software supply chain",
      "Product delivery",
      "Manufacturing",
      "Logistics only"
    ],
    correct: 0,
    explanation: "Supply chain security protects against vulnerabilities in third-party software."
  },
  {
    id: 76,
    question: "What is a security playbook?",
    options: [
      "Detailed response procedures for incidents",
      "Security training book",
      "Security manual",
      "Play documentation"
    ],
    correct: 0,
    explanation: "A playbook provides step-by-step procedures for responding to security incidents."
  },
  {
    id: 77,
    question: "What is attack surface management?",
    options: [
      "Managing exposed attack points",
      "Attack planning",
      "Network management",
      "System management"
    ],
    correct: 0,
    explanation: "Attack surface management identifies and minimizes exposed vulnerabilities."
  },
  {
    id: 78,
    question: "What is security awareness training?",
    options: [
      "Educating users about security threats",
      "Security certification",
      "User testing",
      "Password training"
    ],
    correct: 0,
    explanation: "Security awareness training educates users to recognize and avoid threats."
  }
];

export const getRandomLevel5Questions = (count) => {
  const shuffled = [...level5Evidence].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

