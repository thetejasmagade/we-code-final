<template>
    <div>
        <header class="bg-gray-900 sm:flex sm:justify-between sm:items-center sm:px-12 sm:py-3">
            <div class="flex items-center justify-between px-4 py-3 sm:p-0">
                <div>
                    <BaseLogo />
                </div>
                <div class="sm:hidden">
                    <button @click="isOpen = !isOpen" type="button"
                        class="block text-white hover:text-white focus:text-white focus:outline-none">
                        <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                            <path v-if="isOpen" fill-rule="evenodd"
                                d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                            <path v-if="!isOpen" fill-rule="evenodd"
                                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                        </svg>
                    </button>
                </div>
            </div>
            <nav :class="isOpen ? 'block' : 'hidden'" class="px-2 pt-2 pb-4 sm:flex sm:p-0">
                <button v-if="!roomDataState.room_id" @click="createRoom()" type="button"
                    class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-3 text-center">Create
                    Room</button>
                <p @click="disconnectRoom()" title="Connected" class="cursor-pointer px-3 text-white"
                    v-if="roomDataState.connectedWith">🟢{{ $route.params.id }}</p>
                <p class="px-3 text-white" v-if="roomDataState.isAdmin">🔖{{ roomDataState.room_id }}</p>
                <NuxtLink to="#"
                    class="mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-gray-600 sm:mt-0 sm:ml-2">Home
                </NuxtLink>
                <NuxtLink to="#"
                    class="mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-gray-600 sm:mt-0 sm:ml-2">
                    Community
                </NuxtLink>
                <NuxtLink to="#" class="block px-2 py-1 text-white font-semibold rounded hover:bg-gray-600">Register
                </NuxtLink>
                <NuxtLink to="#"
                    class="mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-gray-600 sm:mt-0 sm:ml-2">
                    About</NuxtLink>
                <NuxtLink to="#"
                    class="mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-gray-600 sm:mt-0 sm:ml-2">
                    Contact</NuxtLink>
                <NuxtLink to="#"
                    class="mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-gray-600 sm:mt-0 sm:ml-2">
                </NuxtLink>

                <BaseLanguage />

            </nav>
        </header>
        <div class="gradient-line"></div>

        <BaseToast v-if="isToastOpen">{{ toastData }}</BaseToast>
    </div>
</template>


<script>
import { io } from 'socket.io-client'
import { mapWritableState } from 'pinia'
import { roomStore } from '~/store/index'

definePageMeta({
    name: "java-room"
})


export default {
    name: 'NavbarComponent',
    data() {
        return {
            isOpen: false,
            isToastOpen: false,
            toastData: ``
        }
    },
    methods: {
        createRoom() {
            let url_id = (Math.random() + 1).toString(36).substring(2)
            let room_id = (Math.random() + 1).toString(36).substring(7)
            this.roomDataState.room_id = room_id
            this.roomDataState.isAdmin = true
            this.roomDataState.connectedWith = true

            let socket = io('http://localhost:4000/')

            socket.on('connect', () => {
                this.$router.push({
                    path: `/editors/java/${url_id}`, query: {admin: true}
                })
            })
            this.isToastOpen = true
            this.toastData = "Private Room Created"

        },
        disconnectRoom() {
            
            this.roomDataState.room_id = ``
            this.roomDataState.isAdmin = false
            this.roomDataState.connectedWith = false
            this.$router.push('/')
        }
    },
    computed: {
        ...mapWritableState(roomStore, ['roomDataState'])
    },
    mounted() {

    }
}
</script>

<style>
.gradient-line {
    height: 2px;
    background: rgb(148, 0, 211);
    background: -moz-linear-gradient(90deg, rgba(148, 0, 211, 1) 0%, rgba(75, 0, 130, 1) 17%, rgba(0, 0, 255, 1) 36%, rgba(0, 255, 0, 1) 54%, rgba(255, 255, 0, 1) 70%, rgba(255, 127, 0, 1) 84%, rgba(255, 0, 0, 1) 100%);
    background: -webkit-linear-gradient(90deg, rgba(148, 0, 211, 1) 0%, rgba(75, 0, 130, 1) 17%, rgba(0, 0, 255, 1) 36%, rgba(0, 255, 0, 1) 54%, rgba(255, 255, 0, 1) 70%, rgba(255, 127, 0, 1) 84%, rgba(255, 0, 0, 1) 100%);
    background: linear-gradient(90deg, rgba(148, 0, 211, 1) 0%, rgba(75, 0, 130, 1) 17%, rgba(0, 0, 255, 1) 36%, rgba(0, 255, 0, 1) 54%, rgba(255, 255, 0, 1) 70%, rgba(255, 127, 0, 1) 84%, rgba(255, 0, 0, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#9400d3", endColorstr="#ff0000", GradientType=1);
}
</style>