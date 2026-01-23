/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app.vue",
    "./pages/*.vue",
    "./pages/**/*.vue",
    "./components/*.vue",
    "./utils/**/*.{vue,js}",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#04b0c0",
          50: "#EFEBE9",
          100: "#ddf4f9",
          200: "#9bcddb",
          300: "#A1887F",
          400: "#46cad7",
          500: "#795548",
          600: "#04b0c0",
          700: "#048abb",
          800: "#045db5",
          900: "#074e93",
        },
        success: {
          DEFAULT: "#14a44d",
        },
        info: {
          DEFAULT: "#62b8d4",
        },
        warning: {
          DEFAULT: "#e5a422",
        },
        danger: {
          DEFAULT: "#dc4c64",
        },
        shadow: {
          DEFAULT: "#2a2a2a",
        },
        navy: {
          DEFAULT: "#1D2250",
        }
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("tw-elements/dist/plugin.cjs"),
    require('@tailwindcss/line-clamp/src/index.js')
  ],
}

