/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 4s linear infinite',
        blink: 'blink 3s infinite',
        speaking: 'speaking 0.5s infinite alternate'
      },
      keyframes: {
        blink: {
          '0%, 90%': { opacity: '1' },
          '95%': { opacity: '0.1' },
          '100%': { opacity: '1' }
        },
        speaking: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' }
        }
      }
    }
  },
  plugins: []
};
