<template>
    <div></div>
</template>

<script>
import audio from "../assets/audio.json";
export default {
    name: "AudioPlayer",
    components: {},
    data() {
        return {}
    },
    props: {},
    methods: {},
    created() {
        console.log("created");
    },
    mounted() {
        console.log("mounted");
        //console.log("audio", audio);
        //var audio = new Audio(require('../../assets/testaudio.mp3'));
    }
}
</script>

<style scoped>

</style>
