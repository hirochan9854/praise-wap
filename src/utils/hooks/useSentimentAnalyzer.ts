// useSentimentAnalyzer.tsx

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

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const useSentimentAnalyzer = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<AnalyzeSentimentResponse | null>(null);

  const analyzeSentiment = async (text: string): Promise<void> => {
    if (text != null && text != undefined) {
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
        setResponse(data);
        console.log('response:', data);
        console.log(
          'text:',
          data.sentences[0]?.text.content,
          'score:',
          data.documentSentiment.score,
          'magnitude:',
          data.documentSentiment.magnitude,
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('エラー:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return { analyzeSentiment, response, error, loading };
};
