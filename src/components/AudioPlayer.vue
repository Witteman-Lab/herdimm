<template>
    <div id="audioPlayer">
        <audio :src="this.currentAudio" muted="muted" ref="audio" @ended="nextAudioFile()" preload="auto"></audio>
        <track :src="this.caption" kind="captions" srclang="en" label="english_captions">
    </div>
</template>

<script>
    import audio from "../assets/json/audio.json";
    //import scenario_en from "../assets/json/scenario_en";
    //import scenario_fr from "../assets/json/scenario_fr";

    export default {
        name: "AudioPlayer",
        components: {},
        data() {
            return {
                // Language value should come from the selected language from Animation.vue
                language: "en",
                playlist: [],
                currentAudio: '',
                currentActions: [],
                caption: '',
                onplay: false,
                audioPosition: 0
            }
        },
        props: {
            currentLanguage: String
        },
        methods: {
            // METHOD DESCRIPTION
            playAudio() {
                let ref = this.$refs.audio;
                let actions = this.playlist[this.audioPosition].actions;
                let playPromise;
                let launchSequence = this.$parent.launchSequence;

                // No more autoplay, animation and audio start when the user clicks on the button,
                // So this method needs to be adjusted
                setTimeout(() => {
                    playPromise = ref.play();
                    if (actions) {
                        actions.forEach((sequence) => {
                            launchSequence(sequence);
                        });
                    }
                }, 1000);
            },
            //require(`../assets/${folder}/${type}/${jsonPlaylist[i].file}`)
            // METHOD DESCRIPTION
            loadAudioFiles(type) {
                this.language = type;
                this.playlist = audio[type].sequences;
                const folder = audio.folder;
                this.currentAudio = require(`../assets/${folder}/${type}/${this.playlist[this.audioPosition].file}`);
                this.caption = this.playlist[this.audioPosition].caption;
            },

            // METHOD DESCRIPTION
            nextAudioFile() {
                this.audioPosition++;
                const folder = audio.folder;
                const type = this.currentLanguage;
                this.onplay = true;
                if (this.audioPosition < this.playlist.length) {
                    this.currentAudio = require(`../assets/${folder}/${type}/${this.playlist[this.audioPosition].file}`);
                    this.caption = this.playlist[this.audioPosition].caption;
                    this.playAudio();
                } else {
                    this.currentAudio = "";
                    this.caption = "";
                    this.onplay = false;
                }
            },

            // METHOD DESCRIPTION
            stopAudio() {
                if (this.onplay) {
                    this.onplay = false;
                }
            }
        },
        created() {},
        mounted() {
            // this.nextAudioFile();
        }
    }
</script>

<style scoped>
    #audioPlayer {
        display: none;
    }
</style>
