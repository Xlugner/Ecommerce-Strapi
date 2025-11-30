/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F2FF',
          100: '#CCE5FF',
          200: '#99CCFF',
          300: '#66B2FF',
          400: '#3399FF',
          500: '#0066CC',  // Color principal
          600: '#0052A3',
          700: '#003D7A',
          800: '#002952',
          900: '#001429',
        },
        turquoise: {
          50: '#E6F7FA',
          100: '#CCEFF5',
          200: '#99DFEB',
          300: '#66CFE1',
          400: '#33BFD7',
          500: '#5DBBCD',  // Turquesa del diseño
          600: '#4A96A4',
          700: '#38717B',
          800: '#254C52',
          900: '#132629',
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #5DBBCD 0%, #1E6BB8 100%)',
      },
    },
  },
  plugins: [],
}