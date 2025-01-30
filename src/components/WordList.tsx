'use client';

import { useEffect, useState } from 'react';
import { AiFillCaretLeft } from 'react-icons/ai';

import { Word } from './Word';

export type WordlistProps = {
  second: boolean;
  name: string;
  response: response;
  isAnalysisInProgress: boolean;
  currentTurn: boolean;
};

type response = {
  text: string;
  score: number;
  magnitude: number;
};

export const Wordlist: React.FC<WordlistProps> = ({ second, name, response, isAnalysisInProgress, currentTurn }) => {
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
    <div className="mt-6 w-[345px] text-center">
      <p className="flex items-center justify-center gap-2 text-2xl">
        {name}
        {currentTurn ? <AiFillCaretLeft fill="#fa5857" width={20} /> : ''}
      </p>
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
