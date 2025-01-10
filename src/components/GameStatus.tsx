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
  const { analyzeSentiment } = useSentimentAnalyzer(); // responseは直接使用しないので削除
  const [sentences, setSentences] = useState<string[]>([]);
  const prevSentences = useRef<string>('');
  const prevResponse = useRef<GameResponse>({ text: '', score: 0, magnitude: 0 });

  useEffect(() => {
    const processSentiment = async () => {
      if (!sentences[0] || sentences[0] === prevSentences.current) return;

      try {
        const sentimentResult = await analyzeSentiment(sentences[0]); // 結果を直接受け取る
        prevSentences.current = sentences[0];
        if (sentimentResult !== null && sentimentResult.text !== prevResponse.current.text) {
          prevResponse.current = sentimentResult;
          setResponse(sentimentResult); // 解析結果を直接使用
          return;
        }
      } catch (error) {
        console.error('Error analyzing sentiment:', error);
      }
    };

    void processSentiment();
  }, [sentences, analyzeSentiment, setResponse]); // responseを依存配列から削除

  return (
    <div className="text-center">
      <p className="text-5xl">TURN</p>
      <p className="mt-4 text-4xl">{remainingTurns}/5</p>
      <p className="mt-8">{`プレイヤー${currentTurn}のターン`}</p>
      <Transcription onSentencesUpdate={setSentences} />
    </div>
  );
};
