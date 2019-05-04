<template>
    <div id="audioPlayer">
         <audio :src="this.current" muted="muted" ref="audio" @ended="nextAudioFile()" preload="auto"></audio>
         <track :src="this.caption" kind="captions" srclang="en" label="english_captions">
    </div>
</template>

<script>
    import audio from "../assets/json/audio.json";

    export default {
        name: "AudioPlayer",
        components: {},
        data() {
            return {
                language: "en",
                playlist: [],
                current: '',
                captions: [],
                caption: '',
                onplay: false
            }
        },
        props: {},
        methods: {
            // METHOD DESCRIPTION
            playAudio() {
                //console.log(this.current);
                let ref = this.$refs.audio;
                let playPromise;

                setTimeout(function() {
                    playPromise = ref.play();
                    if (playPromise !== undefined) {
                        // playPromise.then(_ => {
                        playPromise.then(() => {
                            // Autoplay started!
                            // launch futures animations here
                        }).catch((error) => {
                            //console.log(error.name);
                            //console.log(error.message);
                            this.onplay = false;
                            // Autoplay was prevented.
                            // Show a "Play" button so that user can start playback.
                        });
                    }
                }, 1000);
            },

            // METHOD DESCRIPTION
            loadAudioFiles(type) {
                this.language = type;
                const jsonPlaylist = audio[type].sequences;
                const folder = audio.folder;
                for (let i = 0; i < jsonPlaylist.length; i++) {
                    this.playlist.push(require(`../assets/${folder}/${type}/${jsonPlaylist[i].file}`));
                    this.captions.push(jsonPlaylist[i].caption);
                }
            },

            // METHOD DESCRIPTION
            nextAudioFile() {
                this.onplay = true;
                if (this.playlist.length > 0) {
                    this.current = this.playlist.shift();
                    this.caption = this.captions.shift();
                    this.playAudio();
                } else {
                    this.current = "";
                    this.caption = "";
                    this.onplay = false;
                }
            },
        },
        created() {},
        mounted() {
            this.loadAudioFiles(audio.en.folder);
            this.nextAudioFile();
        }
    }
</script>

<style scoped>
    #audioPlayer {
        display: none;
    }
</style>
