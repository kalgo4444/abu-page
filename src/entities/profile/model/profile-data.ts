export type SkillStatus = 'know' | 'use' | 'learning';

interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  items: { name: string; status: SkillStatus }[];
}

interface InterestItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'tech' | 'ai' | 'lifestyle';
}

interface GoalItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  timeframe: string;
}

export const PROFILE_DATA = {
  name: "Abdulaziz",
  title: "Software Engineer",
  education: {
    university: "Private university in Uzbekistan (IT Faculty)",
    direction: "Software Engineering (SW)",
    year: "3rd-year student",
    description: "Along with my university classes, I learn to code on my own and grow my skills through real projects and new AI tools."
  },
  bio: "I'm Abdulaziz, a Software Engineer. I build fast, simple, and user-friendly web and mobile apps.",
  contacts: {
    github: "",
    telegram: "",
    linkedin: "",
    email: ""
  },
  skills: [
    {
      title: "Software Engineering",
      iconName: "Layout",
      description: "Build fast and responsive web and mobile UI",
      items: [
        { name: "React.js", status: "use" },
        { name: "Next.js (App Router)", status: "use" },
        { name: "React Native (Expo)", status: "use" },
        { name: "TypeScript", status: "use" },
        { name: "JavaScript (ES6+)", status: "know" },
        { name: "HTML5 / CSS3 / Vanilla CSS", status: "know" },
        { name: "Tailwind CSS", status: "use" },
        { name: "REST API Integration", status: "use" }
      ]
    },
    {
      title: "AI Tools & Dev Ecosystem",
      iconName: "Cpu",
      description: "AI agents and modern dev tools",
      items: [
        { name: "AI Agents & LLM Integration", status: "use" },
        { name: "OpenCode & Codex & MCP", status: "use" },
        { name: "Linux / VPS Servers", status: "use" },
        { name: "Git & GitHub Workflow", status: "know" },
        { name: "Local AI Models (Ollama/LMStudio)", status: "use" }
      ]
    }
  ] as SkillCategory[],

  interests: [
    {
      id: "web-mobile",
      title: "Web & Mobile Apps",
      description: "Build fast, clean, and user-friendly web and mobile apps with React Native / Expo",
      icon: "Globe",
      category: "tech"
    },
    {
      id: "ai-agents",
      title: "AI Agents & MCP",
      description: "Work faster with AI dev tools (OpenCode, Codex, Model Context Protocol)",
      icon: "Bot",
      category: "ai"
    },
    {
      id: "vps-linux",
      title: "VPS & Linux",
      description: "Manage servers and set up local AI model dev environments",
      icon: "Server",
      category: "tech"
    },
    {
      id: "sport-health",
      title: "Sport & Healthy Life",
      description: "Regular workouts and a fresh mind",
      icon: "Activity",
      category: "lifestyle"
    }
  ] as InterestItem[],

  goals: [
    {
      id: "software-career",
      title: "Professional Software Engineer",
      subtitle: "React, Next.js, React Native and TypeScript",
      description: "Become a strong dev who builds fast web and mobile apps with great UX.",
      icon: "Code2",
      timeframe: "Main Goal"
    },
    {
      id: "products",
      title: "My Own IT Products",
      subtitle: "Startups & Web/Mobile Apps",
      description: "Build and launch my own apps that solve real user problems.",
      icon: "Rocket",
      timeframe: "Growth"
    },
    {
      id: "global",
      title: "Global Companies",
      subtitle: "Work on Global Projects",
      description: "Grow with a strong dev team and work at a global scale.",
      icon: "Globe2",
      timeframe: "Career"
    },
    {
      id: "freedom-travel",
      title: "Freedom & Travel",
      subtitle: "New Places & Shared Knowledge",
      description: "Travel more, learn more, and share what I learn with others.",
      icon: "Compass",
      timeframe: "Life"
    }
  ] as GoalItem[]
};
