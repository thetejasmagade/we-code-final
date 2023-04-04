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

export const roomStore = defineStore('room', {
  state: () => ({
        roomDataState: {
          room_id: '',
          name: localStorage.getItem('name'),
          userName: localStorage.getItem('username'),
          email: localStorage.getItem('email'),
          isAdmin: false,
          connectedWith: false
        }
  }),
  actions: {
  },
})