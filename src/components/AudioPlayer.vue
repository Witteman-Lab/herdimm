<template>
    <div id="audioPlayer"></div>
</template>

<script>
import audio from "../assets/audio.json";

export default {
    name: "AudioPlayer",
    components: {},
    data() {
        return {
            language: "en"
        }
    },
    props: {},
    methods: {
        playAudio(file) {
            if(file){
                file.play();
            }
        }
    },
    created() {},
    mounted() {
        let folder = audio.folder;
        let audioFile = new Audio(require(`../assets/${folder}/en/1E.mp3`));
        this.playAudio(audioFile);
    }
}
</script>

<style scoped>
    #audioPlayer {
        display: none;
    }
</style>
