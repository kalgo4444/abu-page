'use client';

import React from 'react';
import { LiveWallpaper } from '@/shared/ui/live-wallpaper';

interface GoalsWallpaperProps {
  scrollContainerRef: React.RefObject<HTMLElement | null>;
}

export const GoalsWallpaper: React.FC<GoalsWallpaperProps> = ({ scrollContainerRef }) => {
  return <LiveWallpaper scrollContainerRef={scrollContainerRef} tone="light" />;
};
