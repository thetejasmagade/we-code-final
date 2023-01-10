<template>
    <p class="text-lg px-2">
        <span class="border-r-2 border-dashed">&nbsp;📝
            <span v-if="lang=='java'">Main.java</span>
            <span v-if="lang=='python'">main.py</span>
            &nbsp;&nbsp;&nbsp;</span>
    </p>
</template>

<script>
export default {
    props: {
        lang: String
    }

}
</script>

<style>

</style>