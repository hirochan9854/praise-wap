import Image from 'next/image';

export type EvaluationProps = {
  acquirer: number;
  summary: string;
  num?: number;
};

export const Evaluation: React.FC<EvaluationProps> = ({ acquirer, summary, num }) => {
  return (
    <div>
      <div className="flex  items-center gap-36">
        <div className="flex w-80 items-center justify-between">
          <p className="text-2xl">
            {summary}
            {num ? num.toLocaleString() : null}
          </p>
          <Image alt="" height={65} src={'/icon-star.svg'} width={65} />
        </div>
        <p>{acquirer === 1 ? 'プレイヤー1' : 'プレイヤー2'}</p>
      </div>
    </div>
  );
};
