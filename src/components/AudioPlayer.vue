<template>
    <div id="audioPlayer">
        <audio controls :src="this.currentAudio"  ref="audio" @ended="nextAudio()" preload="auto"></audio>
        <track :src="this.caption" kind="captions" srclang="en" label="english_captions">

<!-- test for audio not playing -->
<!--        <audio controls="controls" ref="audio"  @ended="nextAudio()" preload="auto">-->
<!--            <source :src="this.currentAudio"  type="audio/mpeg"/>-->
<!--        </audio>-->
<!--        <track :src="this.caption" kind="captions" srclang="en" label="english_captions">-->
    </div>
</template>

<script>
    //import valeurtest from "../assets/json/scenario.json";
    //import scenario from "../assets/json/SupFile.json";

    import scenarioFemaleEn from "../assets/json/scenario_female_en.json";
    import scenarioFemaleFr from "../assets/json/scenario_female_fr.json";
    import scenarioMaleEn from "../assets/json/scenario_male_en.json";
    import scenarioMaleFr from "../assets/json/scenario_male_fr.json";


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
            voice : String
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
                const folder = this.scenario[0].folder;
                const type = this.currentLanguage;
                const voiceType  = this.voice;
                this.currentAudio = require(`../assets/${folder}/${type}/${voiceType}/${this.playlist[this.audioPosition].file}`);
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
                const folder = this.scenario[0].folder;
                const type = this.currentLanguage;
                const voiceType  = this.voice;
                this.currentAudio = require(`../assets/${folder}/${type}/${voiceType}/${this.playlist[this.audioPosition].file}`);
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
                    const folder = this.scenario[0].folder;
                    const type = this.currentLanguage;
                    const voiceType  = this.voice;
                    this.currentAudio = require(`../assets/${folder}/${type}/${voiceType}/${this.playlist[this.audioPosition].file}`);
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
                    const folder = this.scenario[0].folder;
                    const type = this.currentLanguage;
                    const voiceType  = this.voice;
                    this.currentAudio = require(`../assets/${folder}/${type}/${voiceType}/${this.playlist[this.audioPosition].file}`);
                    this.caption = this.playlist[this.audioPosition].caption;
                    this.playAudio();
                } else {
                    const folder = this.scenario[0].folder;
                    const type = this.currentLanguage;
                    const voiceType  = this.voice;
                    this.audioPosition = 0;
                    this.currentAudio = require(`../assets/${folder}/${type}/${voiceType}/${this.playlist[this.audioPosition].file}`);
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
            },

            /**
             * --->  ---------------------------------- It's will be completed later ------------------------------
             * @param {Array} props
             * @return none
             */
            selectScenario(){
                // if(localStorage.getItem("currentLanguage") === "en" && localStorage.getItem("gender") === "female")
                //     this.scenario.push(scenarioFemaleEn);
                // else if(localStorage.getItem("currentLanguage") === "fr" && localStorage.getItem("gender") === "female")
                //     this.scenario.push(scenarioFemaleFr);
                // else if(localStorage.getItem("currentLanguage") === "en" && localStorage.getItem("gender") === "male")
                //     this.scenario.push(scenarioMaleEn);
                // else if(localStorage.getItem("currentLanguage") === "fr" && localStorage.getItem("gender") === "male")
                //     this.scenario.push(scenarioMaleFr);
                // else{
                //     this.scenario.push(scenarioFemaleEn);
                // }

                if(localStorage.getItem("currentLanguage") === "en" && localStorage.getItem("gender") === "female"){
                    this.scenario.push(scenarioFemaleEn);
                    console.log("1");
                    console.log("scenarioFemaleEn");
                }
                else if(localStorage.getItem("currentLanguage") === "fr" && localStorage.getItem("gender") === "female")
                {
                    this.scenario.push(scenarioFemaleFr);
                    console.log("2");
                    console.log("scenarioFemaleFr");
                }
                else if(localStorage.getItem("currentLanguage") === "en" && localStorage.getItem("gender") === "male")
                {
                    this.scenario.push(scenarioMaleEn);
                    console.log("3");
                    console.log("scenarioMaleEn");
                }
                else if(localStorage.getItem("currentLanguage") === "fr" && localStorage.getItem("gender") === "male")
                {
                    this.scenario.push(scenarioMaleFr);
                    console.log("4");
                    console.log("scenarioMaleFr");
                }
                else{
                    this.scenario.push(scenarioFemaleEn);
                    console.log("par defaut");
                    console.log("5");
                }
            }

        },
        created() {
        },
        mounted() {
            this.selectScenario();
            console.log("la valeur du local est ", localStorage.getItem("currentLanguage"));
        }

    }
</script>

<style scoped>
    #audioPlayer {
        display: none;
    }
</style>
