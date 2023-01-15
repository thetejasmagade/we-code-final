<template>
    <input type="text" v-model="room_id">
    <input type="text" v-model="name">
    <button type="button" @click="$router.push({
        path: `/editors/java/${$route.query.room_id}`
    }); roomDataState.room_id = room_id">VERIFY</button>
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