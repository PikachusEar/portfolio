// src/data/defaultData.js

export const DEFAULT_ABOUT = {
    title: "ABOUT ME",
    description: "I'm a creative developer who loves to build things that live on the internet. My passion lies in creating pixel-perfect, performant experiences.",
    secondaryDescription: "With expertise in both front-end and back-end technologies, I bring ideas to life from concept to deployment.",
    image: null,
    socialLinks: [
        { platform: "Github", url: "#", icon: "Github" },
        { platform: "LinkedIn", url: "#", icon: "Linkedin" },
        { platform: "Twitter", url: "#", icon: "Twitter" }
    ]
};

export const DEFAULT_EXPERIENCES = [
    {
        id: 1,
        title: "SENIOR FULL-STACK DEVELOPER",
        company: "Tech Company Inc.",
        period: "2022 - PRESENT",
        description: "Led development of enterprise applications, implemented CI/CD pipelines, and mentored junior developers.",
        technologies: ["React", "Node.js", "AWS", "Docker"]
    },
    {
        id: 2,
        title: "FULL-STACK DEVELOPER",
        company: "Digital Agency Ltd.",
        period: "2020 - 2022",
        description: "Built responsive web applications using React and Node.js, collaborated with design teams to create user-friendly interfaces.",
        technologies: ["React", "Node.js", "MongoDB", "Express"]
    },
    {
        id: 3,
        title: "FRONTEND DEVELOPER",
        company: "Startup Solutions",
        period: "2018 - 2020",
        description: "Developed interactive user interfaces, optimized performance, and implemented modern JavaScript frameworks.",
        technologies: ["JavaScript", "Vue.js", "CSS3", "Webpack"]
    }
];

export const DEFAULT_PROJECTS = [
    {
        id: 1,
        title: "E-COMMERCE PLATFORM",
        description: "A full-stack e-commerce solution with payment integration",
        image: null,
        techStack: ["React", "Node.js", "MongoDB", "Stripe"],
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
        order: 1
    },
    {
        id: 2,
        title: "TASK MANAGEMENT APP",
        description: "Real-time task management with team collaboration features",
        image: null,
        techStack: ["Vue.js", "Express", "Socket.io", "PostgreSQL"],
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
        order: 2
    },
    {
        id: 3,
        title: "WEATHER DASHBOARD",
        description: "Interactive weather dashboard with data visualization",
        image: null,
        techStack: ["React", "Chart.js", "OpenWeather API"],
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        order: 3
    }
];

export const DEFAULT_SKILLS = [
    {
        id: 1,
        category: "Frontend",
        skills: ["React", "Vue.js", "TypeScript", "Tailwind CSS"],
        order: 1
    },
    {
        id: 2,
        category: "Backend",
        skills: ["Node.js", "Python", "Express", "FastAPI"],
        order: 2
    },
    {
        id: 3,
        category: "Database",
        skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma"],
        order: 3
    },
    {
        id: 4,
        category: "DevOps",
        skills: ["Docker", "AWS", "CI/CD", "Kubernetes"],
        order: 4
    }
];

export const DEFAULT_BLOG_POSTS = [
    {
        id: 1,
        date: "MARCH 1, 2024",
        title: "Building Scalable Applications with Modern Stack",
        excerpt: "Exploring best practices and patterns for building applications that scale...",
        slug: "building-scalable-applications",
        featuredImage: null,
        publishedAt: "2024-03-01T00:00:00.000Z"
    },
    {
        id: 2,
        date: "FEBRUARY 15, 2024",
        title: "The Future of Web Development",
        excerpt: "Discussing emerging trends and technologies shaping the web development landscape...",
        slug: "future-of-web-development",
        featuredImage: null,
        publishedAt: "2024-02-15T00:00:00.000Z"
    },
    {
        id: 3,
        date: "JANUARY 28, 2024",
        title: "Optimizing React Performance",
        excerpt: "Tips and techniques for improving React application performance and user experience...",
        slug: "optimizing-react-performance",
        featuredImage: null,
        publishedAt: "2024-01-28T00:00:00.000Z"
    },
    {
        id: 4,
        date: "JANUARY 10, 2024",
        title: "CSS Grid vs Flexbox: When to Use What",
        excerpt: "A comprehensive guide to choosing the right layout method for your projects...",
        slug: "css-grid-vs-flexbox",
        featuredImage: null,
        publishedAt: "2024-01-10T00:00:00.000Z"
    }
];

export const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%236b7280'%3EImage Placeholder%3C/text%3E%3C/svg%3E";