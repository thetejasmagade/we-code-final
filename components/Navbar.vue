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
                <button v-if="!roomDataState.room_id && roomDataState.name" @click="createRoom()" type="button"
                    class="text-white bg-gradient-to-br py-2 from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-3 text-center">Create
                    Room</button>

                <a v-if="roomDataState.isAdmin" :href="'/connection?room_id=' + $route.params.id" target="_blank"
                    class="text-white py-1">GO TO</a>
                <p @click="disconnectRoom()" title="Connected" class="cursor-pointer px-3 text-white py-1"
                    v-if="roomDataState.connectedWith">🟢{{ $route.params.id }}</p>
                <p class="px-3 text-white py-1" v-if="roomDataState.isAdmin">🔖{{ roomDataState.room_id }}</p>

                <BaseRoomUsersModal :data="roomUsers" v-if="($route.name).includes('-id')" />

                <button v-if="($route.name).includes('-id')" @:click="disconnectRoom()" type="button"
                    class="text-white bg-transparent from-red-600 to-orange-500 bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-3 text-center mr-5 py-2">Exit
                    Room</button>

                <NuxtLink v-if="!($route.name).includes('-id')" to="/"
                    class="mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-gray-600 sm:mt-0 sm:ml-2">Home
                </NuxtLink>
                <NuxtLink v-if="!($route.name).includes('-id')" to="#"
                    class="mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-gray-600 sm:mt-0 sm:ml-2">
                    Community
                </NuxtLink>
                <NuxtLink v-if="!($route.name).includes('-id')" to="#"
                    class="mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-gray-600 sm:mt-0 sm:ml-2">
                    About</NuxtLink>
                <NuxtLink v-if="!($route.name).includes('-id')" to="#"
                    class="mt-1 block px-2 py-1 mr-2 text-white font-semibold rounded hover:bg-gray-600 sm:mt-0 sm:ml-2">
                    Contact</NuxtLink>
                <!-- <BaseLanguage /> -->

                <BaseProfileImg v-if="roomDataState.name" :name="roomDataState.name" />
                <NuxtLink to="/login" v-else>
                    <button type="button"
                        class="text-white bg-transparent from-green-600 to-blue-500 bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-3 text-center mr-5 py-2">Login/Signup</button>
                </NuxtLink>

            </nav>
        </header>
        <div class="gradient-line"></div>

        <!-- <BaseToast v-if="isToastOpen">{{ toastData }}</BaseToast> -->
    </div>
</template>


<script>
import { io } from 'socket.io-client'
import { mapWritableState } from 'pinia'
import { roomStore } from '~/store/index'


export default {
    name: 'NavbarComponent',
    data() {
        return {
            isOpen: false,
            isToastOpen: false,
            toastData: ``,
            name: 'Tejas',
            roomUsers: ``
        }
    },
    methods: {
        async createRoom() {
            let url_id = [...Array(10)].map(() => Math.random().toString(36)[2]).join('');
            let room_id = [...Array(6)].map(() => Math.random().toString(36)[2]).join('');

            this.roomDataState.room_id = room_id
            this.roomDataState.isAdmin = true
            this.roomDataState.connectedWith = true

            // let socket = io('http://localhost:4000/')
            const socket = io('https://numerous-sideways-handball.glitch.me/')


            socket.on('connect', () => {
                this.$router.push({
                    path: `/editors/java/${url_id}`, query: { admin: true }
                })
            })

            this.isToastOpen = true
            // this.toastData = "Private Room Created"

        },
        disconnectRoom() {
            // leaveRoom(this.roomDataState.room_id, this.$route.params.id)
            // let socket = io('http://localhost:4000/')
            // socket.on('disconnected', ({ socket.id }));

            this.$bus.$emit("disconnectRoom")
            this.roomDataState.room_id = ``
            this.roomDataState.userName = ''
            this.roomDataState.isAdmin = false
            this.roomDataState.connectedWith = false
            this.$router.push('/')
        }
    },
    computed: {
        ...mapWritableState(roomStore, ['roomDataState'])
    },
    mounted() {
        this.$bus.$on("mittRoomUsers", (data) => {
            // console.log(data)
            this.roomUsers = data
        })
        console.log(localStorage.getItem("email"))
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