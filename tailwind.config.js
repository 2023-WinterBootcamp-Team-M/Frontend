/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'cliptab-blue': '#62a9ff',
        'cliptab-text': '#f0f6ff',
        'dark-bg': '#121319',
        'dark-component':'#1b1d25',
        'dark-btn':'#2e313d',
        'dark-text' : '#878c9e'
      },
      animation: {
        pop: 'pop 1s ease-in-out',
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)', opacity: '0' },
          '75%': { transform: 'scale(1.03)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        top: '0 -35px -15px -15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
