"use client";

import { useEffect, useState } from "react";
import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const MotionNumberFlow = motion(NumberFlow);

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  endDate?: Date;
  className?: string;
}

export const ShiftingCountdown: React.FC<CountdownProps> = ({ className }) => {
  return (
    <section id="timeline" className="flex flex-col items-center justify-center">
      <div className={`relative inline-block w-full text-center py-8 md:py-14 ${className ?? ''}`}>
        {/* Main text layer */}
        <h1 className="text-center text-4xl md:text-9xl font-extrabold inline-block">
          COMING SOON
        </h1>
      </div>
    </section>
  );
};

export default ShiftingCountdown;
