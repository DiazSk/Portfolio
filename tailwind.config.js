/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        shine: {
          '0%': { 'background-position': '100%' },
          '100%': { 'background-position': '-100%' },
        },
        glitch: {
          "0%": { "clip-path": "inset(20% 0 50% 0)" },
          "5%": { "clip-path": "inset(10% 0 60% 0)" },
          "10%": { "clip-path": "inset(70% 0 5% 0)" },
          "15%": { "clip-path": "inset(30% 0 40% 0)" },
          "20%": { "clip-path": "inset(80% 0 10% 0)" },
          "25%": { "clip-path": "inset(5% 0 85% 0)" },
          "30%": { "clip-path": "inset(50% 0 30% 0)" },
          "35%": { "clip-path": "inset(15% 0 70% 0)" },
          "40%": { "clip-path": "inset(60% 0 25% 0)" },
          "45%": { "clip-path": "inset(25% 0 60% 0)" },
          "50%": { "clip-path": "inset(45% 0 40% 0)" },
          "55%": { "clip-path": "inset(35% 0 50% 0)" },
          "60%": { "clip-path": "inset(65% 0 20% 0)" },
          "65%": { "clip-path": "inset(10% 0 75% 0)" },
          "70%": { "clip-path": "inset(55% 0 30% 0)" },
          "75%": { "clip-path": "inset(20% 0 65% 0)" },
          "80%": { "clip-path": "inset(75% 0 15% 0)" },
          "85%": { "clip-path": "inset(40% 0 45% 0)" },
          "90%": { "clip-path": "inset(5% 0 80% 0)" },
          "95%": { "clip-path": "inset(60% 0 25% 0)" },
          "100%": { "clip-path": "inset(30% 0 55% 0)" }
        },
        'glitch-before': {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" }
        },
        'glitch-after': {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(2px, -2px)" },
          "40%": { transform: "translate(2px, 2px)" },
          "60%": { transform: "translate(-2px, -2px)" },
          "80%": { transform: "translate(-2px, 2px)" },
          "100%": { transform: "translate(0)" }
        },
        ripple: {
          '0%': { width: '0px', height: '0px', opacity: '0.5' },
          '100%': { width: '500px', height: '500px', opacity: '0' }
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0)' },
          '50%': { opacity: '1', transform: 'scale(1)' }
        }
      },
      animation: {
        gradient: 'gradient 8s linear infinite',
        shine: 'shine 5s linear infinite',
        glitch: 'glitch 2s infinite',
        'glitch-before': 'glitch-before 3s infinite',
        'glitch-after': 'glitch-after 2s infinite',
        ripple: 'ripple 0.6s ease-out',
        sparkle: 'sparkle 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}