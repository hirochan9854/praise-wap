/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import React, { useState } from 'react';

import useSentimentAnalyzer from '@/utils/hooks/useSentimentAnalyzer';

const SentimentAnalyzer: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const { analyzeSentiment, response, error, loading } = useSentimentAnalyzer();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await analyzeSentiment(inputText);
  };

  const totalScore = response?.documentSentiment
    ? response.documentSentiment.score * 100 * ((response.documentSentiment.magnitude * 10) ^ 2)
    : 0;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          className="inline-block border"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="テキストを入力してください"
          rows={5}
          cols={40}
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? '分析中...' : '分析する'}
        </button>
      </form>

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
