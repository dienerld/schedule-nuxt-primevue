/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/app.vue',
    './app/modules/**/*.vue',
    './app/components/**/*.vue',
    './app/assets/presets/**/*.{js,vue,ts}'
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    extend: {
    }
  },
  plugins: [require('tailwindcss-primeui')]

}
