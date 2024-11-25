'use client';

import { useState } from 'react';

export type WordlistProps = {
  second: boolean;
  name: string;
};

export const Wordlist: React.FC<WordlistProps> = ({ second, name }) => {
  const [score, setScore] = useState(0);
  const [wordList, setWordList] = useState<string[]>([
    'あなたの優しさは本当に人を元気にしてくれるよね。',
    'あなたの優しさは本当に人を元気にしてくれるよね。',
    'あなたの優しさは本当に人を元気にしてくれるよね。',
    'あなたの優しさは本当に人を元気にしてくれるよね。',
    'あなたの優しさは本当に人を元気にしてくれるよね。',
    'あなたの優しさは本当に人を元気にしてくれるよね。',
  ]);

  return (
    <div className="mt-6 text-center">
      <p className="text-2xl">{name}</p>
      <p className="mt-14">score</p>
      <p className="mx-auto mb-20  w-64 text-[64px]">{score}</p>
      <div className="h-[500px] overflow-scroll">
        {wordList.map((serif, index) => {
          return <div key={index}>{word(serif, second)}</div>;
        })}
      </div>
    </div>
  );
};

const word = (serif: string, second: boolean) => {
  return (
    <div>
      <p
        className={`relative mb-14 w-96  rounded-3xl bg-[#FFF08D]  px-[30px] py-3 text-left
        before:absolute  before:-bottom-6  before:block before:h-7 before:w-12  before:bg-[url('/deco-blowing.svg')] before:bg-cover ${second ? 'before:right-2 before:-scale-x-100' : 'before:left-2'}`}
      >
        {serif}
      </p>
    </div>
  );
};
