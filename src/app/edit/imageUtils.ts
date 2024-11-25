import { ref, uploadString } from 'firebase/storage';

export const saveImageToFirebase = async (storageRef: ReturnType<typeof ref>, dataUrl: string) => {
  try {
    await uploadString(storageRef, dataUrl, 'data_url');
    console.log('画像がFirebaseに保存されました');
  } catch (error) {
    console.error('画像の保存に失敗しました:', error);
  }
};

export const generateImage = async (
  htmlElement: HTMLElement,
  htmlToImage: { toPng: (element: HTMLElement) => Promise<string> },
) => {
  try {
    return await htmlToImage.toPng(htmlElement);
  } catch {
    throw new Error('画像の生成に失敗しました');
  }
};
