export type SkillStatus = 'know' | 'use' | 'learning';

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  items: { name: string; status: SkillStatus }[];
}

export interface InterestItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'tech' | 'ai' | 'lifestyle';
}

export interface GoalItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  timeframe: string;
}

export const PROFILE_DATA = {
  name: "Abdulaziz",
  title: "Front-end dasturchi",
  education: {
    university: "O‘zbekistondagi xususiy universitet (IT Fakulteti)",
    direction: "Software Engineering (SW) yo‘nalishi",
    year: "3-kurs talabasi",
    description: "Universitetdagi ta’lim bilan birga dasturlashni mustaqil ravishda o‘rganib, amaliy loyihalar va ilg‘or AI texnologiyalari orqali tajribamni rivojlantirib boryapman."
  },
  bio: "Men — Abdulaziz, zamonaviy, tezkor va foydalanuvchi uchun qulay veb-ilovalar yaratishga ixtisoslashgan Front-end dasturchiman.",
  contacts: {
    github: "",
    telegram: "",
    linkedin: "",
    email: ""
  },
  skills: [
    {
      title: "Front-End Development",
      iconName: "Layout",
      description: "Zamonaviy, tez va adaptiv veb-interfeyslarni ishlab chiqish",
      items: [
        { name: "React.js", status: "use" },
        { name: "Next.js (App Router)", status: "use" },
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
      description: "Sun’iy intellekt agentlari va zamonaviy ishlab chiqish vositalari",
      items: [
        { name: "AI Agents & LLM Integration", status: "use" },
        { name: "OpenCode & Codex & MCP", status: "use" },
        { name: "Linux / VPS Serverlar", status: "use" },
        { name: "Git & GitHub Workflow", status: "know" },
        { name: "Lokal AI Modellar (Ollama/LMStudio)", status: "use" }
      ]
    }
  ] as SkillCategory[],

  interests: [
    {
      id: "web-mobile",
      title: "Veb-ilovalar",
      description: "Foydalanuvchilar uchun qulay, chiroyli va tez ishlaydigan veb-ilovalar yaratish",
      icon: "Globe",
      category: "tech"
    },
    {
      id: "ai-agents",
      title: "AI Agentlar & MCP",
      description: "Sun’iy intellekt vositalari (OpenCode, Codex, Model Context Protocol) bilan samaradorlikni oshirish",
      icon: "Bot",
      category: "ai"
    },
    {
      id: "vps-linux",
      title: "VPS & Linux Texnologiyalari",
      description: "Serverlar boshqaruvi va lokal AI modellar bilan ishlash muhitini sozlash",
      icon: "Server",
      category: "tech"
    },
    {
      id: "sport-health",
      title: "Sport & Sog‘lom Turmush Tarzi",
      description: "Muntazam jismoniy mashg‘ulotlar va aqliy tetiklikni saqlash",
      icon: "Activity",
      category: "lifestyle"
    }
  ] as InterestItem[],

  goals: [
    {
      id: "frontend-career",
      title: "Professional Front-end Dasturchi",
      subtitle: "React, Next.js va TypeScript",
      description: "Zamonaviy, tezkor va qulay foydalanuvchi tajribasiga ega veb-ilovalar yaratishda chuqur mutaxassis bo‘lish.",
      icon: "Code2",
      timeframe: "Asosiy Maqsad"
    },
    {
      id: "products",
      title: "Shaxsiy IT Mahsulotlar",
      subtitle: "Startaplar va Veb/Mobil ilovalar",
      description: "Foydalanuvchilarga haqiqiy qiymat beruvchi va muammolarni hal etuvchi shaxsiy loyihalarni ishlab chiqish hamda ishga tushirish.",
      icon: "Rocket",
      timeframe: "Rivojlanish"
    },
    {
      id: "global",
      title: "Xalqaro Kompaniyalar",
      subtitle: "Global Loyihalarda Tajriba",
      description: "Dunyo darajasidagi kuchli muhandislar jamoasida tajriba oshirish va xalqaro miqyosda ish olib borish.",
      icon: "Globe2",
      timeframe: "Karera"
    },
    {
      id: "freedom-travel",
      title: "Moliyaviy Erkinlik & Sayohat",
      subtitle: "Yangi Tajribalar va Bilim Ulashish",
      description: "Sayyoramiz bo‘ylab ko‘proq sayohat qilish, dunyoqarashni kengaytirish va toplangan bilimlarni boshqalar bilan ulashish.",
      icon: "Compass",
      timeframe: "Hayotiy"
    }
  ] as GoalItem[]
};
