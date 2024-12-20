'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';

import { Evaluation } from '@/components/Evaluation';

export default function Home() {
  return (
    <Suspense>
      <Result />
    </Suspense>
  );
}

const Result = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const text = searchParams.get('maxScoreWord');
  const maxMagnitudePlayer = Number(searchParams.get('maxMagnitudePlayer'));
  const maxScorePlayer = Number(searchParams.get('maxScorePlayer'));
  const maxScore = Number(searchParams.get('maxScore'));
  const higherTotal = Number(searchParams.get('higherTotal'));
  const higherTotalScore = Number(searchParams.get('higherTotalScore'));

  return (
    <div className="mx-auto flex w-full justify-center gap-40 py-20">
      <div className="w-[622px]">
        <h2 className="text-3xl">ゲーム結果</h2>
        <div className="mt-20 flex flex-col gap-10">
          <div className="animate-slide-in-bck-right" style={{ animationDelay: '0.6s' }}>
            <Evaluation acquirer={maxMagnitudePlayer} summary="感情の強さ" />
          </div>
          <div className="animate-slide-in-bck-right" style={{ animationDelay: '1.2s' }}>
            <Evaluation acquirer={maxScorePlayer} num={maxScore} summary="最高スコア:" />
          </div>
          <div className="animate-slide-in-bck-right" style={{ animationDelay: '1.8s' }}>
            <Evaluation acquirer={higherTotal} num={higherTotalScore} summary="合計スコア:" />
          </div>
        </div>
        <p className="mt-24 animate-slide-in-elliptic-right-fwd text-5xl " style={{ animationDelay: '3s' }}>
          {'プレイヤー２'}の勝ち！
        </p>
        <button
          className=" mt-9 block w-56 animate-slide-in-bck-right rounded  p-4  shadow-box disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => {
            if (text !== null) {
              router.push(`/edit?text=${encodeURIComponent(text)}`);
            }
          }}
          style={{ animationDelay: '3.6s' }}
        >
          次へ
        </button>
      </div>
      <div>
        <div className=" flex h-621px w-286px items-center justify-center whitespace-pre-wrap p-8 text-2xl shadow-box vertical">
          {text}
        </div>
      </div>
    </div>
  );
};
