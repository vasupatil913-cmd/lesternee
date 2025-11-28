import { ModuleData } from './types';

// Data extracted strictly from the provided PDF OCR content
export const COURSE_MODULES: ModuleData[] = [
  {
    id: 1,
    title: "Foundations: Ethics, Security, and Attack Methodology",
    duration: "60 Minutes",
    subtopics: [
      { title: "Hacking & Ethics", time: "15 min", details: ["Ethical Hacking Definition", "Hacker Classes (White Hat, Black Hat, Gray Hat, Hacktivism)"] },
      { title: "Security Pillars", time: "15 min", details: ["CIA Triad (Confidentiality, Integrity, Availability)", "Security, Functionality, and Ease of Use Triangle"] },
      { title: "Methodology & Legality", time: "30 min", details: ["Prerequisites for Ethical Hacking (Authorization, Scope)", "Vulnerability Assessment vs. Penetration Testing", "The Five Phases of Ethical Hacking (Reconnaissance, Scanning, Gaining Access, Maintaining Access, Clearing Tracks)"] }
    ],
    outcomes: [
      "Define ethical hacking and differentiate between hacker types and their motivations.",
      "Explain the foundational goals of security: the CIA Triad and the Security/Functionality balance.",
      "Outline the chronological five phases of an ethical hack."
    ]
  },
  {
    id: 2,
    title: "Lab Setup & Core Technical Foundations",
    duration: "75 Minutes",
    subtopics: [
      { title: "Essential Skills", time: "25 min", details: ["Required Skills (OS, Networking, Programming)", "Introduction to Kali Linux and VM Setup", "Python's Role in Ethical Hacking/Scripting"] },
      { title: "Networking Basics", time: "30 min", details: ["OSI Model Layers", "TCP/IP Architecture", "TCP Flags and the Three-Way Handshake"] },
      { title: "Command Line & Evasion", time: "20 min", details: ["Essential Linux Utilities (grep, sudo, ls, cd)", "Anonymity using Proxy Chains"] }
    ],
    outcomes: [
      "Set up and navigate a virtualized penetration testing environment (Kali Linux).",
      "Demonstrate proficiency in core networking concepts, including segment structure and connection establishment.",
      "Understand the necessity of command-line tools and Python scripting for automated tasks."
    ]
  },
  {
    id: 3,
    title: "Phase 1: Footprinting and Passive Reconnaissance",
    duration: "75 Minutes",
    subtopics: [
      { title: "Recon Concepts", time: "15 min", details: ["Passive vs. Active Reconnaissance", "Goals of Footprinting (Domains, IP Ranges, Architecture, Employees)"] },
      { title: "OSINT and Public Data", time: "20 min", details: ["Domain and IP lookup using Whois", "DNS queries (dig, nslookup)", "Traceroute"] },
      { title: "Google Hacking", time: "25 min", details: ["Using advanced search operators (Dorks) (site:, inurl:, filetype:)", "Utilizing the Exploit-DB Google Hacking Database"] },
      { title: "Advanced Tools", time: "15 min", details: ["theHarvester", "Maltego", "Subdomain enumeration tools (Sublister, CrT.sh)"] }
    ],
    outcomes: [
      "Gather passive intelligence on a target using Open Source Intelligence (OSINT) methods.",
      "Apply Google Dorking to discover sensitive or hidden publicly exposed information.",
      "Identify target subdomains and associated network infrastructure."
    ]
  },
  {
    id: 4,
    title: "Phase 2: Scanning Networks & Enumeration I (Nmap)",
    duration: "70 Minutes",
    subtopics: [
      { title: "Scanning Objectives", time: "10 min", details: ["Objectives of Scanning (Network, Port, Vulnerability)"] },
      { title: "Port Scan Types", time: "15 min", details: ["TCP Scan Types (SYN/Stealth, Connect, XMAS, NULL, FIN)", "ICMP sweep importance and pitfalls"] },
      { title: "Nmap Mastery", time: "25 min", details: ["Detailed command syntax", "Target Specification (CIDR)", "Using Nmap flags (-sS, -sV, -O, -A)", "Timing Templates (T0-T5) for Stealth"] },
      { title: "Enumeration Overview", time: "20 min", details: ["Services and Ports for Enumeration", "Banner Grabbing for OS/Service Version Detection"] }
    ],
    outcomes: [
      "Execute various Nmap scans to map live hosts, identify open ports, and determine operating systems.",
      "Distinguish between and apply different port scanning techniques (e.g., stealth vs. full connect).",
      "Understand the goals of enumeration in finding user accounts and exposed shares."
    ]
  },
  {
    id: 5,
    title: "Phase 2/3: Enumeration II & Vulnerability Analysis",
    duration: "75 Minutes",
    subtopics: [
      { title: "Service Enumeration Techniques", time: "25 min", details: ["NetBIOS Enumeration (14:40)", "SNMP Enumeration (06:20)", "SMTP/FTP/RPC Enumeration"] },
      { title: "Vulnerability Concepts", time: "15 min", details: ["Vulnerability Research and Classification", "Vulnerability Assessment Life Cycle", "Exploit vs. Vulnerability vs. Risk"] },
      { title: "Automated Scanning Tools", time: "35 min", details: ["Nessus (Basic/Advanced Network Scan, Reporting, Remediations)", "OpenVAS/Greenbone (Target setup, Credentials, Scan Configs)"] }
    ],
    outcomes: [
      "Perform network service enumeration (SMB, SNMP) to extract system and user information.",
      "Analyze and categorize vulnerabilities using professional tools like Nessus.",
      "Understand how to configure and run specialized scans, including credentialed scans."
    ]
  },
  {
    id: 6,
    title: "Phase 3: System Hacking and Exploitation",
    duration: "70 Minutes",
    subtopics: [
      { title: "Password Cracking", time: "25 min", details: ["Password Cracking Concepts", "Attack Types (Brute-Force, Dictionary)", "Hash Dumping (Windows SAM, Shadow files)", "Tools (John the Ripper, Hashcat)"] },
      { title: "Exploitation Frameworks", time: "25 min", details: ["Metasploit Framework Architecture (Modules, Payloads, Auxiliaries)", "Basic Exploitation Demonstration"] },
      { title: "Custom Payload Generation", time: "20 min", details: ["Generating Payloads using MSF Venom", "Using Encoders for Antivirus Evasion"] }
    ],
    outcomes: [
      "Execute password attacks on compromised hashes using brute force and dictionary techniques.",
      "Utilize the Metasploit Framework to execute exploits and manage sessions.",
      "Generate custom payloads and apply encoding to bypass standard security defenses."
    ]
  },
  {
    id: 7,
    title: "Malware Threats and Steganography",
    duration: "60 Minutes",
    subtopics: [
      { title: "Malware Types", time: "20 min", details: ["Classification (Trojans, Viruses, Worms, Backdoors)", "APT, Fileless Malware, and Rootkits"] },
      { title: "Analysis and Defense", time: "20 min", details: ["Malware Analysis Procedure (Static vs. Dynamic Analysis)", "Anti-Malware Solutions"] },
      { title: "Ransomware and Mitigation", time: "10 min", details: ["Understanding Ransomware Attacks", "Mitigation Strategies (CEH v13 update)"] },
      { title: "Covert Hiding", time: "10 min", details: ["Steganography Concepts and Methods (Text, Image, LSB)"] }
    ],
    outcomes: [
      "Categorize and identify various types of malware, including modern fileless threats.",
      "Explain the basic steps involved in malware analysis (preparing a test bed).",
      "Implement steganography to hide data within files for covert communication."
    ]
  },
  {
    id: 8,
    title: "Sniffing, DoS, and Defense Evasion",
    duration: "60 Minutes",
    subtopics: [
      { title: "Sniffing and Capture", time: "25 min", details: ["Sniffing Concepts", "Protocols Vulnerable to Sniffing", "Using Wireshark (Interface, Display Filters, Protocol Decodes, Follow TCP Stream)"] },
      { title: "Denial-of-Service", time: "15 min", details: ["DoS/DDoS Concepts", "Attack Techniques (SYN Flood, Fragmentation Attack, Smurf Attack)"] },
      { title: "Defense Evasion", time: "20 min", details: ["Evading IDS, Firewalls, and Honeypots", "Evasion Techniques (Packet Fragmentation, HTTP Tunneling, Session Splicing)"] }
    ],
    outcomes: [
      "Analyze network traffic for security flaws and exposed data using Wireshark.",
      "Understand the principles of DoS/DDoS attacks and their impact on availability.",
      "Apply methods to bypass or avoid detection by common security devices like IDS and Firewalls."
    ]
  },
  {
    id: 9,
    title: "Social Engineering and Session Hijacking",
    duration: "65 Minutes",
    subtopics: [
      { title: "Social Engineering Concepts", time: "15 min", details: ["Phases of Attack", "Insider Threats/Attacks"] },
      { title: "Attack Techniques", time: "20 min", details: ["Human-based Social Engineering (Pretexting, Impersonation)", "Phishing and Spear Phishing", "Social Engineering Toolkit"] },
      { title: "Session Hijacking", time: "15 min", details: ["Network-level Session Hijacking", "Sequence Number Guessing"] },
      { title: "Countermeasures", time: "15 min", details: ["Detecting Phishing Emails", "Defense against Insider Threats", "Session Hijacking Prevention"] }
    ],
    outcomes: [
      "Understand the psychological principles and phases behind social engineering attacks.",
      "Identify and simulate various social engineering attacks, particularly phishing.",
      "Analyze and mitigate session-level attacks using sequence prediction and authentication controls."
    ]
  },
  {
    id: 10,
    title: "Web Application Hacking (Servers, Apps, and SQLi)",
    duration: "65 Minutes",
    subtopics: [
      { title: "Web Server Hacking", time: "15 min", details: ["Web Server Operations (IIS/Apache)", "Attacks (Banner Grabbing, Directory Traversal)"] },
      { title: "Web Application Security", time: "15 min", details: ["OWASP Top 10 Application Security Risks", "Introduction to Cross-Site Scripting (XSS)"] },
      { title: "SQL Injection Theory", time: "20 min", details: ["What is SQL Injection", "Types of SQLi (Union, Blind, Time-Based)", "Methodology and Tools (SQLmap, Burp Suite, ZAP)"] },
      { title: "SQLi Countermeasures", time: "15 min", details: ["Evasion Techniques (Evading IDS)", "Defensive Coding (Parameterized Queries, Input Validation)"] }
    ],
    outcomes: [
      "Identify web server weaknesses and application risks using frameworks like the OWASP Top 10.",
      "Execute fundamental web application attacks, including XSS and SQL injection.",
      "Develop strong countermeasures for SQL injection vulnerabilities."
    ]
  },
  {
    id: 11,
    title: "Specialized Targets: Wireless, Mobile, IoT, & Cloud",
    duration: "65 Minutes",
    subtopics: [
      { title: "Wireless Hacking", time: "15 min", details: ["Wireless Encryption (WEP, WPA/WPA2)", "Hacking Methodology and Tools (Aircrack-ng)"] },
      { title: "Mobile Hacking", time: "15 min", details: ["Mobile Platform Attack Vectors (Android/iOS Hacking)", "OWASP Top 10 Mobile Risks"] },
      { title: "IoT/OT Hacking", time: "20 min", details: ["IoT Architecture and Protocols", "OWASP Top 10 IoT Vulnerabilities", "OT (Operational Technology) Security"] },
      { title: "Cloud Computing", time: "15 min", details: ["Cloud Deployment Models (IaaS, PaaS, SaaS)", "Cloud Threats and Attacks", "Cloud Penetration Testing"] }
    ],
    outcomes: [
      "Evaluate the security of wireless networks and execute password cracking techniques.",
      "Identify risks in mobile, IoT, and OT environments.",
      "Understand the unique threats and pen testing considerations for cloud environments."
    ]
  },
  {
    id: 12,
    title: "Cryptography, AI, and Future Threats",
    duration: "75 Minutes",
    subtopics: [
      { title: "Cryptography Basics", time: "25 min", details: ["Symmetric Key (DES, AES) vs. Asymmetric Key (RSA)", "Cryptographic Hashing (MD5, SHA)", "PKI and Digital Signatures/Non-Repudiation"] },
      { title: "Advanced Hacking Topics", time: "25 min", details: ["AI/ML in Ethical Hacking (Vulnerability Scanning, Automating Tasks)", "Zero Trust Architecture (CEH v13)", "Quantum Computing Risks/Post-Quantum Cryptography"] },
      { title: "Post-Exploitation & Reporting", time: "25 min", details: ["Privilege Escalation", "Maintaining Access", "Clearing Tracks/Log Deletion", "Professional Report Writing (Executive Summary, Findings, Remediation/Mitigation)"] }
    ],
    outcomes: [
      "Explain core cryptographic concepts, algorithms, and Public Key Infrastructure (PKI).",
      "Analyze the role of AI and Machine Learning in enhancing security and offense strategies (CEH v13).",
      "Summarize essential post-exploitation techniques and create a comprehensive ethical hacking report."
    ]
  }
];

// Helper to stringify the course content for the AI System Instruction
export const SYSTEM_CONTEXT_STRING = COURSE_MODULES.map(m => `
Module ${m.id}: ${m.title}
Outcomes: ${m.outcomes.join('. ')}
Subtopics:
${m.subtopics.map(s => `- ${s.title} (${s.details?.join(', ')})`).join('\n')}
`).join('\n\n');
