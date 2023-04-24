<template>
    <BaseHero />

    <div class="px-24 bg-black grid grid-rows-4 grid-flow-col gap-4 pt-6 place-content-center">
        <div class="grid grid-cols-2 gap-10">
            <div v-for="(lang, i) in data" :key="i"
                class="flex flex-col items-center border rounded-lg shadow md:flex-row md:max-w-xl border-gray-700 bg-gray-900 hover:bg-gray-800">

                <img class="p-4 object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                    :src="lang.img" alt="">
                <div class="justify-between p-4 leading-normal">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ lang.name }}</h5>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ lang.description }}</p>
                    <NuxtLink :to="lang.link">
                        <button
                            class="bg-[#00ff00] hover:bg-blue-400 text-gray-700 font-bold py-2 px-4 rounded inline-flex items-center">
                            <span>Create Editor</span>
                        </button>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'

let data = reactive([
    {
        name: "Java",
        description: "DJava is a powerful, object-oriented programming language used for building a wide range of applications, from desktop and mobile apps to enterprise systems and web applications.",
        img: `https://api.iconify.design/logos:java.svg`,
        link: `/editors/java/`
    },
    {
        name: "Python",
        description: "Python is a high-level programming language known for its simplicity and versatility. Its popularity has grown significantly, making it one of the most widely used languages in the world.",
        img: `https://api.iconify.design/logos:python.svg`,
        link: `/editors/python/`
    },
    {
        name: "Golang",
        description: "Go, also known as Golang, is a modern programming language developed by Google. It is designed for building fast, reliable, and scalable software systems.",
        img: `https://api.iconify.design/skill-icons:golang.svg`,
        link: `/editors/golang/`
    },
    {
        name: "Javascript",
        description: "JavaScript is a versatile programming language that is commonly used for building interactive web pages and web applications.  It runs on both the client and server-side.",
        img: `https://api.iconify.design/logos:javascript.svg`,
        link: `/editors/javascript/`
    },
])
</script>