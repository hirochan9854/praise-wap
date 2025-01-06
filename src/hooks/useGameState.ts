import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { GameState, GameResponse } from '@/types';

const INITIAL_RESPONSE: GameResponse = { text: '', score: 0, magnitude: 0 };

const INITIAL_GAME_STATE: GameState = {
  maxScore: { value: 0, player: 0, word: '' },
  maxMagnitude: { value: 0, player: 0 },
  players: {
    1: { response: INITIAL_RESPONSE, total: 0 },
    2: { response: INITIAL_RESPONSE, total: 0 },
  },
  currentTurn: 2,
  remainingTurns: 6,
};

export const useGameState = (response: GameResponse) => {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);

  const handleGameEnd = () => {
    const { players, maxScore, maxMagnitude } = gameState;
    const higherTotal = players[1].total > players[2].total ? 1 : 2;
    const higherTotalScore = Math.max(players[1].total, players[2].total);

    const queryParams = new URLSearchParams({
      higherTotalScore: higherTotalScore.toString(),
      higherTotal: higherTotal.toString(),
      maxScore: maxScore.value.toString(),
      maxScorePlayer: maxScore.player.toString(),
      maxScoreWord: maxScore.word,
      maxMagnitudePlayer: maxMagnitude.player.toString(),
    });

    void router.push(`/game-result?${queryParams.toString()}`);
  };

  useEffect(() => {
    setGameState((prev: GameState) => {
      const currentPlayer = prev.currentTurn;
      const newTurn = currentPlayer === 1 ? 2 : 1;

      const newState: GameState = {
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
            total: prev.players[currentPlayer].total + response.score,
          },
        },
        currentTurn: newTurn,
        remainingTurns: currentPlayer === 2 ? prev.remainingTurns - 1 : prev.remainingTurns,
      };

      if (newState.remainingTurns === 0) {
        setTimeout(handleGameEnd, 3000);
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
