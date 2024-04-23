import React from 'react';
const Loading = ({
  style = 'round-dots',
  color = 'primary',
}: {
  style?: 'dots' | 'spinner' | 'round-dots' | 'follower-dots';
  color?: 'primary' | 'white';
}) => {
  return (
    <div className="loader-wrapper ">
      <div className={`${style} ${color}`}></div>
    </div>
  );
};

export default Loading;
