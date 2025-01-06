export type GameResponse = {
  text: string;
  score: number;
  magnitude: number;
};

export type PlayerState = {
  response: GameResponse;
  total: number;
};

export type GameState = {
  maxScore: { value: number; player: number; word: string };

  maxMagnitude: { value: number; player: number };

  players: {
    1: PlayerState;

    2: PlayerState;
  };

  currentTurn: 1 | 2;

  remainingTurns: number;
};
