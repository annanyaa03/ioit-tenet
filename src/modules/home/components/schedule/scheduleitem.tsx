'use client';

import { FiMapPin, FiPhone } from 'react-icons/fi';
import type { EventType } from '@/types';
import { useIsMobile } from '@/hooks/useismobile';

export const ScheduleItem = ({ data }: { data: EventType }) => {
  const isMobile = useIsMobile();

  return (
    <div>
        <div className='mb-2 line-clamp-2 text-lg group-hover:text-white md:line-clamp-1 md:overflow-hidden md:truncate md:text-xl'>
          {data.title} <span className='hidden md:flex'>{data.time}</span>
        </div>
        <div className='flex items-start justify-between md:hidden'>
          <div className='flex flex-col gap-2 text-sm uppercase group-hover:text-white md:flex-row'>
            <div className='flex items-center gap-1.5'>
              <FiMapPin />
              <span>{data.location}</span>
            </div>
            <span className='hidden md:block'>{data.date}</span>
          </div>
          {!isMobile && (
            <div className='flex flex-col items-end gap-2 group-hover:text-white md:flex-row'>
              {data.organizers?.slice(0, 1).map((organizer, index) => (
                <div
                  key={index}
                  className='flex items-center gap-1.5 text-sm uppercase'
                >
                  <FiPhone />
                  <span>{organizer.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
    </div>
  );
};
