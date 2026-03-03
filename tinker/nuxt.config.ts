require('dotenv').config();
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  ssr: false,
  devServer: { port: 3000 },
  runtimeConfig: {
    // server-side only
    MONGODB_URI: process.env.MONGODB_URI,
    var: 'values',
    // server-side + client-side (accessible via config.public.*)
    public: {
      APP_NAME: process.env.APP_NAME || 'Tinker',
      apiUrl: 'http://localhost:3001/',
    }
  },
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  //plugins: [
    // '~/plugins/vue-json-excel.js',
    // '~/plugins/filters.js',
    //{ src: 'plugins/vue-tags-input.js', ssr: false, mode: 'client' }
  //],
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['downloadexcel'].includes(tag),
    },
  },
  modules: ['@pinia/nuxt'],
  css: [`assets/css/main.css`],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
