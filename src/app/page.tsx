'use client';

import React, { useState } from 'react';

import SentimentAnalyzer from '@/components/SentimentAnalyzer';
import { Transcription } from '@/components/Transcription';

export default function Home() {
  const [newSentence, setNewSentence] = useState<string>('');
  const handleSentencesUpdate = (sentences: string[]) => {
    console.log('sentences:', sentences);
    if (sentences[sentences.length - 1]) {
      setNewSentence(sentences[sentences.length - 1] || ''); // 配列の最後の文を取得して保存
    }
  };

  return (
    <div>
      {/* Transcriptionコンポーネントに文字列の更新を受け取るコールバックを渡す */}
      <Transcription onSentencesUpdate={handleSentencesUpdate} />
      {/* SentimentAnalyzerに新しい文を渡して解析 */}
      <SentimentAnalyzer sentence={newSentence} />
    </div>
  );
}
