'use client';

import Timer from '@/components/Timer';
import { Wordlist } from '@/components/WordList';

export default function Home() {
  return (
    <div className="mx-auto flex   max-w-[1200px] justify-between pt-16">
      <Wordlist name="いとう" second={false} />
      <Timer />
      <Wordlist name="いいだ" second={true} />
    </div>
  );
}
