import { Config } from 'tailwindcss';

const config: Config = {
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
        vertical: 'vertical-rl',
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
      animation: {
        'scale-in-bottom': 'scale-in-bottom 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) forwards',
        'swirl-in-bck': 'swirl-in-bck 0.6s ease   both',
      },
      keyframes: {
        'scale-in-bottom': {
          '0%': {
            transform: 'scale(0)',
            'transform-origin': '50% 100%',
            opacity: '0',
          },
          '100%': {
            transform: 'scale(1)',
            'transform-origin': '50% 100%',
            opacity: '1',
          },
        },
        'swirl-in-bck': {
          '0%': {
            transform: 'rotate(540deg) scale(5)',
            opacity: '0',
          },
          to: {
            transform: 'rotate(0) scale(1)',
            opacity: '1',
          },
        },
      },
      transitionProperty: {
        opacity: 'opacity',
      },
      transitionDuration: {
        '300': '300ms',
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
