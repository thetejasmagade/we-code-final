<template>
  <div class="grid grid-cols-2 divide-x h-screen bg-gray-900 text-gray-200">
    <div class="overflow-y-auto h-full">
      <!-- Black Bar for Editor -->
      <div class="bg-black border-2">
        <div class="flex">
          <div class="flex-1 w-64">
            <!-- Dynamic File Name according to language -->
            <EditorFileName :lang="editorSettings.lang" />
          </div>
          <div class="flex-1 w-32">
            <span class="float-right pr-8">
              <!-- Setting SVG icon -->
              <BaseSettingIcon />
            </span>
            <button @click="code = ``;"
              class="inline-block float-right mr-5 my-1 px-2 text-black bg-gray-300 rounded hover:bg-gray-500 hover:text-white">CLEAR</button>
            <button @click="sendCodeToRun()"
              class="inline-block float-right mr-5 my-1 px-4 text-black bg-[#00FF00] rounded">RUN</button>
          </div>
        </div>
      </div>
      <!-- Black Bar for Editor closes here -->
      <!-- Main Editor -->
      <Editor :editorSettings="editorSettings" v-model="code" code="code" />
      <!-- Main Editor Closed Here -->
    </div>
    <div class="h-screen">
      <!-- Black Bar for Output -->
      <div class="bg-black border-2">
        <p class="text-lg px-2">
          <span class="border-r-2 border-dashed">&nbsp;📤 Output&nbsp;&nbsp;&nbsp;</span>
          <button @click="output = ``"
            class="inline-block float-right mr-5 px-2 text-sm my-1 text-black bg-gray-300 rounded hover:bg-gray-500 hover:text-white">CLEAR</button>
        </p>

      </div>

      <!-- Black Bar for Output closes here -->
      <div class="overflow-y-scroll h-1/2 p-3">
        <svg v-if="isLoading" aria-hidden="true" style="display: block; margin-left: auto; margin-right: auto;"
          class="mt-36 w-8 h-8 mr-2 text-gray-700 animate-spin fill-yellow-400" viewBox="0 0 100 101" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor" />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill" />
        </svg>
        <div class="flex flex-row">
          <div v-if="!isLoading" class="basis-1 pr-3"><span class="text-[#00FF00]">&gt;</span></div>
          <div class="basis-full">
            <pre>{{ output }}</pre>
          </div>
        </div>
        <!-- {{count}}
        <button @click="add()">hscsahvc</button>
        {{count}} -->
      </div>
      <!-- Black Bar for Input -->
      <div class="bg-black border-2">
        <p class="text-lg px-2">
          <span class="border-r-2 border-dashed">&nbsp;🔤 Input&nbsp;&nbsp;&nbsp;</span>
          <button
            class="inline-block float-right mr-5 px-2 text-sm my-1 text-black bg-gray-300 rounded hover:bg-gray-500 hover:text-white">CLEAR</button>
        </p>
      </div>
      <!-- Black Bar for Input closes here -->
      <div class="overflow-y-scroll h-2/5">
        <textarea v-model="input" class="h-full w-full p-3 bg-gray-900 text-gray-200 resize-none border-none"
          placeholder='Example:- 30 "string"'></textarea>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapWritableState } from 'pinia'
// import { useCounterStore } from '~/store/index'
// import { io } from 'socket.io-client'


export default {
  data() {
    return {
      editorSettings: {
        lang: 'java'
      },
      code: `class Main {
    public static void main(String[] args){
      System.out.println("Hello, World!;");
    }
}`,
      input: ``,
      output: ``,
      isLoading: false
    }
  },

  methods: {
    async sendCodeToRun() {
      this.isLoading = true
      this.output = ``
      await sendCodeToRunServer(this.editorSettings.lang, this.code).then((res) => {
        this.output = res
      })
      this.isLoading = false
    },
  //   changeCodeSocket() {
  //     let socket = io('http://localhost:4000/')
  //     socket.on('connect', () => {
  //       console.log("connected", socket.id)
  //       socket.emit('send-code', { code: this.code })
  //     })
  //   },
  //   changeCodeFromSocket() {
  //     let socket = io('http://localhost:4000/')
  //     socket.on('receive-code', code => {
  //       console.log(code)
  //       this.code = code.code
  //     })
  //   }
  },

  // mounted() {
  //   this.changeCodeFromSocket()
  // }

  // computed: {
  //   ...mapWritableState(useCounterStore, ['count'])
  // },
  // methods: {
  //   add(){
  //     this.count++
  //   }
  // }
}
</script>

<style>

</style>