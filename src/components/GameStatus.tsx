import { useEffect, useRef, useState } from 'react';

import { Transcription } from '@/components/Transcription';

import { useSentimentAnalyzer } from '@/hooks/useSentimentAnalyzer';

import { GameResponse } from '../types';

interface GameStatusProps {
  remainingTurns: number;
  currentTurn: number;
  setResponse: React.Dispatch<React.SetStateAction<GameResponse>>;
}

export const GameStatus: React.FC<GameStatusProps> = ({ remainingTurns, currentTurn, setResponse }) => {
  const { analyzeSentiment, response } = useSentimentAnalyzer();
  const [sentences, setSentences] = useState<string[]>([]);
  const prevSentences = useRef<string>('');

  useEffect(() => {
    const processSentiment = async () => {
      if (!sentences[0] || sentences[0] === prevSentences.current) return;

      try {
        await analyzeSentiment(sentences[0]);
        prevSentences.current = sentences[0];

        if (response) {
          setResponse(response);
        }
      } catch (error) {
        console.error('Error analyzing sentiment:', error);
      }
    };

    void processSentiment();
  }, [sentences, analyzeSentiment, response, setResponse]);

  return (
    <div className="text-center">
      <p className="text-5xl">TURN</p>
      <p className="mt-4 text-4xl">{remainingTurns}/5</p>
      <p className="mt-8">{`プレイヤー${currentTurn}のターン`}</p>
      <Transcription onSentencesUpdate={setSentences} />
    </div>
  );
};
