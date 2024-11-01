const colors: string[][] = [
  ['#000000', '#545454', '#737373', '#a6a6a6', '#d9d9d9', '#ffffff'],
  ['#fa3131', '#fa5857', '#fa65c3', '#cb6ce6', '#8d52ff', '#5e17eb'],
  ['#2197b2', '#2cc0df', '#5ce2e6', '#38b6ff', '#5271ff', '#114aae'],
  ['#28bf63', '#7ed958', '#c1ff72', '#fdde5a', '#fcbd59', '#fb914e'],
];

export type ColorPickerProps = {
  changeColor: (color: string) => void;
  toggle: () => void;
};

export const ColorPicker: React.FC<ColorPickerProps> = ({ changeColor, toggle }) => {
  return (
    <div className="z-10  -ml-5 -mt-5 flex flex-col gap-3 rounded-xl p-5 shadow-box">
      {colors.map((row, rowIndex) => {
        return (
          <div className="flex gap-3" key={rowIndex}>
            {row.map((color, colorIndex) => {
              return (
                <button
                  className="h-69px w-69px rounded-full  shadow-box"
                  key={colorIndex}
                  onClick={() => {
                    changeColor(color);
                    toggle();
                  }}
                  style={{ backgroundColor: color }}
                ></button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
