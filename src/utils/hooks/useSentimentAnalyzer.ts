// useSentimentAnalyzer.tsx
import { useState } from 'react';

interface Sentiment {
  score: number;
  magnitude: number;
}

interface Sentence {
  text: {
    content: string;
    beginOffset: number;
  };
  sentiment: Sentiment;
}

interface AnalyzeSentimentResponse {
  documentSentiment: Sentiment;
  sentences: Sentence[];
}

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const useSentimentAnalyzer = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<AnalyzeSentimentResponse | null>(null);

  const analyzeSentiment = async (text: string): Promise<void> => {
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
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: AnalyzeSentimentResponse = (await res.json()) as AnalyzeSentimentResponse;
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('エラー:', err);
    } finally {
      setLoading(false);
    }
  };
  console.log(response);
  return { analyzeSentiment, response, error, loading };
};

export default useSentimentAnalyzer;
