<template>
    <section class="bg-gray-900 py-16">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div class="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6">
                    <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                        Create and account
                    </h1>
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-white">Your
                            Name</label>
                        <input v-model="name" type="text" name="name" id="name"
                            class="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            placeholder="John Doe" required="true">
                    </div>
                    <div>
                        <label for="username" class="block mb-2 text-sm font-medium text-white">Username</label>
                        <input v-model="username" type="text" name="username" id="username" placeholder="myusername"
                            class="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            required="true">
                    </div>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-white">Your Email</label>
                        <input v-model="email" type="email" name="email" id="email" placeholder="email@gmail.com"
                            class="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            required="true">
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-white">Password</label>
                        <input v-model="password" type="password" name="password" id="password" placeholder="••••••••"
                            class="border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            required="true">
                    </div>
                    <button @click="registerUser()"
                        class="w-full text-dark bg-[#00FF00] hover:bg-primary-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-primary-700 focus:ring-primary-800">Create
                        an account</button>
                    <p class="text-sm font-light text-gray-400">
                        Already have an account? <nuxt-link to="/login"
                            class="font-medium hover:underline text-primary-500">Login here</nuxt-link>
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { mapWritableState } from 'pinia'
import { roomStore } from '~/store/index'
import axios from "axios";
const nuxtApp = useNuxtApp()

export default {
    data() {
        return {
            name: "",
            username: "",
            email: "",
            password: ""
        }
    },
    methods: {
        async registerUser() {
            let headersList = {
                "Content-Type": "application/json"
            }
            let bodyContent = JSON.stringify({
                "name": this.name,
                "email": this.email,
                "username": this.username
            });

            let reqOptions = {
                url: "https://api-generator.retool.com/nlaI9z/data",
                method: "POST",
                headers: headersList,
                data: bodyContent,
            }

            try {
                const { user } = await createUserWithEmailAndPassword(
                    nuxtApp.$auth,
                    this.email,
                    this.password
                )

                let response = await axios.request(reqOptions);
                console.log(response)

                // this.$router.push('/')
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message)
                }
            }
            this.roomDataState.name = this.name
            this.roomDataState.userName = this.username
            this.roomDataState.email = this.email
            localStorage.setItem("name", this.name);
            localStorage.setItem("username", this.username);
            localStorage.setItem("email", this.email);
            this.$router.push('/')
        }
    },
    computed: {
        ...mapWritableState(roomStore, ['roomDataState'])
    }
}
</script>
