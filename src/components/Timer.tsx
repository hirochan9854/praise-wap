import React, { useState, useEffect } from 'react';

function Timer() {
  const [time, setTime] = useState(90);

  useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
    return () => {};
  }, [time]);

  return (
    <div className="text-center">
      <p className="text-xl">time</p>
      <p className="-mt-4 text-[64px]">{`${time < 10 ? `0${time}` : time}`}s</p>
    </div>
  );
}

export default Timer;
