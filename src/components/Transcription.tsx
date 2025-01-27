'use client';

import React from 'react';
import '@/polyfills';
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
      <p className="mx-auto mt-16 h-9 w-64">{listening ? '聞き取り中' : 'スペースキーを押して話す'}</p>
      <p className=" text-xs">やり直す場合は一度離す</p>
      <div className="mt-4"></div>
    </div>
  );
};
