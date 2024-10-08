<template>
    <div id="audioPlayer">
        <audio controls :src="this.currentAudio"  ref="audio" @ended="nextAudio()" preload="auto"></audio>
        <track :src="this.caption" kind="captions" srclang="en" label="english_captions">
    </div>
</template>

<script>
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
                audioPosition: 0,
                scenario : []

            }
        },
        props: {
            currentLanguage: String,
            voice : String,
            checkboxStateAudioPlayer : Boolean
        },
        methods: {
            /**
             *  ---> This method loads the audio file
             * @function {loadAudioFiles}
             * @param {String} type
             * @return none
             */
            loadAudioFiles(type, voice) {
                this.language = type;
                this.playlist = this.scenario[0][type].sequences;
                const folder = this.scenario[0].folder;
                this.currentAudio = require(`../assets/${folder}/${type}/${voice}/${this.playlist[this.audioPosition].file}`);
                this.caption = this.playlist[this.audioPosition].captions[0];
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
                this.caption = this.playlist[this.audioPosition].captions[0];

                // No more autoplay, animation and audio start when the user clicks on the button,
                setTimeout(() => {
                    if (this.checkboxStateAudioPlayer)
                        document.getElementById("paragraph").innerHTML = this.caption;
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
                const folder = this.scenario[0].folder;
                const type = this.currentLanguage;
                const voiceType  = this.voice;
                this.currentAudio = require(`../assets/${folder}/${type}/${voiceType}/${this.playlist[this.audioPosition].file}`);
                this.caption = this.playlist[this.audioPosition].captions[0];
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
                const folder = this.scenario[0].folder;
                const type = this.currentLanguage;
                const voiceType  = this.voice;
                this.currentAudio = require(`../assets/${folder}/${type}/${voiceType}/${this.playlist[this.audioPosition].file}`);
                this.caption = this.playlist[this.audioPosition].captions[0];
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
                    const folder = this.scenario[0].folder;
                    const type = this.currentLanguage;
                    const voiceType  = this.voice;
                    this.currentAudio = require(`../assets/${folder}/${type}/${voiceType}/${this.playlist[this.audioPosition].file}`);
                    this.caption = this.playlist[this.audioPosition].captions[0];
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
                    const folder = this.scenario[0].folder;
                    const type = this.currentLanguage;
                    const voiceType  = this.voice;
                    this.currentAudio = require(`../assets/${folder}/${type}/${voiceType}/${this.playlist[this.audioPosition].file}`);
                    this.caption = this.playlist[this.audioPosition].captions[0];
                    this.playAudio();
                } else {
                    const folder = this.scenario[0].folder;
                    const type = this.currentLanguage;
                    const voiceType  = this.voice;
                    this.audioPosition = 0;
                    this.currentAudio = require(`../assets/${folder}/${type}/${voiceType}/${this.playlist[this.audioPosition].file}`);
                    this.caption = this.playlist[this.audioPosition].captions[0];
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
            },

            /**
             * --->  Manage scenario file depending of language and voice
             * @param none
             * @return none
             */
            selectScenarioFile() {
                const language = localStorage.getItem("language");
                const voice = localStorage.getItem("voice");
                const disease = localStorage.getItem("disease");

                if (language === "en" && voice === "female" && disease === "measles")
                    this.scenario.push(require("../assets/json/scenario_female_en_measles.json"));
                else if (language === "fr" && voice === "female" && disease === "measles")
                    this.scenario.push(require("../assets/json/scenario_female_fr_measles.json"));
                else if (language === "en" && voice === "male" && disease === "measles")
                    this.scenario.push(require("../assets/json/scenario_male_en_measles.json"));
                else if (language === "fr" && voice === "male" & disease === "measles")
                    this.scenario.push(require("../assets/json/scenario_male_fr_measles.json"));
                else if (language === "en" && voice === "female" && disease === "flu")
                    this.scenario.push(require("../assets/json/scenario_female_en_flu.json"));
                else if (language === "fr" && voice === "female" && disease === "flu")
                    this.scenario.push(require("../assets/json/scenario_female_fr_flu.json"));
                else if (language === "en" && voice === "male" && disease === "flu")
                    this.scenario.push(require("../assets/json/scenario_male_en_flu.json"));
                else if (language === "fr" && voice === "male" & disease === "flu")
                    this.scenario.push(require("../assets/json/scenario_male_fr_flu.json"));
                else if (language === "en" && voice === "female" && disease === "pertussis")
                    this.scenario.push(require("../assets/json/scenario_female_en_pertussis.json"));
                else if (language === "fr" && voice === "female" && disease === "pertussis")
                    this.scenario.push(require("../assets/json/scenario_female_fr_pertussis.json"));
                else if (language === "en" && voice === "male" && disease === "pertussis")
                    this.scenario.push(require("../assets/json/scenario_male_en_pertussis.json"));
                else if (language === "fr" && voice === "male" & disease === "pertussis")
                    this.scenario.push(require("../assets/json/scenario_male_fr_pertussis.json"));
                else
                    this.scenario.push(require("../assets/json/scenario_female_en_measles.json"));
            }

        },
        created() {
        },
        mounted() {
            this.selectScenarioFile();
        }

    }
</script>

<style scoped>
    #audioPlayer {
        display: none;
    }
</style>
