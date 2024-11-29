'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { Timer } from '@/components/Timer';
import { Wordlist } from '@/components/WordList';

export default function Home() {
  const router = useRouter();
  const [isTimeUp, setIsTimeUp] = useState(false);

  const handleTimeUp = () => {
    setIsTimeUp(true);
  };

  const [response] = useState({ text: '', score: 0, magnitude: 0 });

  useEffect(() => {
    const handleRouteChange = () => {
      if (isTimeUp) {
        router.push(`/edit?text=${encodeURIComponent(maxScoreWordRef.current)}`);
      }
    };
    void handleRouteChange();
  }, [isTimeUp, router]);

  const maxScoreRef = useRef(0);
  const maxScoreWordRef = useRef('');
  useEffect(() => {
    if (response.score > maxScoreRef.current) {
      maxScoreRef.current = response.score;
      maxScoreWordRef.current = response.text;
    }
  }, [response]);
  return (
    <div className="mx-auto flex max-w-[1200px] justify-center gap-32 pt-16">
      <Wordlist name="いとう" response={response} second={false} />
      <Timer setIsTimeUp={handleTimeUp} />
      <Wordlist name="いいだ" response={response} second={true} />
    </div>
  );
}
