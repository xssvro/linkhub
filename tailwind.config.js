import scrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {},
      keyframes: {
        'slide-in': {
          '0%': { 
            transform: 'translateY(10px)',
            opacity: '0' 
          },
          '100%': { 
            transform: 'translateY(0)',
            opacity: '1' 
          },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.3s ease-out forwards',
      },
    },
  },
  darkMode: 'class',
  corePlugins: {
    preflight: false, // 禁用 Tailwind 的基础样式，防止与 Ant Design 冲突
  },
  plugins: [
    scrollbar,
  ],
} 