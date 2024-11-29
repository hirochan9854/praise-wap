import React, { useState, useEffect } from 'react';

export type TimerProps = {
  setIsTimeUp: (value: boolean) => void;
};
export const Timer: React.FC<TimerProps> = ({ setIsTimeUp }) => {
  const [time, setTime] = useState(9000);

  useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      setIsTimeUp(true);
    }
    return;
  }, [time, setIsTimeUp]);

  return (
    <div className="text-center">
      <p className="text-xl">time</p>
      <p className="-mt-4 text-[64px]">{`${time < 10 ? `0${time}` : time}`}s</p>
    </div>
  );
};
