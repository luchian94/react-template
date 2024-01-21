/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: 'var(--primary-dark-color)',
          DEFAULT: 'var(--primary-color)',
          light: 'var(--primary-light-color)',
        },
        accent: 'var(--accent-color)',
      },
    },
  },
  plugins: [],
};
