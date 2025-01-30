'use client';

import React from 'react';
import '@/polyfills';
import { FaMicrophone } from 'react-icons/fa';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
interface TranscriptionProps {
  onSentencesUpdate: (sentences: string[]) => void; // コールバックをプロパティとして受け取る
}

export const Transcription: React.FC<TranscriptionProps> = ({ onSentencesUpdate }) => {
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  const handleTranscriptUpdate = React.useCallback(() => {
    if (transcript.includes('です') || transcript.includes('ます')) {
      const newSentences = transcript
        .split(/です|ます/)
        .filter((sentence) => sentence.trim().length > 0)
        .map((sentence) => sentence.trim() + (transcript.includes('です') ? 'です' : 'ます'));

      onSentencesUpdate(newSentences);

      resetTranscript();
    }
  }, [transcript, onSentencesUpdate, resetTranscript]);

  React.useEffect(() => {
    handleTranscriptUpdate();
  }, [transcript, handleTranscriptUpdate]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        startListening();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        stopListening();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p className="mx-auto mt-16 h-9  text-xl">
        {listening ? (
          <div>
            <div className="flex items-center justify-center gap-2">
              <p>聞き取り中</p>
              <div aria-label="読み込み中" className="flex justify-center">
                <div className="size-1 animate-ping rounded-full bg-[#fa5857]"></div>
                <div className="mx-4 size-1 animate-ping rounded-full bg-[#fa5857]"></div>
                <div className="size-1 animate-ping rounded-full bg-[#fa5857]"></div>
              </div>
            </div>
            <span className="mt-2 text-sm">やり直す場合は一度離す</span>
          </div>
        ) : (
          <div className="flex  items-center justify-center gap-3 ">
            <p>スペースキーを押して話す</p>
            <FaMicrophone />
          </div>
        )}
      </p>

      <div className="mt-4"></div>
    </div>
  );
};
