'use client';
import React from 'react';
import { Timeline as PrimeTimeline } from 'primereact/timeline';

import Image from 'next/image';
import ImageMaker from './ImageMaker';

interface TimelineEvent {
  status?: boolean;
  icon?: React.ReactNode;
  text?: string;
}

interface ITimeLineProps {
  events: Array<TimelineEvent>;
  layout?: 'horizontal' | 'vertical';
  align?: 'top' | 'left' | 'right' | 'bottom' | 'alternate';
  activeIndex: number;
  activeColor?: string;
  restColor?: string;
  mode?: 'cumulative' | 'single';
}

const TimeLine = (props: ITimeLineProps) => {
  const {
    events,
    layout = 'horizontal',
    align = 'top',
    activeColor,
    restColor,
    activeIndex,
    mode = 'cumulative',
  } = props;

  mode === 'cumulative'
    ? events.forEach((obj, index) => {
        obj.status = index <= activeIndex;
      })
    : events.find((x, index) => {
        const active = index === activeIndex;
        x.status = active;
      });

  const customizedMarker = (item: TimelineEvent) => {
    return (
      <div
        className={`${item.status ? `bg-${activeColor}` : `bg-${restColor}`} rounded-circle p-2 outline-icon-35 flex-center`}
      >
        {item.icon}
      </div>
    );
  };

  const customizedContent = (item: TimelineEvent) => {
    return (
      <small className={`text-nowrap ${item.status ? `text-${activeColor}` : `text-${restColor}`}`}>{item.text}</small>
    );
  };

  return (
    <PrimeTimeline
      value={events}
      className="customized-timeline"
      layout={layout}
      marker={customizedMarker}
      content={customizedContent}
      align={align}
    />
  );
};

export default TimeLine;
