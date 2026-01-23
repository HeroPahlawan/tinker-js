require('dotenv').config();
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  runtimeConfig: {
    // value from env
    APP_NAME: process.env.APP_NAME,
    MONGODB_URI: process.env.MONGODB_URI,
    // server-side only
    var: 'values',
    // server-side + client-side
    public: {
<<<<<<< HEAD
      apiUrl: 'http://localhost:3001/',
      APP_NAME: process.env.APP_NAME,
=======
      apiUrl: 'https://inshopperapi.ias.id',
      //apiUrl: 'http://localhost:3001/',
>>>>>>> 2f1a13d40c318c734983f9a6b6598965e9d3e940
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
  modules: ['@pinia/nuxt', 'vue3-carousel-nuxt'],
  css: [`assets/css/main.css`],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})