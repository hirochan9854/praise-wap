'use client';

import { getStorage, ref, deleteObject } from 'firebase/storage';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import QRCode from 'react-qr-code';

const Result = () => {
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get('imageUrl');

  if (!imageUrl) {
    return <p>画像がありません</p>;
  }
  const desertRef = ref(getStorage(), imageUrl);

  const deleateImage = () => {
    deleteObject(desertRef)
      .then(() => {})
      .catch((error) => {
        console.error('Error deleting file:', error);
      });
  };

  return (
    <div className="mx-auto flex w-full justify-center gap-40 pt-20">
      <div className="w-[622px]">
        <div className="mx-auto w-fit shadow-box">
          <Image alt="Uploaded Image" className="h-auto max-w-full" height={0} src={imageUrl} width={350} />
        </div>
      </div>
      <div className="mt-5 flex flex-col justify-between">
        <h2 className=" text-center text-3xl">スマホに保存</h2>
        <QRCode className="" value={imageUrl} />
        <button
          className="mx-auto  block w-56 rounded p-4 shadow-box disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => {
            deleateImage();
            window.location.href = '/';
          }}
        >
          終了
        </button>
      </div>
    </div>
  );
};

export default Result;
