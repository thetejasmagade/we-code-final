<template>
    <MonacoEditor
        @input="$emit('update:code', $event.target.value); $emit('changeCodeOnSocket')" @keyup.backspace="$emit('update:code', $event.target.value); $emit('changeCodeOnSocket')" @keyup.enter="$emit('update:code', $event.target.value); $emit('changeCodeOnSocket')" :lang="editorSettings.lang" class="h-full"
        :options="editorSettingsState"
        :key="[editorSettingsState.fontSize, editorSettingsState.theme, editorSettingsState.wordWrap].toString()" />
</template>

<script>
import { mapState } from 'pinia'
import { useEditorStore } from '~/store/index'
import { io } from 'socket.io-client'

export default {
    data() {
        return {
            value: ``
        }
    },
    props: {
        editorSettings: Object,
        code: String
    },
    emits: ['update:code'],
    computed: {
        ...mapState(useEditorStore, ['editorSettingsState'])
    },
    methods: {
        changeCodeFromSocket() {
            let socket = io('http://localhost:4000/')
            socket.on('receive-code', code => {
                console.log(code.code)
                this.code = code.code  
            }) 
        }
    },
    updated(){

    }
}
</script>

<style>

</style>