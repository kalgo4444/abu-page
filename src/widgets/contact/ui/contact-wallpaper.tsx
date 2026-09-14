'use client';

import React from 'react';
import { LiveWallpaper } from '@/shared/ui/live-wallpaper';

interface ContactWallpaperProps {
  scrollContainerRef: React.RefObject<HTMLElement | null>;
}

export const ContactWallpaper: React.FC<ContactWallpaperProps> = ({ scrollContainerRef }) => {
  return <LiveWallpaper scrollContainerRef={scrollContainerRef} tone="dark" />;
};
