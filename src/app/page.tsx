'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Home() {
  // const [newSentence, setNewSentence] = useState<string>('');
  // const handleSentencesUpdate = (sentences: string[]) => {
  //   console.log('sentences:', sentences);
  //   if (sentences[sentences.length - 1]) {
  //     setNewSentence(sentences[sentences.length - 1] || ''); // 配列の最後の文を取得して保存
  //   }
  // };

  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        router.push('/rule');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {/* Transcriptionコンポーネントに文字列の更新を受け取るコールバックを渡す */}
      {/* <Transcription onSentencesUpdate={handleSentencesUpdate} /> */}
      {/* SentimentAnalyzerに新しい文を渡して解析 */}
      {/* <SentimentAnalyzer sentence={newSentence} /> */}

      <h1 className="text-7xl ">Prase Wap</h1>
      <p className="mt-20">スペースキーを押してスタート</p>
    </div>
  );
}
