import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: { DEFAULT: '1rem', md: '2rem' },
      },
      colors: {
        brand: {
          50: '#f5fbff',
          100: '#e6f4ff',
          200: '#cce9ff',
          300: '#99d3ff',
          400: '#66bdff',
          500: '#339fff',
          600: '#0d7ff5',
          700: '#0a64c4',
          800: '#084c94',
          900: '#073f79',
        },
      },
    },
  },
  plugins: [],
}
export default config
