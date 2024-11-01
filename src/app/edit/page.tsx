'use client';
import { useState } from 'react';

import { ColorPicker } from '@/components/ColorPicker';

export default function Home() {
  const [fontSize, setFontSize] = useState(30);

  const fontSmaller = () => {
    setFontSize(fontSize - 1);
  };

  const fontLarger = () => {
    setFontSize(fontSize + 1);
  };

  const [textColor, setTextColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');

  const changeTextColor = (color: string) => {
    setTextColor(color);
  };

  const changeBgColor = (color: string) => {
    setBgColor(color);
  };

  const [isTextColorPickerOpen, setIsTextColorPickerOpen] = useState(false);
  const toggleTextColorPicker = () => {
    setIsTextColorPickerOpen((prev) => !prev);
  };

  const [isBgColorPickerOpen, setIsBgColorPickerOpen] = useState(false);
  const toggleBgColorPicker = () => {
    setIsBgColorPickerOpen((prev) => !prev);
  };

  const [fontFamily, setFontFamily] = useState('RocknRollOne');

  const changeFontFamily = (value: string) => {
    console.log(value);
    setFontFamily(value);
  };

  const [text, setText] = useState('あなたの優しさは本当に\n人を元気にしてくれるよね。');

  const changeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="mx-auto flex w-full justify-center gap-40 pt-20">
      <div className="w-[622px]">
        <h2 className="text-3xl">セリフを編集</h2>
        <div className="mt-20 font-ZenKakuGothic">
          <div className="flex items-center">
            <p className="w-32 text-22px font-medium">サイズ</p>
            <div className="flex w-36 items-center justify-center gap-7 rounded-xl px-4 py-2 shadow-box">
              <button onClick={fontSmaller}>−</button>
              <p>{fontSize}</p>
              <button onClick={fontLarger}>+</button>
            </div>
          </div>
          <div className=" mt-10 flex ">
            <p className="mt-5 w-32 text-22px font-medium">文字色</p>

            {(isTextColorPickerOpen && (
              <ColorPicker changeColor={changeTextColor} toggle={toggleTextColorPicker} />
            )) || (
              <button
                className="h-69px w-69px rounded-full shadow-box"
                onClick={() => toggleTextColorPicker()}
                style={{ backgroundColor: textColor }}
              ></button>
            )}
          </div>
          <div className=" mt-10 flex ">
            <p className="mt-5 w-32  text-22px font-medium">背景色</p>
            {(isBgColorPickerOpen && <ColorPicker changeColor={changeBgColor} toggle={toggleBgColorPicker} />) || (
              <button
                className="h-69px w-69px rounded-full shadow-box"
                onClick={() => toggleBgColorPicker()}
                style={{ backgroundColor: bgColor }}
              ></button>
            )}
          </div>
          <div className="mt-10 flex items-center">
            <p className="w-32 text-22px font-medium">フォント</p>
            <div className="flex items-center gap-7  overflow-hidden rounded-xl  pr-2 shadow-box">
              <select
                className="h-10 w-48 py-2 pl-4 focus:outline-none"
                onChange={(e) => changeFontFamily(e.target.value)}
                style={{
                  fontFamily:
                    fontFamily === 'RocknRollOne'
                      ? "'RocknRoll One', sans-serif"
                      : fontFamily === 'YujiBoku'
                        ? "'Yuji Boku', serif"
                        : fontFamily === 'KaiseiDecol'
                          ? "'Kaisei Decol', serif"
                          : fontFamily === 'ZenOldMincho'
                            ? "'Zen Old Mincho', serif"
                            : fontFamily === 'DotGothic'
                              ? "'DotGothic16', serif"
                              : fontFamily === 'Dela'
                                ? "'Dela Gothic One', serif"
                                : fontFamily === 'HachiMaruPop'
                                  ? "'Hachi Maru Pop', cursive"
                                  : 'initial',
                }}
              >
                <option value="RocknRollOne">RocknRoll One</option>
                <option value="YujiBoku">Yuji Boku</option>
                <option value="KaiseiDecol">Kaisei Decol</option>
                <option value="ZenOldMincho">Zen Old Mincho</option>
                <option value="DotGothic">DotGothic16</option>
                <option value="Dela">Dela Gothic One</option>
                <option value="HachiMaruPop">Hachi Maru Pop</option>
              </select>
            </div>
          </div>
          <div className="mt-10 flex">
            <p className="mt-5 w-32 text-22px font-medium">テキスト</p>
            <textarea
              className=" h-40 w-96 resize-none appearance-none rounded-xl p-4 text-lg shadow-box focus:outline-none"
              onChange={changeText}
              value={text}
            ></textarea>
          </div>
        </div>
      </div>
      <div>
        <div
          className="flex h-621px w-286px items-center justify-center whitespace-pre-wrap shadow-box vertical"
          style={{
            backgroundColor: bgColor,
            color: textColor,
            fontSize: `${fontSize}px`,
            fontFamily:
              fontFamily === 'RocknRollOne'
                ? "'RocknRoll One', sans-serif"
                : fontFamily === 'YujiBoku'
                  ? "'Yuji Boku', serif"
                  : fontFamily === 'KaiseiDecol'
                    ? "'Kaisei Decol', serif"
                    : fontFamily === 'ZenOldMincho'
                      ? "'Zen Old Mincho', serif"
                      : fontFamily === 'DotGothic'
                        ? "'DotGothic16', serif"
                        : fontFamily === 'Dela'
                          ? "'Dela Gothic One', serif"
                          : fontFamily === 'HachiMaruPop'
                            ? "'Hachi Maru Pop', cursive"
                            : 'initial',
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}
