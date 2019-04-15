<template>
    <div id="audioPlayer"></div>

 <!--   <audio
        :src="current"
        ref="audio"
        @ended="nextFile()"
        autoload preload="auto" autoplay>
    </audio>  -->
</template>

<script>
import audio from "../assets/audio.json";

export default {
    name: "AudioPlayer",
    components: {},
    data() {
        return {
            language: "en",
            //playlist: [],
            //current: "../assets/${folder}/en/1E.mp3"
        }


    },
    props: {},
    methods: {
        //
        playAudio(file) {
            if(file){
                file.play();
            }
        }
    },
    created() {},
   <!--  nextFile(){
        if(this.playlist.length > 0){
            this.current = this.playlist.shift()
            this.play();
        }else{
            this.current = "";

        }
    }, -->
    mounted() {
        let folder = audio.folder;
        let audioFile = new Audio(require(`../assets/${folder}/en/1E.mp3`));
        this.playAudio(audioFile);
        <!--
        if(!this.current && this.playlist.length > 0){
            this.current = this.playlist.shift();
            this.playAudio();
        } -->
    }
}
</script>

<style scoped>
    #audioPlayer {
        display: none;
    }
</style>
