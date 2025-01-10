import { useState } from 'react';

interface Sentiment {
  score: number;
  magnitude: number;
}

interface Sentence {
  text: {
    content: string;
  };
  sentiment: Sentiment;
}

interface AnalyzeSentimentResponse {
  sentences: Sentence[];
  documentSentiment: Sentiment;
}

type GameResponse = {
  text: string;
  score: number;
  magnitude: number;
};

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const useSentimentAnalyzer = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<GameResponse | null>(null);

  const analyzeSentiment = async (text: string): Promise<GameResponse | null> => {
    if (!text) {
      return null;
    }

    const url = `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${API_KEY}`;

    const requestBody = {
      document: {
        content: text,
        type: 'PLAIN_TEXT',
      },
      encodingType: 'UTF8',
    };

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        throw new Error('Failed to analyze sentiment');
      }

      const data: AnalyzeSentimentResponse = (await res.json()) as AnalyzeSentimentResponse;

      const gameResponse: GameResponse = {
        text: text,
        score: Math.round(
          data.documentSentiment.score * 10000 * data.documentSentiment.magnitude + (Math.random() * 2 - 1) * 1000,
        ),
        magnitude: data.documentSentiment.magnitude,
      };

      setResponse(gameResponse);
      return gameResponse;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('エラー:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };
  return { analyzeSentiment, response, error, loading };
};
