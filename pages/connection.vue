<template>
    <section class="bg-gray-900 py-52">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div class="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6">
                    <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                        Join Room - <span class="text-red-500">{{ $route.query.room_id }}</span>
                    </h1>
                    <p class="text-md font-light text-gray-400">
                        Enter your private Room Id below 🔖
                    </p>
                    <div class="flex flex-col space-y-16">
                        <div class="flex flex-row items-center justify-between  w-full">
                            <input v-model="room_id" type="text" name="room_id" id="room_id" placeholder="abcde5"
                                class="border border-gray-300 sm:text-lg font-bold rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 tracking-widest"
                                required="true">
                        </div>
                    </div>
                    <button @click="$router.push({
                        path: `/editors/java/${$route.query.room_id}`
                    }); roomDataState.room_id = room_id"
                        class="w-full text-dark bg-[#00FF00] hover:bg-primary-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-primary-700 focus:ring-primary-800">Join
                        Room</button>
                    <p class="text-sm font-light text-gray-400">
                        Don't have an Room Id? Ask your referer to send you the private Room Id.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- <input type="text" v-model="room_id">
    <input type="text" v-model="name">
    <button type="button" @click="$router.push({
        path: `/editors/java/${$route.query.room_id}`
    }); roomDataState.room_id = room_id">VERIFY</button> -->
</template>

<script>
import { mapWritableState } from 'pinia'
import { roomStore } from '~/store/index'

export default {
    data() {
        return {
            room_id: ``,
            name: ``,
        }
    },
    computed: {
        ...mapWritableState(roomStore, ['roomDataState'])
    },
}
</script>