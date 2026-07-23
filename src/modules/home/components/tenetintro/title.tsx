import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { LOADTIME } from '@/config';

gsap.registerPlugin(ScrollTrigger);

export const TITLETEXT: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headline = new SplitType('h2.headline', { types: 'words' });
      const date = new SplitType('h2.date', { types: 'words' });

      gsap.fromTo(
        headline.words,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power4.out',
          delay: LOADTIME + 1,
          scrollTrigger: {
            trigger: '.headline',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      );

      gsap.fromTo(
        date.words,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 1.2,
          delay: LOADTIME + 2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.date',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className='absolute top-20 w-full text-center md:hidden'
    >
      <h2 className='headline text-lg font-bold text-white'>
        SECOND EDITION OF IOIT TENET
      </h2>
      <h2 className='date text-sm text-gray-200'>COMING SOON</h2>
    </div>
  );
};
