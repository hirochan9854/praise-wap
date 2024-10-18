'use client';

import React from 'react';
import '@/polyfills';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const Transcription: React.FC = () => {
  const { transcript, resetTranscript, listening } = useSpeechRecognition();
  console.log(transcript);

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  const segmenter = new Intl.Segmenter('ja', { granularity: 'sentence' });
  const segments = segmenter.segment(transcript);
  console.table(Array.from(segments));

  return (
    <div>
      <p>{listening ? '音声認識on' : '音声認識off'}</p>
      <button onClick={startListening} className="mr-2 rounded bg-blue-500 px-4 py-2 text-white">
        スタート
      </button>

      <button onClick={stopListening} className="rounded bg-red-500 px-4 py-2 text-white">
        ストップ
      </button>

      <p className="mt-4 whitespace-pre-wrap">{}</p>
    </div>
  );
};
