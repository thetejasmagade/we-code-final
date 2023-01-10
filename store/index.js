import { defineStore } from 'pinia'

export const useEditorStore = defineStore('counter', {
  state: () => ({
        editorSettingsState: {
            theme: 'vs-dark',
            fontSize: 18,
            wordWrap: 'on',
            padding: {
                top: 8
            }
        }
  }),
  actions: {
  },
})