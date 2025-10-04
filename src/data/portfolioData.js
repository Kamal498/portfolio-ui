// Personal Information
export const personalInfo = {
  name: 'Your Name',
  title: 'Full Stack Developer',
  bio: 'Passionate developer with expertise in building scalable web applications.',
  email: 'your.email@example.com',
  phone: '+1 (123) 456-7890',
  location: 'Your City, Country',
  avatar: 'https://via.placeholder.com/150',
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
    portfolio: 'https://yourwebsite.com',
  },
  resume: '/path/to/resume.pdf',
};

// Skills
export const skills = [
  {
    category: 'Frontend',
    items: ['React', 'JavaScript', 'HTML/CSS', 'TypeScript', 'Vue.js', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'Python', 'Django', 'REST APIs', 'GraphQL'],
  },
  {
    category: 'Database',
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase'],
  },
  {
    category: 'Tools & Others',
    items: ['Git', 'Docker', 'AWS', 'CI/CD', 'Jest', 'Webpack'],
  },
];

// Projects
export const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with payment integration, inventory management, and user authentication.',
    image: 'https://via.placeholder.com/400x300',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    github: 'https://github.com/yourusername/project1',
    demo: 'https://project1-demo.com',
    featured: true,
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Real-time collaborative task management application with drag-and-drop functionality.',
    image: 'https://via.placeholder.com/400x300',
    tags: ['React', 'Firebase', 'Material-UI'],
    github: 'https://github.com/yourusername/project2',
    demo: 'https://project2-demo.com',
    featured: true,
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'Beautiful weather dashboard with detailed forecasts and interactive maps.',
    image: 'https://via.placeholder.com/400x300',
    tags: ['React', 'OpenWeather API', 'Chart.js'],
    github: 'https://github.com/yourusername/project3',
    demo: 'https://project3-demo.com',
    featured: false,
  },
];

// Achievements
export const achievements = [
  {
    id: 1,
    title: 'Best Hackathon Project',
    organization: 'Tech Conference 2023',
    date: 'June 2023',
    description: 'Won first place for developing an AI-powered code review assistant.',
    icon: '🏆',
  },
  {
    id: 2,
    title: 'Open Source Contributor',
    organization: 'Various Projects',
    date: '2022 - Present',
    description: 'Active contributor to popular open-source projects with 500+ contributions.',
    icon: '💻',
  },
  {
    id: 3,
    title: 'Certified Solutions Architect',
    organization: 'AWS',
    date: 'March 2023',
    description: 'AWS Certified Solutions Architect - Associate certification.',
    icon: '📜',
  },
  {
    id: 4,
    title: 'Published Technical Writer',
    organization: 'Medium & Dev.to',
    date: '2021 - Present',
    description: 'Published 50+ technical articles with 100K+ views.',
    icon: '✍️',
  },
];

// Experience
export const experience = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'Tech Company Inc.',
    location: 'San Francisco, CA',
    duration: 'Jan 2022 - Present',
    description: [
      'Led development of microservices architecture serving 1M+ users',
      'Mentored junior developers and conducted code reviews',
      'Implemented CI/CD pipelines reducing deployment time by 60%',
    ],
  },
  {
    id: 2,
    title: 'Software Engineer',
    company: 'StartUp XYZ',
    location: 'Remote',
    duration: 'Jun 2020 - Dec 2021',
    description: [
      'Built RESTful APIs and integrated third-party services',
      'Developed responsive web applications using React',
      'Collaborated with cross-functional teams in Agile environment',
    ],
  },
];

// Education
export const education = [
  {
    id: 1,
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University Name',
    location: 'City, Country',
    duration: '2016 - 2020',
    gpa: '3.8/4.0',
  },
];
