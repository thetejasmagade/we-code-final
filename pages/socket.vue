<!-- <template>
    <button @click="demo()"></button>
</template>

<script setup>
import { io } from 'socket.io-client'

let socket = io('http://localhost:4000/')

function demo() {
    socket.on('connect', () => {
        console.log("connected", socket.id)
        socket.emit('custom-event', { name: "Tejas" })
    })
}

</script> -->


<template>
    <div>
        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">message</label>
        <input type="text" v-model="message" id="first_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John" required>
        <input type="text" v-model="socket_id" id="first_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John" required>
            <input type="text" v-model="to" id="first_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John" required>
        <button @click="sendMessage()">SEND DATA</button>
        <button @click="receiveMessage()">Receive DATA</button>

    </div>
</template>

<script>
import { io } from 'socket.io-client'
const socket = io('https://numerous-sideways-handball.glitch.me/')

export default {
    data() {
        return {
            message: '',
            socket_id: socket.id,
            to: ``
        }
    },
    methods: {
        sendMessage(){
            socket.emit('send-message', this.message, this.to)
        },

        receiveMessage(){
            socket.on('receive-message', message => {
                this.message = message
            })
        }
    },
    mounted() {
        this.receiveMessage()
    }
}
</script>