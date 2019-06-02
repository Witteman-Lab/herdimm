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
             * @function {loadAudioFiles}
             * @param {String} type
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
             *  ---> This method plays the current audio file
             * @function {playAudio}
             * @param none
             * @return none
             */
            playAudio() {
                this.onplay = true;
                let ref = this.$refs.audio;
                let actions = this.playlist[this.audioPosition].actions;
                let launchSequence = this.$parent.launchSequence;

                // No more autoplay, animation and audio start when the user clicks on the button,
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
             * @function {stopAudio}
             * @param none
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
             *  ---> This method restart playing the current audio file
             * @function {restartAudio}
             * @param none
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
             *  ---> This method load the first audio of the playlist and play it
             * @function {firstAudio}
             * @param none
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
             *  ---> This method load the last audio of the playlist and play it
             * @function {lastAudio}
             * @param none
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
             *  ---> This method load the previous audio of the playlist and play it
             * @function {previousAudio}
             * @param none
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
             *  ---> This method load the next audio of the playlist and play it
             *
             * @param none
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
             *  ---> This function allows you to have the current audio status
             * @function {getAudioStatus}
             * @param none
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
