'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

const ROUTES = [
  { href: '/', label: 'Bosh sahifa' },
  { href: '/about', label: 'Men haqimda' },
  { href: '/skills', label: 'Ko‘nikmalar' },
  { href: '/interests', label: 'Qiziqishlar' },
  { href: '/goals', label: 'Maqsadlar' },
  { href: '/contact', label: 'Bog‘lanish' },
] as const;

export const RoutePagination = () => {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const activeIndex = Math.max(
    ROUTES.findIndex((route) => route.href === pathname),
    0,
  );
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-[#1151ff]"
        style={{ scaleX: reducedMotion ? scrollYProgress : smoothProgress }}
      />

      <nav
        aria-label="Portfolio sahifalari"
        className="theme-chrome fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
      >
        <div className="border border-[#cacacb] bg-white/75 px-1.5 py-2 backdrop-blur-xl">
          <div
            aria-hidden="true"
            className="mb-1 border-b border-[#e5e5e5] pb-2 text-center font-mono text-[9px] font-semibold tracking-[0.14em] text-[#707072]"
          >
            {String(activeIndex + 1).padStart(2, '0')}/{String(ROUTES.length).padStart(2, '0')}
          </div>

          <ol className="flex flex-col items-center">
            {ROUTES.map((route, index) => {
              const isActive = index === activeIndex;

              return (
                <li key={route.href} className="relative">
                  <Link
                    href={route.href}
                    aria-current={isActive ? 'page' : undefined}
                    aria-label={`${String(index + 1).padStart(2, '0')}. ${route.label}`}
                    className="group relative flex h-11 w-11 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-inset"
                  >
                    <span className="pointer-events-none absolute right-full mr-2 whitespace-nowrap border border-[#cacacb] bg-white px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#111111] opacity-0 transition-[opacity,transform] duration-200 group-hover:-translate-x-1 group-hover:opacity-100 group-focus-visible:-translate-x-1 group-focus-visible:opacity-100">
                      {route.label}
                    </span>
                    <motion.span
                      aria-hidden="true"
                      className="route-page-block"
                      data-active={isActive}
                      animate={
                        reducedMotion
                          ? undefined
                          : {
                              rotateX: isActive ? -18 : 0,
                              rotateY: isActive ? 28 : 0,
                              scale: isActive ? 1.12 : 0.82,
                            }
                      }
                      transition={{ type: 'spring', stiffness: 360, damping: 24 }}
                    />
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
};
