// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        "~/static/css/global.css"
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/tailwindcss',
        'nuxt-monaco-editor',
        '@pinia/nuxt',
        // 'nuxt-vuefire',
    ],

    plugins: [
        // '~/plugins/editor.js'
    ],

    // vuefire: {
    //     // auth: true,
    //     config: {
    //         apiKey: "AIzaSyBdriE9XtJxpk5TRdqgjBV-fl5upqEUqBk",
    //         authDomain: "v-code-auth-c3c12.firebaseapp.com",
    //         projectId: "v-code-auth-c3c12",
    //         storageBucket: "v-code-auth-c3c12.appspot.com",
    //         messagingSenderId: "1094844007786",
    //         appId: "1:1094844007786:web:89e9bec58f01dc034b5113"
    //     },
    //   },
})
