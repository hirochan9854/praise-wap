'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function GameRules() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        router.push('/game');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="mx-auto max-w-2xl p-36">
      <div>
        <div className="mb-5 text-center text-2xl font-bold">遊び方</div>
      </div>
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="border-l-4 border-red-500 pl-4">
            <h2 className="mb-2 text-lg font-semibold">基本ルール</h2>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-red-500">●</span>
                ターン制（5ターン）
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-500">●</span>
                自分の番で相手を褒める言葉を言う
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-500">●</span>
                語尾は「です」か「ます」を使用
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-500">●</span>
                マイクを使用します
              </li>
            </ul>
          </div>

          <div className="border-l-4 border-yellow-500 pl-4">
            <h2 className="mb-2 text-lg font-semibold">勝敗</h2>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-yellow-500">★</span>
                <span>最高スコア</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-yellow-500">★</span>
                <span>合計スコア</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-yellow-500">★</span>
                <span>感情の強さ</span>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-blue-500 pl-4">
            <h2 className="mb-2 text-lg font-semibold">おまけ</h2>
            <div className="flex items-center gap-2">
              <span className="font-bold text-blue-500">◯</span>
              <span>最高スコアの褒め言葉を壁紙として保存可能</span>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-20 animate-fade-out text-center">スペースキーを押して開始</p>
    </div>
  );
}
