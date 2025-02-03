const colors: string[][] = [
  ['#fa3131', '#fa5857', '#fa65c3', '#cb6ce6', '#8d52ff', '#5e17eb'],
  ['#2197b2', '#2cc0df', '#5ce2e6', '#38b6ff', '#5271ff', '#114aae'],
  ['#28bf63', '#7ed958', '#c1ff72', '#fdde5a', '#fcbd59', '#fb914e'],
  ['#000000', '#545454', '#737373', '#a6a6a6', '#ffffff'],
];

export type ColorPickerProps = {
  changeColor: (color: string) => void;
  toggle: () => void;
};

export const ColorPicker: React.FC<ColorPickerProps> = ({ changeColor, toggle }) => {
  return (
    <div>
      <div className="absolute z-10 -ml-5 -mt-5 grid grid-cols-6 gap-3 rounded-xl bg-white p-5 shadow-box">
        {colors.flat().map((color, index) => (
          <button
            className={`size-[69px] rounded-full ${color === '#ffffff' ? 'border border-[#a6a6a6]' : ''}`}
            key={index}
            onClick={() => {
              changeColor(color);
              toggle();
            }}
            style={{ backgroundColor: color }}
          ></button>
        ))}
        <div
          className="relative size-[69px] overflow-hidden rounded-full"
          style={{
            background: 'conic-gradient(#de4141, #e8ac51, #f2e55c, #39a869, #4784bf, #5d5099, #a55b9a, #de4141)',
          }}
        >
          <input
            className="absolute inset-0 size-full cursor-pointer opacity-0"
            onChange={(e) => changeColor(e.target.value)}
            type="color"
          />
        </div>
      </div>

      <div className="fixed left-0 top-0 h-screen w-screen bg-black opacity-10" onClick={toggle}></div>
    </div>
  );
};
