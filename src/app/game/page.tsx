'use client';

import { useState } from 'react';

import { GameFinishOverlay } from '@/components/GameFinishOverlay';
import { GameStatus } from '@/components/GameStatus';
import { Wordlist } from '@/components/WordList';

import { useGameState } from '@/hooks/useGameState';
import { GameResponse } from '@/types';

const INITIAL_RESPONSE: GameResponse = { text: '', score: 0, magnitude: 0 };

export default function Game() {
  const [response, setResponse] = useState<GameResponse>(INITIAL_RESPONSE);
  const { gameState, isGameFinished } = useGameState(response);
  const { players, currentTurn, remainingTurns } = gameState;

  return (
    <div>
      <div className="mx-auto flex max-w-[1200px] justify-center gap-32 pt-16">
        <Wordlist name="プレイヤー1" response={players[1].response} second={false} />
        <GameStatus currentTurn={currentTurn} remainingTurns={remainingTurns} setResponse={setResponse} />
        <Wordlist name="プレイヤー2" response={players[2].response} second={true} />
      </div>
      {isGameFinished && <GameFinishOverlay />}
    </div>
  );
}
