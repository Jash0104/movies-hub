/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      keyframes: {
        fall: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeOut: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-20px)', opacity: '0' },
        },
        wave: {
          '0%': { transform: 'translateX(-100%) rotate(50deg)' },
          '50%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%) rotate(120deg)' },
        },
      },
      animation: {
        fall: 'fall 0.3s ease-out forwards',
        fadeIn: 'fadeIn 0.3s ease-in-out',
        fadeOut: 'fadeOut 0.4s ease-in-out',
        skeleton: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        wave: 'wave 1.5s linear infinite',
      },
      backgroundImage: {
        "custom-gradient": 'linear-gradient(145deg, rgba(2,0,36,1) 45%, rgba(255,0,81,1) 100%)',
      }
    },
  },
  plugins: [],
}

