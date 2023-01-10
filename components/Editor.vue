<template>
    <MonacoEditor :value="code" @input="$emit('update:code', $event.target.value)" :lang="editorSettings.lang"
        class="h-full" :options="editorSettingsState" :key="[editorSettingsState.fontSize, editorSettingsState.theme, editorSettingsState.wordWrap].toString()" />
</template>

<script>
import { mapState } from 'pinia'
import { useEditorStore } from '~/store/index'

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
}
</script>

<style>

</style>