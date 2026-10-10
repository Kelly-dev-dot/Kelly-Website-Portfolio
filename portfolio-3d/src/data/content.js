// ============================================================
//  ALL YOUR PERSONAL CONTENT IS HERE. Only edit this file:
//  the rest of the site updates automatically.
// ============================================================

export const profile = {
  name: 'Ezra Valisoa',
  // Texts typed one after another in the hero ("And I'm a ...")
  roles: ['Application Developer', 'Computer Science Student', 'AI Enthusiast'],
  tagline:
    'Computer science student, I design web applications and AI tools. I am looking for an internship to put my skills into practice.',
  email: 'valisoaegrajo@gmail.com',
  phone: '+261 38 33 943 37',
  location: 'Fianarantsoa, Madagascar',
  github: 'https://github.com/Kelly-dev-dot/Kelly-dev-dot',
  linkedin: 'https://www.linkedin.com/',
};

export const about = {
  title: 'Application developer in training',
  paragraphs: [
    'I am a second-year Computer Science student at ENI, specializing in application development. I learn by building: web applications, databases, automation scripts and an AI project based on RAG.',
    'I love understanding why a program fails and figuring out how to fix it. I am looking for a 3-month internship to work in a team and grow on real projects.',
  ],
  facts: ['2nd Year Computer Science (L2) — ENI', 'Fianarantsoa, Madagascar', 'Looking for a 3-month internship'],
};

// icon: code | layout | phone  (see Icons.jsx)
export const services = [
  {
    icon: 'code',
    title: 'Application development',
    text: 'Web and software applications with Python, PHP, C#, JavaScript and Vue.js.',
  },
  {
    icon: 'layout',
    title: 'Databases',
    text: 'MySQL and PostgreSQL design and queries, connecting databases to applications.',
  },
  {
    icon: 'phone',
    title: 'AI & automation',
    text: 'RAG assistant in Python and scripts to automate data processing.',
  },
];

// level: 1 = Basics · 2 = Beginner · 3 = Intermediate · 4 = Advanced
// Keep the levels HONEST: a recruiter will ask you questions about them.
export const levels = { 1: 'Basics', 2: 'Beginner', 3: 'Intermediate', 4: 'Advanced' };

export const technicalSkills = [
  { name: 'Python', level: 3 },
  { name: 'PHP', level: 3 },
  { name: 'JavaScript', level: 3 },
  { name: 'MySQL', level: 3 },
  { name: 'HTML / CSS', level: 3 },
  { name: 'Vue.js', level: 2 },
];

// icon: team | chat | bolt | spark  (see Icons.jsx)
export const softSkills = [
  { name: 'Teamwork', icon: 'team' },
  { name: 'Communication', icon: 'chat' },
  { name: 'Problem solving', icon: 'bolt' },
  { name: 'Technical curiosity', icon: 'spark' },
];

// Customize with your real dates and experiences
export const experience = [
  {
    when: '2024 — present',
    title: 'Bachelor 2nd Year Computer Science — Application Development',
    place: 'ENI — National School of Computer Science',
    text: 'Programming, algorithms, databases, web development and networks.',
  },
  {
    when: 'Freelance',
    title: 'Data Entry & Web Research',
    place: 'Remote assignments',
    text: 'Data entry and cleaning, web research, automation with Excel, Google Sheets and Python.',
  },
  {
    when: 'Goal',
    title: 'Application development internship',
    place: '3 months',
    text: 'Put my knowledge into practice within a team, with a strong interest in AI.',
  },
];

// image: optional. Put your screenshot in public/projects/ then write '/projects/name.jpg'
export const projects = [
  {
    title: 'Defense scheduling management',
    text: 'An application that simplifies organizing and managing thesis defense schedules.',
    tags: ['Python', 'PHP', 'Vue.js', 'MySQL'],
    href: '#',
    image: '',
  },
  {
    title: 'Offline RAG assistant',
    text: 'A conversational assistant based on the RAG technique that works without an internet connection.',
    tags: ['Python', 'RAG', 'AI'],
    href: '#',
    image: '',
  },
  {
    title: '3D Portfolio',
    text: 'This site: React, Three.js and real-time physics, loaded on demand to stay fast.',
    tags: ['React', 'Three.js', 'Rapier'],
    href: '#',
    image: '',
  },
];

// Each technology becomes a 3D sphere in the Skills section
export const techStack = [
  { name: 'Python', color: '#3776ab' },
  { name: 'PHP', color: '#7a86b8' },
  { name: 'Java', color: '#e76f00' },
  { name: 'C#', color: '#68217a' },
  { name: 'JavaScript', color: '#c9a800' },
  { name: 'HTML', color: '#e34f26' },
  { name: 'CSS', color: '#1572b6' },
  { name: 'Vue.js', color: '#2f9e6e' },
  { name: 'MySQL', color: '#00758f' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'Django', color: '#0c4b33' },
  { name: '.NET', color: '#512bd4' },
  { name: 'Git', color: '#f05032' },
  { name: 'Excel', color: '#1d6f42' },
];
