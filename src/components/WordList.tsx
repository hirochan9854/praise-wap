'use client';

import { useEffect, useState } from 'react';

import { Word } from './Word';

export type WordlistProps = {
  second: boolean;
  name: string;
  response: response;
  isAnalysisInProgress: boolean;
};

type response = {
  text: string;
  score: number;
  magnitude: number;
};

export const Wordlist: React.FC<WordlistProps> = ({ second, name, response, isAnalysisInProgress }) => {
  const [score, setScore] = useState<number>(0);
  const [wordList] = useState<response[]>([]);

  useEffect(() => {
    if (response.text) {
      if (response.score > 0)
        for (let i = 0; i < response.score; i++) {
          setTimeout(() => {
            setScore((prevScore) => prevScore + 1);
          }, 1000);
        }
      else if (response.score < 0) {
        for (let i = 0; i < response.score * -1; i++) {
          setTimeout(() => {
            setScore((prevScore) => prevScore - 1);
          }, 1000);
        }
      }

      wordList.push(response);
    }
  }, [response, wordList]);

  return (
    <div className="mt-6 text-center">
      <p className="text-2xl">{name}</p>
      <p className="mt-14">score</p>
      <p className="mx-auto mb-20  w-64 text-[64px]">{score}</p>
      <div className="flex h-[500px] flex-col-reverse justify-end overflow-hidden ">
        {wordList.map((res, key) => {
          return <Word key={key} score={res.score} second={second} serif={res.text} />;
        })}
        {isAnalysisInProgress && <p className="mb-14 text-2xl">解析中...</p>}
      </div>
    </div>
  );
};
