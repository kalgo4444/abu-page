import React from 'react';

interface ErrorCardProps {
  eyebrow: string;
  title: string;
  description: string;
  action: React.ReactNode;
}

export const ErrorCard: React.FC<ErrorCardProps> = ({ eyebrow, title, description, action }) => {
  return (
    <main className="flex min-h-svh items-center justify-center bg-white px-6 text-center text-[#111111]">
      <div className="max-w-md space-y-5">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#707072]">{eyebrow}</p>
        <h1 className="font-display-campaign text-5xl font-black uppercase leading-none sm:text-6xl">{title}</h1>
        <p className="text-sm leading-relaxed text-[#4b4b4d]">{description}</p>
        {action}
      </div>
    </main>
  );
};
