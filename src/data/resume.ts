export interface Experience {
  company: string;
  location: string;
  role: string;
  period: string;
  responsibilities: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Education {
  institution: string;
  location: string;
  degree: string;
  field: string;
  period: string;
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface ResumeData {
  name: string;
  title: string;
  links: {
    linkedin: string;
    github: string;
  };
  experiences: Experience[];
  skills: SkillCategory[];
  languages: Language[];
  education: Education;
}

export const resumeData: ResumeData = {
  name: 'Phisanurat W.',
  title: 'Software Engineer',
  links: {
    linkedin: 'https://linkedin.com/in/phisanurat-w-8288a61a7',
    github: 'https://github.com/Eclipse-Walker',
  },
  experiences: [
    {
      company: 'LSEG (London Stock Exchange Group)',
      location: 'Bangkok, Thailand',
      role: 'Software Engineer',
      period: 'May 2022 - Present',
      responsibilities: [
        'Developed Office Add-ins (Office.js) for Excel and PowerPoint (Microsoft 365) in collaboration with Microsoft (LSEG/Microsoft partnership)',
        'Developed and enhanced features for usage tracking systems',
        'Implemented and configured Webpack for efficient module bundling, developed features, and resolved issues related to internal libraries and dependencies',
        'Utilized GitLab CI/CD pipelines for continuous integration and deployment',
        'Employed Agile methodologies to manage project timelines, collaborate with cross-functional teams, and deliver high-quality software products',
        'Provided constructive feedback and collaborated with team members to enhance overall software performance and maintainability',
      ],
    },
    {
      company: 'Refinitiv, an LSEG business',
      location: 'Bangkok, Thailand',
      role: 'Software Engineer',
      period: 'Oct 2021 - Apr 2022',
      responsibilities: [
        'Developed and enhanced features and functionalities for Custom-Functions utilizing Office.js and Angular (TypeScript)',
        'Collaborated with cross-functional teams to design and develop scalable web applications',
        'Investigated customer-reported issues or those escalated by support, identified solutions, created tickets to track cases, and communicated the issues to the team',
        'Led code reviews and implemented CI/CD pipelines to ensure seamless delivery of high-quality code',
        'Resolved complex bugs and technical challenges, enhancing system stability and user satisfaction',
        'Conducted thorough code reviews to ensure code quality, adherence to best practices, and identify potential issues or areas for improvement',
      ],
    },
    {
      company: 'Lifestyle Technologies Co., Ltd.',
      location: 'Bangkok, Thailand',
      role: 'Mobile Application Developer',
      period: 'May 2020 - Aug 2021',
      responsibilities: [
        'Created an API (Flask) to connect to CCTV cameras',
        'Built a web with React that connects to an API (Flask) for streaming video via Real-Time Streaming Protocol (RTSP)',
        'Built applications with React Native as designed by UX/UI',
        'Integrated applications built with React-Native with APIs and databases and Micro services such as Strapi, Firebase, MongoDB, Fast API, etc.',
        'Developed an application that integrates with Native Modules to send commands via Bluetooth BLE connected to IoT devices to operate devices and send commands to unlock Smart Lock devices',
        'Developed an application to control home devices such as turning on lights, TVs, air conditioners through Zigbee Mini hub',
      ],
    },
    {
      company: 'Lifestyle Technologies Co., Ltd.',
      location: 'Bangkok, Thailand',
      role: 'Student Intern',
      period: 'Dec 2019 - Mar 2020',
      responsibilities: [
        'Developed a website with React.JS that connects to a Firebase database to check inventory and warranty tracking',
        'Created a Nearby service application, Navigation function using Google Map API. Developed a system to filter the types of places on Google Maps to display results such as hospitals, banks, restaurants, shopping malls, etc.',
        'Developed a weather forecasting system using the weather API from Open Weather Map',
      ],
    },
  ],
  skills: [
    {
      name: 'Programming Languages & Frameworks',
      skills: ['JavaScript', 'TypeScript', 'Node.js'],
    },
    {
      name: 'Office Development',
      skills: ['Office.js', 'Microsoft 365 Add-ins'],
    },
    {
      name: 'Agile Practices',
      skills: ['Scrum', 'Kanban', 'Scaled Agile Framework (SAFe)'],
    },
    {
      name: 'Tools & Platforms',
      skills: [
        'Visual Studio Code',
        'Git',
        'GitLab Pipeline',
        'Jira',
        'Confluence',
      ],
    },
    {
      name: 'Testing & Quality Assurance',
      skills: ['Jasmine', 'Jest', 'Vitest', 'SonarQube'],
    },
    {
      name: 'Additional Skills',
      skills: [
        'API Integration',
        'CI/CD Pipelines',
        'Dependency Scanning (Black Duck)',
      ],
    },
    {
      name: 'Currently Learning',
      skills: ['Dart', 'Flutter'],
    },
  ],
  languages: [
    { name: 'Thai', proficiency: 'Native' },
    { name: 'English', proficiency: 'Limited working proficiency' },
  ],
  education: {
    institution: 'Mahasarakham University',
    location: 'Mahasarakham, Thailand',
    degree: "Bachelor's degree",
    field: 'Computer Science',
    period: 'Aug 2016 - May 2020',
  },
};
