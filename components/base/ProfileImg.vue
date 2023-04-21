<template>
    <button @click="logout()" title="logout" id="dropdownAvatarNameButton" data-dropdown-toggle="dropdownAvatarName"
        class="border-dashed border-2 border-sky-500 px-2 flex items-center text-sm font-medium rounded-full  hover:text-green-400 md:mr-0 focus:ring-4  focus:ring-gray-700 text-[#00ff00]"
        type="button">
        <img class="w-8 h-8 mr-2 rounded-full" :src="avatar" alt="user photo">
        {{ name }}
    </button>

    <!-- Dropdown menu -->
</template>

<script>
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';
import { mapWritableState } from 'pinia'
import { roomStore } from '~/store/index'

export default {
    data() {
        return {

        }
    },
    props: {
        name: String
    },
    methods: {
        logout() {
            this.roomDataState.room_id = '',
                this.roomDataState.name = '',
                this.roomDataState.userName = '',
                this.roomDataState.email = '',
                this.roomDataState.isAdmin = false,
                this.roomDataState.connectedWith = false

                localStorage.clear()
        }
    },
    computed: {
        ...mapWritableState(roomStore, ['roomDataState']),

        avatar() {
            const avatar = createAvatar(lorelei, { seed: this.name, randomizeIds: false });
            const svg = avatar.toDataUriSync();
            return svg
        }
    }
}
</script>