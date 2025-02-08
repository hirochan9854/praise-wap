'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { useAutoReset } from '@/hooks/useAutoReset';

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
  useAutoReset();
  return (
    <div className="mx-auto max-w-3xl p-36">
      <Link className="fixed left-2 top-2 text-xs text-[#fa5857]" href={'/'}>
        ←タイトルに戻る
      </Link>
      <div>
        <div className="mb-5 text-center text-2xl font-bold">遊び方</div>
      </div>
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="border-l-4 border-red-500 pl-4">
            <h2 className="mb-2 text-lg font-semibold">ルール</h2>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-red-500">●</span>
                ターン制（5ターン）
                <br />
                ※展示のため3ターン
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-500">●</span>
                自分の番で相手を褒める言葉を言う
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-500">●</span>
                必ず語尾は「です」か「ます」 で終わってください
                <br />
                例）「◯◯さんは素敵です」、「◯◯くんはかっこいいです」
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-500">●</span>
                MacBookに向かって話しかけてください
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
