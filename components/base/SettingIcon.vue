<template>
    <svg @:click="toggleModal()" data-modal-target="default" data-modal-toggle="defaultModal" width="25" height="25"
        viewBox="0 0 24 24" class="mt-1 cursor-pointer setting-icon">
        <path fill="#00FF00"
            d="M19.43 12.98c.04-.32.07-.64.07-.98c0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46a.5.5 0 0 0-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.488.488 0 0 0 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1a.566.566 0 0 0-.18-.03c-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98c0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46a.5.5 0 0 0 .61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03c.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73c0 .21-.02.43-.05.73l-.14 1.13l.89.7l1.08.84l-.7 1.21l-1.27-.51l-1.04-.42l-.9.68c-.43.32-.84.56-1.25.73l-1.06.43l-.16 1.13l-.2 1.35h-1.4l-.19-1.35l-.16-1.13l-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7l-1.06.43l-1.27.51l-.7-1.21l1.08-.84l.89-.7l-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13l-.89-.7l-1.08-.84l.7-1.21l1.27.51l1.04.42l.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43l.16-1.13l.2-1.35h1.39l.19 1.35l.16 1.13l1.06.43c.43.18.83.41 1.23.71l.91.7l1.06-.43l1.27-.51l.7 1.21l-1.07.85l-.89.7l.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2z" />
    </svg>

    <div v-if="showModal"
        class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
        <div class="relative w-auto my-6 mx-auto max-w-xl">
            <!--content-->
            <div
                class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-900 outline-none focus:outline-none">
                <!--header-->
                <div class="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 class="text-2xl font-semibold">
                        Editor Settings ⚙️
                    </h3>
                </div>
                <!--body-->
                <div class="relative p-6 flex-auto">
                    <div class="flex rounded-md shadow-sm mb-4">
                        <span
                            class="px-4 inline-flex items-center min-w-fit rounded-l-md text-md bg-gray-700 text-gray-300">Font
                            Size : </span>
                        <input type="number" ref="fontSize" @change="editorSettingsState.fontSize = this.$refs.fontSize.value;" :value="editorSettingsState.fontSize"
                            class="py-2 px-3 pr-11 block w-full shadow-sm rounded-r-md text-md bg-gray-800 text-gray-200">
                    </div>

                    <div class="flex rounded-md shadow-sm mb-4">
                        <span
                            class="px-4 inline-flex items-center min-w-fit rounded-l-md text-md bg-gray-700 text-gray-300">Editor
                            Theme : </span>
                        <div class="dropdown inline-block relative w-full">
                            <select id="countries"
                                class="py-2 px-3 pr-11 block w-full shadow-sm rounded-r-md text-md bg-gray-800 text-gray-200" ref="theme" :value="editorSettingsState.theme" @change="editorSettingsState.theme = this.$refs.theme.value">
                                <option>Select Theme</option>
                                <option value="vs">VS</option>
                                <option value="vs-dark">VS - Dark</option>
                                <option value="hc-light">HC - Light</option>
                                <option value="hc-black">HC - Black</option>
                            </select>
                        </div>
                    </div>

                    <div class="flex rounded-md shadow-sm mb-4">
                        <span
                            class="px-4 inline-flex items-center min-w-fit rounded-l-md text-md bg-gray-700 text-gray-300">Word
                            Wrap : </span>
                        <input ref="wordWrap" @change="editorSettingsState.wordWrap = this.$refs.wordWrap.value;" :value="editorSettingsState.wordWrap" type="text"
                            class="py-2 px-3 pr-11 block w-full shadow-sm rounded-r-md text-md bg-gray-800 text-gray-200">
                    </div>

                    <p class="float-left text-sm text-red-500">⚠️ Changing these settings may clear your editor</p>
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
import { mapWritableState } from 'pinia'
import { useEditorStore } from '~/store/index'

export default {
    data() {
        return {
            showModal: false
        }
    },
    methods: {
        toggleModal: function () {
            this.showModal = !this.showModal;
        }
    },
    computed: {
        ...mapWritableState(useEditorStore, ['editorSettingsState'])
    },
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