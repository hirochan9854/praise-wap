import React, { useState, useEffect } from 'react';

export type WordProps = {
  serif: string;
  second: boolean;
};

export const Word: React.FC<WordProps> = ({ serif, second }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <div className={`opacity-0 ${isVisible ? 'animate-scale-in-bottom opacity-100' : ''}`}>
      <p
        className={`relative mb-14 w-96  rounded-3xl bg-[#fa5857]  px-[30px] py-3 text-left text-white transition
        before:absolute  before:-bottom-6  before:block before:h-7 before:w-12  before:bg-[url('/deco-blowing.svg')] before:bg-cover ${second ? 'before:right-2 before:-scale-x-100' : 'before:left-2'}`}
      >
        {serif}
      </p>
    </div>
  );
};
