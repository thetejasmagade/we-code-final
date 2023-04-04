import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics"

export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig()

    const firebaseConfig = {
        apiKey: "AIzaSyBdriE9XtJxpk5TRdqgjBV-fl5upqEUqBk",
        authDomain: "v-code-auth-c3c12.firebaseapp.com",
        projectId: "v-code-auth-c3c12",
        storageBucket: "v-code-auth-c3c12.appspot.com",
        messagingSenderId: "1094844007786",
        appId: "1:1094844007786:web:89e9bec58f01dc034b5113"
    };

    const app = initializeApp(firebaseConfig)

    const auth = getAuth(app)

    nuxtApp.vueApp.provide('auth', auth)
    nuxtApp.provide('auth', auth)

})