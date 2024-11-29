'use client';

import React, { useState } from 'react';
import '@/polyfills';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface TranscriptionProps {
  onSentencesUpdate: (sentences: string[]) => void; // コールバックをプロパティとして受け取る
}

export const Transcription: React.FC<TranscriptionProps> = ({ onSentencesUpdate }) => {
  const { transcript, resetTranscript, listening } = useSpeechRecognition();
  const [sentences, setSentences] = useState<string[]>([]);

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

      setSentences((prevSentences) => [...prevSentences, ...newSentences]);
      onSentencesUpdate(newSentences);

      resetTranscript();
    }
  }, [transcript, onSentencesUpdate, resetTranscript]);

  React.useEffect(() => {
    handleTranscriptUpdate();
  }, [transcript, handleTranscriptUpdate]);

  return (
    <div>
      <p>{listening ? '音声認識on' : '音声認識off'}</p>
      <button className="mr-2 rounded bg-blue-500 px-4 py-2 text-white" onClick={startListening}>
        スタート
      </button>

      <button className="rounded bg-red-500 px-4 py-2 text-white" onClick={stopListening}>
        ストップ
      </button>

      <div className="mt-4">
        {sentences.map((sentence, index) => (
          <p className="whitespace-pre-wrap" key={index}>
            {sentence}
          </p>
        ))}
      </div>
    </div>
  );
};
