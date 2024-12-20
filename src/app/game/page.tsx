'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useMemo } from 'react';

import { Wordlist } from '@/components/WordList';

export default function Home() {
  const router = useRouter();
  const response = useMemo(() => ({ text: 'あなたいいよね。', score: 1000, magnitude: 0 }), []);

  const [player1res, setPlayer1res] = useState({ text: '', score: 0, magnitude: 0 });
  const [player2res, setPlayer2res] = useState({ text: '', score: 0, magnitude: 0 });

  const currentTurnRef = useRef<number>(5);

  const [currentTurn, setCurrentTurn] = useState(1);

  const maxScoreRef = useRef(0);
  const maxScoreWordRef = useRef('');
  useEffect(() => {
    if (response.score > maxScoreRef.current) {
      maxScoreRef.current = response.score;
      maxScoreWordRef.current = response.text;
    }
  }, [response]);

  const handleNext = () => {
    void router.push(`/game-result?text=${encodeURIComponent(maxScoreWordRef.current)}`);
  };
  useEffect(() => {
    if (currentTurn === 1) {
      setPlayer1res(response);
      setCurrentTurn(2);
    } else {
      setPlayer2res(response);
      setCurrentTurn(1);
      currentTurnRef.current--;
      if (currentTurnRef.current === 0) {
        setTimeout(() => {
          handleNext();
        }, 3000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <div>
      <div className="mx-auto flex max-w-[1200px] justify-center gap-32 pt-16">
        <Wordlist name="プレイヤー1" response={player1res} second={false} />
        <div className="text-center">
          <p className="text-5xl">TURN</p>
          <p className="mt-4 text-4xl ">{currentTurnRef.current}/5</p>
          <p className="mt-8">{currentTurn === 1 ? 'プレイヤー1' : 'プレイヤー2'}のターン</p>
        </div>
        <Wordlist name="プレイヤー2" response={player2res} second={true} />
      </div>
      {currentTurnRef.current === 0 && (
        <div>
          <p className="fixed  top-0  z-40 mt-96 h-screen w-screen animate-swirl-in-bck text-center text-9xl text-white">
            FINISH!!
          </p>
          <div className="fixed left-0 top-0 z-30 h-screen w-screen bg-black opacity-30"></div>
        </div>
      )}
    </div>
  );
}
