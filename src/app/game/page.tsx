'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { Wordlist } from '@/components/WordList';

interface GameResponse {
  text: string;
  score: number;
  magnitude: number;
}

interface GameState {
  maxScore: {
    value: number;
    player: number;
    word: string;
  };
  maxMagnitude: {
    value: number;
    player: number;
  };
  players: {
    1: PlayerState;
    2: PlayerState;
  };
  currentTurn: number;
  remainingTurns: number;
}

interface PlayerState {
  response: GameResponse;
  total: number;
}

const INITIAL_RESPONSE: GameResponse = { text: '', score: 0, magnitude: 0 };

const useGameLogic = () => {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>({
    maxScore: { value: 0, player: 0, word: '' },
    maxMagnitude: { value: 0, player: 0 },
    players: {
      1: { response: INITIAL_RESPONSE, total: 0 },
      2: { response: INITIAL_RESPONSE, total: 0 },
    },
    currentTurn: 2,
    remainingTurns: 6,
  });

  const response = useMemo<GameResponse>(
    () => ({
      text: '',
      score: 0,
      magnitude: 0,
    }),
    [],
  );

  const handleNext = () => {
    const { players } = gameState;
    const higherTotal = players[1].total > players[2].total ? 1 : 2;
    const higherTotalScore = Math.max(players[1].total, players[2].total);

    void router.push(
      `/game-result?` +
        `higherTotalScore=${higherTotalScore}&` +
        `higherTotal=${higherTotal}&` +
        `maxScore=${gameState.maxScore.value}&` +
        `maxScorePlayer=${gameState.maxScore.player}&` +
        `maxScoreWord=${gameState.maxScore.word}&` +
        `maxMagnitudePlayer=${gameState.maxMagnitude.player}`,
    );
  };

  useEffect(() => {
    setGameState((prev) => {
      const currentPlayer = prev.currentTurn;
      const newState = {
        ...prev,
        maxScore:
          response.score > prev.maxScore.value
            ? { value: response.score, player: currentPlayer, word: response.text }
            : prev.maxScore,
        maxMagnitude:
          response.magnitude > prev.maxMagnitude.value
            ? { value: response.magnitude, player: currentPlayer }
            : prev.maxMagnitude,
        players: {
          ...prev.players,
          [currentPlayer]: {
            response,
            total: prev.players[currentPlayer as 1 | 2].total + response.score,
          },
        },
        currentTurn: currentPlayer === 1 ? 2 : 1,
        remainingTurns: currentPlayer === 2 ? prev.remainingTurns - 1 : prev.remainingTurns,
      };

      if (newState.remainingTurns === 0) {
        setTimeout(handleNext, 3000);
      }

      return newState;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return {
    gameState,
    isGameFinished: gameState.remainingTurns === 0,
  };
};

const GameStatus = ({ remainingTurns, currentTurn }: { remainingTurns: number; currentTurn: number }) => (
  <div className="text-center">
    <p className="text-5xl">TURN</p>
    <p className="mt-4 text-4xl">{remainingTurns}/5</p>
    <p className="mt-8">{currentTurn === 1 ? 'プレイヤー1' : 'プレイヤー2'}のターン</p>
  </div>
);

const GameFinishOverlay = () => (
  <div>
    <p className="fixed top-0 z-40 mt-96 h-screen w-screen animate-swirl-in-bck text-center text-9xl text-white">
      FINISH!!
    </p>
    <div className="fixed left-0 top-0 z-30 h-screen w-screen bg-black opacity-30" />
  </div>
);

export default function Game() {
  const { gameState, isGameFinished } = useGameLogic();
  const { players, currentTurn, remainingTurns } = gameState;

  return (
    <div>
      <div className="mx-auto flex max-w-[1200px] justify-center gap-32 pt-16">
        <Wordlist name="プレイヤー1" response={players[1].response} second={false} />

        <GameStatus currentTurn={currentTurn} remainingTurns={remainingTurns} />

        <Wordlist name="プレイヤー2" response={players[2].response} second={true} />
      </div>

      {isGameFinished && <GameFinishOverlay />}
    </div>
  );
}
