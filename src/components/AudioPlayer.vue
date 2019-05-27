<template>
    <div id="audioPlayer">
        <audio :src="this.currentAudio" muted="muted" ref="audio" @ended="nextAudio()" preload="auto"></audio>
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
            /**
             *  ---> This method loads the audio file
             *  @function {loadAudioFiles}
             * @param {string} type
             * @return none
             */
            loadAudioFiles(type) {
                this.language = type;
                this.playlist = audio[type].sequences;
                const folder = audio.folder;
                this.currentAudio = require(`../assets/${folder}/${type}/${this.playlist[this.audioPosition].file}`);
                this.caption = this.playlist[this.audioPosition].caption;
            },

            /**
             *  ---> This method plays the audio file
             *  @function {playAudio}
             * @return none
             */
            playAudio() {
                this.onplay = true;
                let ref = this.$refs.audio;
                let actions = this.playlist[this.audioPosition].actions;
                let launchSequence = this.$parent.launchSequence;

                // No more autoplay, animation and audio start when the user clicks on the button,
                // So this method needs to be adjusted
                setTimeout(() => {
                    ref.play();
                    if (actions) {
                        actions.forEach((sequence) => {
                            launchSequence(sequence);
                        });
                    }
                }, 1000);
            },

            /**
             *  ---> This method stops playing the audio file
             *  @function {stopAudio}
             * @return none
             */
            stopAudio() {
                if (this.onplay) {
                    this.onplay = false;
                    let ref = this.$refs.audio;
                    ref.pause();
                }
            },

            /**
             *  ---> This method restart playing the audio file
             *  @function {restartAudio}
             * @param {}type
             * @return none
             */
            restartAudio() {
                if (!this.onplay) {
                    this.onplay = true;
                    let ref = this.$refs.audio;
                    ref.play();
                }
            },

            /**
             *  ---> ------------------ will be completed soon -------------------
             *  @function {firstAudio}
             * @param {}type
             * @return none
             */
            firstAudio() {
                this.audioPosition = 0;
                const folder = audio.folder;
                const type = this.currentLanguage;
                this.currentAudio = require(`../assets/${folder}/${type}/${this.playlist[this.audioPosition].file}`);
                this.caption = this.playlist[this.audioPosition].caption;
                this.playAudio();
            },

            /**
             *  ---> ------------------ will be completed soon -------------------
             *  @function {lastAudio}
             * @param {}type
             * @return none
             */
            lastAudio() {
                this.audioPosition = this.playlist.length - 1;
                const folder = audio.folder;
                const type = this.currentLanguage;
                this.currentAudio = require(`../assets/${folder}/${type}/${this.playlist[this.audioPosition].file}`);
                this.caption = this.playlist[this.audioPosition].caption;
                this.playAudio();
            },

            /**
             *  ---> ------------------ will be completed soon -------------------
             *  @function {previousAudio}
             * @param {}type
             * @return none
             */
            previousAudio() {
                if (this.audioPosition > 0) {
                    this.audioPosition--;
                    const folder = audio.folder;
                    const type = this.currentLanguage;
                    this.currentAudio = require(`../assets/${folder}/${type}/${this.playlist[this.audioPosition].file}`);
                    this.caption = this.playlist[this.audioPosition].caption;
                    this.playAudio();
                }
            },

            /**
             *  ---> ------------------ will be completed soon -------------------
             *
             * @param {}type
             * @return none
             */
            nextAudio() {
                this.audioPosition++;
                if (this.audioPosition < this.playlist.length) {
                    const folder = audio.folder;
                    const type = this.currentLanguage;
                    this.currentAudio = require(`../assets/${folder}/${type}/${this.playlist[this.audioPosition].file}`);
                    this.caption = this.playlist[this.audioPosition].caption;
                    this.playAudio();
                } else {
                    const folder = audio.folder;
                    const type = this.currentLanguage;
                    this.audioPosition = 0;
                    this.currentAudio = require(`../assets/${folder}/${type}/${this.playlist[this.audioPosition].file}`);
                    this.caption = this.playlist[this.audioPosition].caption;
                    this.$parent.reloadAnimation();
                }
            },




            /**
             *  ---> This function allows you to have audio status
             *  @function {getAudioStatus}
             * @return none
             */
            getAudioStatus() {
                return this.onplay;
            }


        },
        created() {},
        mounted() {}
    }
</script>

<style scoped>
    #audioPlayer {
        display: none;
    }
</style>
