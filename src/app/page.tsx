'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Home() {
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
      <h1 className="text-7xl ">褒めて！！</h1>
      <p className="mt-20">スペースキーを押してスタート</p>
    </div>
  );
}
