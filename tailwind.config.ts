import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        merriweather: ['var(--font-merriweather)', 'serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "red-white-gradient": "linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))",
      },
      keyframes: {
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'slide-out-left': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' }
        }
      },
      animation: {
        'slide-in-right': 'slide-in-right 0.5s ease-out',
        'slide-out-left': 'slide-out-left 0.5s ease-out'
      },
      textGradient: {
        'red-white': ['from-red-600', 'to-white'],
      }
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: Function }) {
      const newUtilities = {
        '.text-gradient-red-white': {
          '@apply bg-gradient-to-r from-red-600 to-white bg-clip-text text-transparent': {}
        },
      }
      addUtilities(newUtilities)
    }
  ],
};
export default config;
