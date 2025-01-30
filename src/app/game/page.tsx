'use client';

import Link from 'next/link';
import { useState } from 'react';

import { GameFinishOverlay } from '@/components/GameFinishOverlay';
import { GameStatus } from '@/components/GameStatus';
import { Wordlist } from '@/components/WordList';

import { useAutoReset } from '@/hooks/useAutoReset';
import { useGameState } from '@/hooks/useGameState';
import { GameResponse } from '@/types';

const INITIAL_RESPONSE: GameResponse = { text: '', score: 0, magnitude: 0 };

export default function Game() {
  const [response, setResponse] = useState<GameResponse>(INITIAL_RESPONSE);
  const { gameState, isGameFinished } = useGameState(response);
  const { players, currentTurn, remainingTurns } = gameState;
  const [isAnalysisInProgress, setIsAnalysisInProgress] = useState(false);
  const isPlayer1Analysis = currentTurn === 1 && isAnalysisInProgress;
  const isPlayer2Analysis = currentTurn === 2 && isAnalysisInProgress;

  useAutoReset();
  return (
    <div>
      <Link className="fixed left-2 top-2 text-xs text-[#fa5857]" href={'/'}>
        ←タイトルに戻る
      </Link>
      <div className="mx-auto flex max-w-[1200px] justify-center gap-32 pt-16 ">
        <Wordlist
          isAnalysisInProgress={isPlayer1Analysis}
          name="プレイヤー1"
          response={players[1].response}
          second={false}
        />
        <GameStatus
          currentTurn={currentTurn}
          remainingTurns={remainingTurns}
          setIsAnalysisInProgress={setIsAnalysisInProgress}
          setResponse={setResponse}
        />
        <Wordlist
          isAnalysisInProgress={isPlayer2Analysis}
          name="プレイヤー2"
          response={players[2].response}
          second={true}
        />
      </div>
      {isGameFinished && !isAnalysisInProgress && <GameFinishOverlay />}
    </div>
  );
}
