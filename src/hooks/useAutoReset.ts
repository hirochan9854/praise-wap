import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useAutoReset = () => {
  const router = useRouter();
  useEffect(() => {
    const sec = 90;
    const events = ['keydown', 'mousemove', 'click', 'scroll'];
    let timeOutId: ReturnType<typeof setTimeout>;

    const reset = () => {
      router.push('/');
    };

    const setTimer = () => {
      timeOutId = setTimeout(reset, sec * 1000);
      console.log(timeOutId);
    };

    const resetTimer = () => {
      clearTimeout(timeOutId);
      setTimer();
    };

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    setTimer();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
