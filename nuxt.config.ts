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
    ],

    plugins: [
        // '~/plugins/editor.js'
    ],
})
