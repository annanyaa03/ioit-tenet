export interface TechfiestaData {
  slug: string;
  title: string;
  link?: string;
  logo_img: string;
  manual?: string;
  description: string;
  contacts: { name: string; mobile: string }[];
  date: string;
  time: string;
  venue: string;
  registration_fees: string;
  structure: string[];
  faqs: { question: string; answer: string }[];
  rules: string[];
}

export const data: TechfiestaData[] = [
  {
    slug: 'capture_the_flag',
    title: 'Capture The Flag',
    logo_img: '/25/techfiesta/logo/ctf.png',
    link: 'https://unstop.com/competitions/capture-the-flag-tenet-aissms-institute-of-information-technology-pune-maharashtra-1557733',
    manual: 'https://drive.google.com/open?id=1-Uywi_vjZf3jYFCpPqDY-odON8R0FReS&usp=drive_copy',
    description: `Get ready to step into the world of hacking, puzzles, and problem-solving! We present to you, TENET CTF, a National Level cybersecurity competition, a Jeopardy style cybersecurity challenge where teams crack codes, uncover secrets, and race against time. From web exploits to cryptography, forensics, reverse engineering, and OSINT; every round tests your skills and strategy.`,
    contacts: [
      { name: 'Swaroop Patil', mobile: '+91 91720 61027' },
      { name: 'Nilay Bhandari', mobile: '+91 94204 22512' },
      { name: 'Krushi Soni', mobile: '+91 72494 53073' }
    ],
    date: 'Sunday, 12th October 2025',
    time: '9:00 AM to 6:00 PM',
    venue: 'AISSMS IOIT, Pune',
    registration_fees: '₹450 per team.',
    structure: [
      '09:00 AM – 10:00 AM: Registrations & Setup',
      '10:00 AM – 10:15 AM: Opening, Rules Briefing & Platform Walkthrough',
      '10:15 AM – 05:15 PM: Competition (Teams attempt challenges & submit flags)',
      '05:15 PM – 05:30 PM: Score Freeze & Verification',
      '05:30 PM – 06:00 PM: Closing Ceremony & Prize Distribution'
    ],
    faqs: [
      { question: 'Who can participate?', answer: 'The competition is open to all college students and cybersecurity enthusiasts.' },
      { question: 'What is the team size?', answer: 'Teams must consist of 1 to 4 members.' },
      { question: 'Are there any prerequisites?', answer: 'A basic understanding of cybersecurity concepts is recommended, but all skill levels are welcome.' }
    ],
    rules: [
      'Sharing flags or solutions between teams is strictly prohibited.',
      'Use of pre-solved write-ups, online solutions, or third-party help is not allowed.',
      'Any unethical behavior (DDoS attacks, interfering with infrastructure, brute-force attacks on the platform) leads to immediate disqualification.',
      'Participants must bring their own laptops and chargers.',
      'The organizers\' decisions are final and binding.'
    ]
  },
  {
    slug: 'drone_workshop',
    title: 'Drone Workshop',
    logo_img: '/25/techfiesta/logo/drone.png',
    link: 'https://unstop.com/workshops-webinars/drone-workshop-tenet-aissms-institute-of-information-technology-pune-maharashtra-1556047',
    manual: "https://drive.google.com/open?id=1Wjc6GLYiSuFg44Vq5uxuUBV82qnZD8LC&usp=drive_copy",
    description: `TENET '25 presents Drone Workshop, back after its grand success last year! This time, we’re bringing even more hands-on learning and fun as you explore the world of drones. Discover how drones are built, learn to control them, and experience the thrill of flying your own creation. Perfect for beginners and enthusiasts alike.`,
    contacts: [{ name: 'Krushi Soni', mobile: '+91 72494 53073' }, { name: 'Nilay Bhandari', mobile: '+91 94204 22512' }],
    date: 'Monday, 13th October 2025',
    time: '9:30 AM to 5:00 PM',
    venue: 'AISSMS IOIT, Pune',
    registration_fees: '₹550 per participant.',
    structure: [
      'Session 1: Introduction to Drone Technology and Aerodynamics.',
      'Session 2: Hands-on Assembly of a Quadcopter Kit.',
      'Session 3: Flight Controller Configuration and Calibration.',
      'Session 4: Supervised Flight Training and Practice.'
    ],
    faqs: [
      { question: 'Do I need to bring my own drone?', answer: 'No, all necessary components and drone kits will be provided for the workshop.' },
      { question: 'Is prior experience required?', answer: 'Not at all! This workshop is designed for beginners.' }
    ],
    rules: [
      'Participants must handle the provided equipment with care.',
      'Follow all instructions from the workshop coordinators for safety.',
      'Teamwork is encouraged, but each participant must complete their own assembly.'
    ]
  },
  {
    slug: 'robotics_workshop',
    title: 'Robotics Workshop',
    logo_img: '/25/techfiesta/logo/robotics-workshop.png',
    link: 'https://unstop.com/workshops-webinars/robotics-workshop-tenet-aissms-institute-of-information-technology-pune-maharashtra-1556956',
    manual: 'https://drive.google.com/open?id=1ecL3f2pQd4Zz_vFu38Mm96VmhOW0tR6c&usp=drive_copy',
    description: `The Robotics Workshop introduces participants to the basics of mechanical design, electronics, and hands-on assembly. Students will design a robot chassis in Fusion 360, learn motor control using H-bridge circuits and DPDT switches, and practice soldering connections to build a working prototype. Participants will build a Robo-Soccer Bot in this workshop, and a mini-competition will be held at the end.`,
    contacts: [{ name: 'Krushi Soni', mobile: '+91 72494 53073' }, { name: 'Nilay Bhandari', mobile: '+91 94204 22512' }],
    date: `Sunday, 12th & Monday, 13th October 2025`,
    time: '10:00 AM to 4:00 PM',
    venue: 'AISSMS IOIT, Pune',
    registration_fees: '₹2200 per team (up to 4 members).',
    structure: [
      'Day 1: Introduction to electronics, H-bridge theory, DPDT switches, and CAD design of the robot chassis using Fusion 360.',
      'Day 2: Physical assembly of the Robo-Soccer bot, soldering connections, and final testing.'
    ],
    faqs: [
      { question: 'Will we get to keep the robot?', answer: 'Yes, registered teams can take their bots home after the workshop. The kit will be provided to the team.' },
      { question: 'What should I bring?', answer: 'Please bring a laptop with Autodesk Fusion 360 (student version) pre-installed. A notebook and pen are also recommended.' }
    ],
    rules: [
      'Attendance for the entire workshop is mandatory to receive a certificate.',
      'Handle the provided robotics kit and workshop materials with care.',
      'Follow all safety protocols and instructions from the coordinators, especially during soldering.',
      'Lunch will not be provided.'
    ]
  },
  {
    slug: 'robo_race',
    title: 'Robo Race',
    logo_img: '/25/techfiesta/logo/robo-race.png',
    link: 'https://unstop.com/p/robo-race-tenet-aissms-institute-of-information-technology-pune-maharashtra-1556840',
    manual: 'https://drive.google.com/open?id=19uFjWJdbsGUNxu57cZXG3-k_j4ImmYnH&usp=drive_copy',
    description: `Race against time as your robot conquers a challenging track filled with twists, turns, and obstacles! The Robo Race tests your robot's speed, stability, and control. The fastest bot to complete the track with the fewest penalties claims the podium.`,
    contacts: [{ name: 'Krushi Soni', mobile: '+91 72494 53073' }, { name: 'Nilay Bhandari', mobile: '+91 94204 22512' }],
    date: 'Monday, 13th October 2025',
    time: '12:00 PM to 6:00 PM',
    venue: 'AISSMS IOIT, Pune',
    registration_fees: '₹149 per team (with bot) | ₹99 per team (without bot).',
    structure: [
      'Each team is allowed one practice run and one official timed run.',
      'The track may include curves, slopes, bridges, ramps, and rough surfaces.',
      'A bot that falls off the track must be restarted from the last successfully crossed checkpoint.',
      'The winner is determined by the fastest adjusted time after penalties.'
    ],
    faqs: [
      { question: 'What are the bot specifications?', answer: 'The bot must be within 30x30x30 cm and weigh a maximum of 5.0 kg. The power supply must be internal and not exceed 12V DC.' },
      { question: 'Can my bot be wireless?', answer: 'Yes, both wired and wireless bots are allowed.' },
      { question: 'What is the team size?', answer: 'Teams can consist of 1 or 2 members.' },
      { question: 'Do I need to bring my own bot?', answer: 'No, teams without a bot may participate using bots provided by the organizers.' }
    ],
    rules: [
      'Reporting to the venue at the given time is mandatory and may lead to disqualification.',
      'A 5-second penalty is added for touching the bot during a run.',
      'A 10-second penalty is added for skipping a checkpoint or restarting after a fall.',
      'The bot must be student-built; ready-made toy cars are not allowed.',
      'Malicious damage to the track or equipment will result in immediate disqualification.',
      'The decision of the judges is final.'
    ]
  },
  {
    slug: 'robo_soccer',
    title: 'Robo Soccer',
    logo_img: '/25/techfiesta/logo/robosoccer.png',
    manual: 'https://drive.google.com/open?id=1tZXN5-7Qn-6oGH30NoFDVvs24SdZ0LyP&usp=drive_copy',
    link: 'https://unstop.com/competitions/robo-soccer-tenet-aissms-institute-of-information-technology-pune-maharashtra-1557101',
    description: `Robo Soccer is a thrilling 1v1 robotics challenge where participants operate their bots to outscore opponents in a fast-paced soccer match. The game combines precision, strategy, and quick reflexes.`,
    contacts: [{ name: 'Krushi Soni', mobile: '+91 72494 53073' }, { name: 'Nilay Bhandari', mobile: '+91 94204 22512' }],
    date: 'Monday, 13th October 2025',
    time: '12:00 PM to 6:00 PM',
    venue: 'AISSMS IOIT, Pune',
    registration_fees: '₹149 per participant (with bot) | ₹99 per participant (without bot).',
    structure: [
      'The event follows a 1v1 knockout format.',
      'Each match consists of two halves of 3 minutes each.',
      'In case of a tie, a 1-minute golden goal round will be played.'
    ],
    faqs: [
      { question: 'What are the bot specifications?', answer: 'The bot must be within 30x30x30 cm, weigh a maximum of 5.0 kg, and use an internal power supply up to 12V DC. Please refer to the rulebook for detailed specifications.' },
      { question: 'Can I bring my own bot?', answer: 'Yes, participants may bring their own bot or use one provided by the organizers.' },
      { question: 'Is this a team or individual event?', answer: 'This is an individual (1v1) event.' }
    ],
    rules: [
      'Reporting to the venue at the given time is mandatory and may lead to disqualification.',
      'A match consists of two halves of 3 minutes each.',
      'Intentionally damaging the opponent\'s bot is forbidden and will result in penalties or disqualification.',
      'Grabbing, clamping, or holding the ball is strictly prohibited; only pushing or shooting mechanisms are allowed.',
      'The bot must be student-built. Ready-made RC cars are not permitted.'
    ]
  },
  {
    slug: 'bluff_n_bargain',
    title: 'Bluff & Bargain',
    logo_img: '/25/techfiesta/logo/bnb.png',
    link: 'https://unstop.com/competitions/bluff-and-bargain-tenet-aissms-institute-of-information-technology-pune-maharashtra-1558418',
    manual: 'https://drive.google.com/open?id=1psXm6x41qrJYHFmC2W1BkxbJG-nw2ayd&usp=drive_copy',
    description: `Bluff & Bargain is a negotiation-based competition that tests persuasion, strategic bluffing, and quick decision-making. As Harvey Specter said: “I don’t play the odds, I play the man.” Win not by chance, but by reading people, staying sharp, and outsmarting your opponents.`,
    contacts: [{ name: 'Krushi Soni', mobile: '+91 72494 53073' }, { name: 'Nilay Bhandari', mobile: '+91 94204 22512' }],
    date: 'Sunday, 12th October 2025',
    time: '10:00 AM to 4:00 PM',
    venue: 'AISSMS IOIT, Pune',
    registration_fees: '₹100 per team.',
    structure: [
      'Stage 1 (Online Quiz): A short quiz on business logic and negotiation awareness.',
      'Stage 2 (The Negotiations): Teams are assigned a company and must negotiate with an investor, using leverage and bluffing to secure a deal.',
      'Stage 3 (The Deal): Finalists analyze an unfavorable contract, find hidden loopholes, and renegotiate to win.'
    ],
    faqs: [
      { question: 'Is this a team or individual event?', answer: 'This is a team event. Participants must register in teams of 2.' },
      { question: 'What skills are being tested?', answer: 'Persuasion, strategic bluffing, quick decision-making, analytical skills, and negotiation tactics.' }
    ],
    rules: [
      'Participants must register in teams of 2 members.',
      'Use of mobile phones, internet, or any external help during the offline rounds is strictly prohibited.',
      'Any form of misconduct will lead to immediate disqualification.',
      'The judges\' decisions are final and binding.'
    ]
  },
  {
    slug: 'experience_zone',
    title: 'Experience Zone',
    logo_img: '/25/techfiesta/logo/experiencezone.png',
    link: '/register/experience_zone',
    description: 'Step into the Experience Zone – a space where innovation meets fun! Explore cutting-edge gadgets, interactive demos, and immersive tech showcases designed to spark curiosity and creativity. Featuring VR gaming, 3D printing, and interactive AI exhibits.',
    contacts: [{ name: 'Krushi Soni', mobile: '+91 72494 53073' }],
    date: 'Saturday, 11th to Monday, 13th October 2025',
    time: 'All Day (10:00 AM to 6:00 PM)',
    venue: 'AISSMS IOIT, Pune',
    registration_fees: 'Free entry for all TENET attendees.',
    structure: [
      'VR Arena: Immerse yourself in virtual reality games and experiences.',
      'Maker Space: See 3D printers and laser cutters in action.',
      'AI Showcase: Interact with innovative AI projects from our students and partners.'
    ],
    faqs: [
      { question: 'Do I need to book a slot for the VR games?', answer: 'Slots are available on a first-come, first-served basis.' },
      { question: 'Can I participate in the Experience Zone without a TENET pass?', answer: 'A general entry pass to TENET is required.' }
    ],
    rules: [
      'Please wait for your turn and respect the equipment.',
      'Follow the instructions of the volunteers at each station.',
      'Have fun and explore the future of technology!'
    ]
  }
];