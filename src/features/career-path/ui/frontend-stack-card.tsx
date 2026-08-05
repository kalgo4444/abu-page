import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { Card } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';

export const FrontendStackCard: React.FC = () => {
  return (
    <Card className="p-4 sm:p-6 rounded-none bg-[#f5f5f5] border-[#cacacb]">
      <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-2">
        <div>
          <Badge variant="blue" icon={<Sparkles className="w-3.5 h-3.5" />} className="mb-2 text-[10px] font-bold uppercase">
            FRONT-END MUHANDISLIGI
          </Badge>
          <h3 className="mb-2 font-display-campaign text-xl font-extrabold uppercase text-[#111111] sm:text-2xl">
            ZAMONAVIY VEB INTERFEYSLAR
          </h3>
          <p className="mb-3 text-xs leading-relaxed text-[#39393b]">
            React, Next.js, TypeScript va Tailwind CSS yordamida yuqori unumdor, adaptiv veb-ilovalar yarataman.
          </p>
          <ul className="space-y-1.5">
            {[
              'Next.js App Router va Server Components',
              'TypeScript bilan ishonchli kod arxitekturasi',
              'Responsive UX va minimal dizayn tizimi',
              'REST API va backend servislar integratsiyasi',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-xs font-medium text-[#111111]">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#007d48]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-[#cacacb] bg-white p-4 font-mono text-[10px] text-[#111111]">
          <div className="mb-2 flex items-center justify-between border-b border-[#cacacb] pb-2 text-[#707072]">
            <span className="font-bold text-[#111111]">{'//'} FrontendStack.tsx</span>
            <span className="font-sans text-[10px] font-bold uppercase">REACT / NEXT</span>
          </div>
          <pre className="overflow-x-auto leading-relaxed text-[#39393b]">
{`export const DeveloperStack = () => {
  const stack = ["React", "Next.js", "TypeScript"];

  return <WebPortfolio
    engineer="Abdulaziz"
    status="Front-end Developer"
    stack={stack}
  />;
};`}
          </pre>
        </div>
      </div>
    </Card>
  );
};
