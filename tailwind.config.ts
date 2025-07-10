import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/assets/**/*/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        jakarta: 'var(--font-jakarta)',
        raleway: 'var(--font-raleway)',
      },
      colors: {
        primary: {
          main: '#088BC7',
          dark: '#005881',
          light: '#CDEFFF',
        },
        title: '#333333',
        desc: '#808080',
        warning: {
          main: '#F8D69B',
          dark: '#F8D69B',
          light: '#F4EAD8',
        },
        text: '#6B6B6B',
        success: {
          main: '#9EEAD0',
          dark: '#33AD7D',
          light: '#D7F2E9',
        },
        error: {
          main: '#FAC6C6',
          dark: '#EE5555',
          light: '#FFEAEA',
        },
        gold: '#F99D00',
      },
      padding: {
        mobile: 'calc(1rem + 2vw)',
        desktop: 'calc(1rem + 3vw)',
      },
      gap: {
        mobile: 'calc(1rem + 2vw)',
        desktop: 'calc(1rem + 3vw)',
      },
    },
    screens: {
      xs: '412px',
      sm: '640px',
      md: '840px',
      lg: '1024px',
      gx: '1240px',
      xl: '1440px',
      '2xl': '1600px',
    },
  },
  plugins: [],
};

export default config;
