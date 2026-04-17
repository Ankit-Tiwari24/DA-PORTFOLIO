/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#ffdb70',
          hover: '#ffd02b'
        },
        dark: {
          bg: '#111111',
          card: '#1e1e1f',
          border: '#383838',
          text: '#fafafa',
          muted: '#d6d6d6',
          mutedtext: '#a3a3a3'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
