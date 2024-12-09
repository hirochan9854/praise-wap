import React, { useEffect, useState, useCallback } from 'react';

import { useSentimentAnalyzer } from '@/hooks/useSentimentAnalyzer';

interface SentimentAnalyzerProps {
  sentence: string;
}

export const SentimentAnalyzer: React.FC<SentimentAnalyzerProps> = ({ sentence }) => {
  const { analyzeSentiment, response, error, loading } = useSentimentAnalyzer();
  const [previousSentence, setPreviousSentence] = useState<string | null>(null);

  const fetchSentiment = useCallback(
    async (sentence: string) => {
      if (sentence && sentence !== previousSentence) {
        setPreviousSentence(sentence);
        await analyzeSentiment(sentence);
      }
    },
    [previousSentence, analyzeSentiment],
  );

  useEffect(() => {
    if (sentence && sentence !== previousSentence) {
      fetchSentiment(sentence).catch((error) => {
        console.error('Error fetching sentiment data:', error);
      });
    }
  }, [sentence, previousSentence, fetchSentiment]);

  const totalScore = response?.documentSentiment
    ? 100 * response.documentSentiment.magnitude * response.documentSentiment.score
    : 0;

  return (
    <div>
      <p className="text-xl font-semibold">{loading ? '分析中...' : '語尾を「です」「ます」にして話してください'}</p>
      {error && <p style={{ color: 'red' }}>エラー: {error}</p>}
      {response && (
        <div>
          <h3>total</h3>
          <p>{totalScore}</p>
        </div>
      )}
    </div>
  );
};

export default SentimentAnalyzer;
