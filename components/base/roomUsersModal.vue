<template>
    <button @:click="toggleModal()" data-modal-target="default" data-modal-toggle="defaultModal" type="button"
        class="text-white bg-transparent from-purple-600 to-blue-500 bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-3 text-center mr-5 py-2">Room
        Joinies <span class="text-red-500">({{ data.length }})</span></button>

    <div v-if="showModal"
        class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
        <div class="relative w-9/12 my-6 mx-auto max-w-9/12">
            <!--content-->
            <div
                class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-900 outline-none focus:outline-none">
                <!--header-->
                <div class="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 class="text-2xl font-semibold text-white">
                        Room Joinies 🧑‍🤝‍🧑
                    </h3>
                </div>
                <!--body-->
                <div class="relative p-6 flex-auto">
                    <!-- <li>{{ addIcon }}</li> -->
                    <div class="grid grid-cols-6 gap-4 text-center">
                        <div v-for="(user, i) in data" :key="i"
                            class="w-full max-w-[180px] max-h-[130px] border rounded-lg shadow bg-gray-800 border-gray-700 p-2"
                            style="position: relative;">

                            <p v-if="user.isAdmin"
                                style="position: absolute; top: 0; right: 0; width: 50px; text-align:right; font-size: 14px; color: #00FF00;font-weight: 600;"
                                class="pr-4">{{ roomDataState.isAdmin ? "You" : "Admin" }}</p>

                                <p v-if="!user.isAdmin && user.user == roomDataState.name"
                                style="position: absolute; top: 0; right: 0; width: 50px; text-align:right; font-size: 14px; color: #FFFF00;font-weight: 600;"
                                class="pr-4">You</p>

                            <svg v-if="roomDataState.isAdmin && !user.isAdmin" @click="removeUser(user.user)"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                class="pt-1 cursor-pointer"
                                style="position: absolute; top: 0; right: 0; text-align:right; color: red;"
                                viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm4 11H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1z" />
                            </svg>

                            <div class="h-[80px] w-[80px] mx-auto">
                                <img :src="addIcon" :key="user.user">
                            </div>
                            <h2 class="text-white py-1">{{ user.user }}</h2>
                        </div>
                    </div>

                </div>
                <!--footer-->
                <div class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                        class="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 border-2"
                        style="color: #00FF00" type="button" v-on:click="toggleModal()">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
</template>

<script>
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';
import { mapState } from 'pinia'
import { roomStore } from '~/store/index'


export default {
    props: {
        data: Array
    },
    data() {
        return {
            showModal: false
        }
    },
    methods: {
        toggleModal() {
            this.showModal = !this.showModal;
        },

        removeUser(user) {
            console.log(user)
            this.$bus.$emit("disconnectRoom")
        },
    },
    computed: {
        addIcon() {
            // let updated = this.data.map()
            for (let i = 0; i < this.data.length; i++) {
                const avatar = createAvatar(lorelei, { seed: this.data[Math.floor(Math.random() * this.data.length)].name, randomizeIds: false });
                const svg = avatar.toDataUriSync();
                return svg
            }
        },

        ...mapState(roomStore, ['roomDataState'])
    },
    mounted() {
        // this.data.map(addIcon())

    }
}
</script>

<style>
.setting-icon {
    transition: width 2s, height 2s, transform 1s;
}

.setting-icon:hover {
    transform: rotate(90deg);
}

.dropdown:hover .dropdown-menu {
    display: block;
}
</style>