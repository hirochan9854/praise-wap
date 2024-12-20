'use client';

import { useEffect, useState } from 'react';

import { Word } from './Word';

export type WordlistProps = {
  second: boolean;
  name: string;
  response: {
    text: string;
    score: number;
    magnitude: number;
  };
};

export const Wordlist: React.FC<WordlistProps> = ({ second, name, response }) => {
  const [score, setScore] = useState<number>(0);
  const [wordList] = useState<string[]>([]);

  useEffect(() => {
    if (response.text) {
      for (let i = 0; i < response.score; i++) {
        setTimeout(() => {
          setScore((prevScore) => prevScore + 1);
        }, 1000);
      }

      wordList.push(response.text);
    }
  }, [response.text, response.score, wordList]);

  return (
    <div className="mt-6 text-center">
      <p className="text-2xl">{name}</p>
      <p className="mt-14">score</p>
      <p className="mx-auto mb-20  w-64 text-[64px]">{score}</p>
      <div className="flex h-[500px] flex-col-reverse justify-end overflow-hidden ">
        <Word second={second} serif={'語尾に「です」か「ます」をつけてください'} />
        {wordList.map((serif, key) => {
          return <Word key={key} second={second} serif={serif} />;
        })}
      </div>
    </div>
  );
};
