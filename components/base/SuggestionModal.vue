<template>
    <button @click="toggleModal(); callchatgpt();" class="inline-block float-right mr-4 suggestion-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
            <path fill="currentColor"
                d="M8.075 20q-.275 0-.513-.137q-.237-.138-.362-.388L5.25 16H6.7l1 2H10v-1H8.3l-1-2H4.7l-1.425-2.5q-.05-.125-.087-.25q-.038-.125-.038-.25t.038-.25q.037-.125.087-.25L4.7 9h2.6l1-2H10V6H7.7l-1 2H5.25L7.2 4.525q.125-.25.362-.388Q7.8 4 8.075 4H10.5q.425 0 .713.287q.287.288.287.713v4H10l-1 1h2.5v3H9.3l-1-2H6l-1 1h2.7l1 2h2.8v5q0 .425-.287.712q-.288.288-.713.288Zm5.425 0q-.425 0-.712-.288q-.288-.287-.288-.712v-5h2.8l1-2H19l-1-1h-2.3l-1 2h-2.2v-3H15l-1-1h-1.5V5q0-.425.288-.713Q13.075 4 13.5 4h2.425q.275 0 .513.137q.237.138.362.388L18.75 8H17.3l-1-2H14v1h1.7l1 2h2.6l1.425 2.5q.05.125.087.25q.038.125.038.25t-.038.25q-.037.125-.087.25L19.3 15h-2.6l-1 2H14v1h2.3l1-2h1.45l-1.95 3.475q-.125.25-.362.388q-.238.137-.513.137Z" />
        </svg>
    </button>

    <div v-if="showModal" id="staticModal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true"
        class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
        <div class="relative w-full max-w-5xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        <span class="inline-block pr-4">This might be a <span class="text-[#00FF00]">solution</span> of your
                            error</span>
                        <svg class="inline-block suggestion-btn1" xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                            viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M8.075 20q-.275 0-.513-.137q-.237-.138-.362-.388L5.25 16H6.7l1 2H10v-1H8.3l-1-2H4.7l-1.425-2.5q-.05-.125-.087-.25q-.038-.125-.038-.25t.038-.25q.037-.125.087-.25L4.7 9h2.6l1-2H10V6H7.7l-1 2H5.25L7.2 4.525q.125-.25.362-.388Q7.8 4 8.075 4H10.5q.425 0 .713.287q.287.288.287.713v4H10l-1 1h2.5v3H9.3l-1-2H6l-1 1h2.7l1 2h2.8v5q0 .425-.287.712q-.288.288-.713.288Zm5.425 0q-.425 0-.712-.288q-.288-.287-.288-.712v-5h2.8l1-2H19l-1-1h-2.3l-1 2h-2.2v-3H15l-1-1h-1.5V5q0-.425.288-.713Q13.075 4 13.5 4h2.425q.275 0 .513.137q.237.138.362.388L18.75 8H17.3l-1-2H14v1h1.7l1 2h2.6l1.425 2.5q.05.125.087.25q.038.125.038.25t-.038.25q-.037.125-.087.25L19.3 15h-2.6l-1 2H14v1h2.3l1-2h1.45l-1.95 3.475q-.125.25-.362.388q-.238.137-.513.137Z" />
                        </svg>
                    </h3>
                    <button @click="toggleModal()" type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="staticModal">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-6 space-y-6" style="max-height: 450px; overflow-y: scroll;">
                    <svg v-if="isLoading" aria-hidden="true" class="w-8 h-8 text-gray-700 animate-spin fill-yellow-400"
                        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor" />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill" />
                    </svg>
                    <!-- <pre class="max-w-2xl">{{ generatedResults }}</pre> -->
                    <!-- <pre v-html="generatedResults"></pre> -->
                    <div style="white-space: pre-wrap;">{{ generatedResults }}</div>
                </div>
                <!-- Modal footer -->
                <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button @click="toggleModal()" data-modal-hide="staticModal" type="button"
                        class="text-black hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#00FF00] hover:bg-blue-700 focus:ring-blue-800">I
                        Understood</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
    data() {
        return {
            generatedResults: ``,
            showModal: false,
            errortext: this.output.replace(/['"\n\t^;]/g, " "),
            isLoading: false
        }
    },
    props: {
        output: String,
        lang: String,
    },
    methods: {
        toggleModal() {
            this.showModal = !this.showModal;
        },
        async callchatgpt() {
            this.isLoading = true
            axios.post('https://openai80.p.rapidapi.com/chat/completions', `{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"${this.errortext} error in ${this.lang}"}]}`, {
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': '95132000afmsh0aac8112a1c1544p1ff72djsn1c4acecc4b69',
                    'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
                },
            })
                .then(response => {
                    this.generatedResults = response.data.choices[0].message.content
                    this.isLoading = false
                    console.log(response.data.choices[0].message)
                })
                .catch(error => {
                    console.error(error);
                });

        }
    },
    mounted() {
    }
}
</script>

<style scoped>
.suggestion-btn {
    animation: color-change 5s infinite;
}

.suggestion-btn1 {
    animation: color-change1 5s infinite;
}

@keyframes color-change {
    0% {
        color: red;
        transform: scale(1, 1);
    }

    25% {
        color: blue;
    }

    50% {
        color: #00FF00;
        transform: scale(1.5, 1.5);
    }

    75% {
        color: #ff00a2;
    }

    100% {
        color: #08f5fd;
        transform: scale(1, 1);
    }
}

@keyframes color-change1 {
    0% {
        color: red;
    }

    25% {
        color: blue;
    }

    50% {
        color: #00FF00;
    }

    75% {
        color: #ff00a2;
    }

    100% {
        color: #08f5fd;
    }
}
</style>