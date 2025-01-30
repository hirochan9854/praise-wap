import React, { useState, useEffect } from 'react';

export type WordProps = {
  serif: string;
  score: number;
  second: boolean;
};

export const Word: React.FC<WordProps> = ({ serif, second, score }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <div className={` opacity-0 ${isVisible ? 'animate-scale-in-bottom opacity-100' : ''}`}>
      <span className={` block text-sm ${second ? 'text-left' : 'text-right'}`}>score:{score}</span>
      <p
        className={`relative mb-1  w-[345px] rounded-3xl bg-[#fa5857]  px-[30px] py-3 text-left text-white transition
        before:absolute  before:-bottom-6  before:block before:h-7 before:w-12  before:bg-[url('/deco-blowing.svg')] before:bg-cover ${second ? 'before:right-2 before:-scale-x-100' : 'before:left-2'}`}
      >
        {serif}
      </p>
    </div>
  );
};
