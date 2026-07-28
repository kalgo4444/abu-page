'use client';

import React from 'react';

interface SkillFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const SkillFilter: React.FC<SkillFilterProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onSelectCategory(cat)}
            aria-pressed={isActive}
            className={`min-h-11 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 ${
              isActive
                ? 'bg-[#111111] text-white border-[#111111]'
                : 'bg-white text-[#111111] border-[#cacacb] hover:border-[#111111]'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};
