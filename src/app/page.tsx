import SentimentAnalyzer from '@/components/SentimentAnalyzer';
import { Transcription } from '@/components/Transcription';

export default function Home() {
  return (
    <div>
      <Transcription />
      <SentimentAnalyzer />
    </div>
  );
}
