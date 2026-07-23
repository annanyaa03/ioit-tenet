"use client";

import clsx from 'clsx';
import * as Scrollytelling from '@/lib/scrollytelling-client';
import { SlCalender } from 'react-icons/sl';
import s from './countdown.module.scss';
import { ShiftingCountdown } from './countdown';

export const EventCountdown = () => {
  return (
    <div className="pb-[80px] pt-[80px] md:pt-[150px]">
      <Scrollytelling.Root start="top bottom" end="bottom top" scrub={1.1}>
        <div className={s.container}>
          <ShiftingCountdown endDate={new Date('2025-10-11T08:00:00')} />
          <div className={s.marquees}>
            <Marquee className={s.marquee1} tenetblue />
            <Marquee className={s.marquee2} reverse />
            <Scrollytelling.Animation
              tween={[
                {
                  start: 0,
                  end: 100,
                  target: `.${s.marquee1} [data-marquee-animation-container]`,
                  to: { x: -1000, ease: 'linear' },
                },
                {
                  start: 0,
                  end: 100,
                  target: `.${s.marquee2} [data-marquee-animation-container]`,
                  to: { x: 1000, ease: 'linear' },
                },
              ]}
            />
          </div>
        </div>
      </Scrollytelling.Root>
    </div>
  );
};

const Marquee = ({
  reverse,
  tenetblue,
  className,
}: {
  reverse?: boolean;
  tenetblue?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={clsx(s.marqueeContainer, className)}
      style={{
        ['--marquee-color' as string]: tenetblue
          ? 'var(--color-tenetblue)'
          : 'var(--color-white)',
      }}
    >
      <div
        className={clsx(s.marqueeAnimationContainer, reverse && s.reverse)}
        data-marquee-animation-container
      >
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className={s.marqueeItem}>
            COMING SOON
            <SlCalender />
          </div>
        ))}
      </div>
    </div>
  );
};