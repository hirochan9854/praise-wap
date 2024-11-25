const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      ZenOldMincho: ['Zen Old Mincho', 'serif'],
      ZenKakuGothic: ['Zen Kaku Gothic New', 'sans-serif'],
      YujiBoku: ['Yuji Boku', 'serif'],
      KaiseiDecol: ['Kaisei Decol', 'serif'],
      RocknRollOne: ['RocknRoll One', 'sans-serif'],
      DotGothic: ['DotGothic16', 'serif'],
      Dela: ['Dela Gothic One', 'serif'],
      HachiMaruPop: ['Hachi Maru Pop', 'cursive'],
    },
    extend: {
      writingMode: {
        vertical: 'vertical-rl', // 縦書き
      },
      colors: {
        gray: '#E1E4E7',
      },
      fontSize: {
        '22px': '22px',
      },
      boxShadow: {
        box: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
      },
      width: {
        '69px': '69px',
        '286px': '286px',
      },
      height: {
        '69px': '69px',
        '621px': '621px',
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: (utilities: Record<string, Record<string, string>>) => void }) {
      const newUtilities = {
        '.vertical': {
          writingMode: 'vertical-rl',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

export default config;
