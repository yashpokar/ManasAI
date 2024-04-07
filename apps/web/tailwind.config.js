import typography from '@tailwindcss/typography'
import form from '@tailwindcss/forms'
import headlessui from '@headlessui/tailwindcss'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['selector', '[data-mode="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        chat: ['Poppins', 'sans-serif'],
        display: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: [typography, form, headlessui({ prefix: 'ui' })]
}
