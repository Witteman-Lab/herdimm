<template>
    <div class="container">
        <!-- MODAL WINDOW -->
        <Modal ref="modal" :defaultCharacterColors="defaultCharacterColors" :skin-colors="skinColors" :hair-colors="hairColors" :total-characters-count="maxCharactersInGroup" :glasses-list-json="glassesListJson" :facial-hair-list-json="facialHairList" :labels="labels"/>
        <!-- INTERFACE -->
        <div class="is-centered is-half-desktop is-half-mobile">
            <h1>{{this.labels.pageTitle}}</h1>
            <button id="selectLanguage" class="button" v-on:click="this.changeLanguage">{{this.labels.language}}</button>

            <p id="generalInfo">{{this.labels.generalInfo}}</p>
            <p id="contextualInfo">{{ contextualInfo }}</p>
            <h2>{{ this.labels.totalCharacterCount }} {{this.totalCreated}} / {{maxCharactersInGroup}} </h2>
            <!-- List of all the characters -->
            <div class="tool">
                <div style="width: 100%; margin: 12px;">
                    <!-- Not sure if it should be displayed here or in the CharacterList.vue -->
                    <!-- <progress v-if="!isCharactersListLoaded" class="progress is-large is-info" max="100"></progress> -->
                    <div style="width: 100%">
                        <CharacterList :defaultCharacterColors="defaultCharacterColors" ref="listAvailable" :characters="this.characterList"></CharacterList>
                    </div>
                </div>
            </div>

            <h1>{{this.labels.subtitle}}</h1>

            <!-- List of the group member -->
            <div class="tool">
                <div style="width: 100%; margin: 12px; display: flex; justify-content: center;">
                    <GroupCharacter :labels='labels' ref="listToFill"></GroupCharacter>
                </div>
            </div>
        </div>

        <!-- Button to continue to the next section (e.g. the animation) -->
        <section>
            <div class="control has-text-centered">
                <p id="finalInfo" v-if="isGroupComplete">{{this.labels.finalInfo}}</p>
                <button id="continue" class="continue button is-primary is-success" v-if="isGroupComplete" v-on:click="loadAnimationView()">{{this.labels.continueBtn}}</button>
            </div>
        </section>
    </div>
</template>

<script>
    import CharacterList from "./CharacterList";
    import GroupCharacter from "./GroupCharacter";
    import Modal from "./Modal";

    import charactersJson from "../assets/json/characters.json";
    import textsEng from "../assets/json/textsEng.json";
    import textsFr from "../assets/json/textsFr.json";
    import glassesJson from "../assets/json/glasses.json";
    import facialHairJson from "../assets/json/facialHair.json";


    export default {
        name: "home",
        components: {
            Modal,
            GroupCharacter,
            CharacterList,
        },
        data() {
            return {
                isLanguageChanged: true,
                isGroupComplete: false,
                characterList: [],
                isCharactersListLoaded: false,
                contextualInfo: "",
                finalInfo: "",
                totalCreated: 0,
                maxCharactersInGroup: 0,
                facialHairList: [],
                glassesListJson: [],
                texts: '',
                skinColors: [],
                hairColors: [],
                defaultCharacterColors: {},
                diseaseHome:"",
                gender : "",
                timeSpendMYG: 0,
                startTime: Date.now(),

            };
        },
        props: {
        },
        methods: {

            setTimeOut(){
                let endTime = Date.now();
                let  spendTime = Math.round((endTime - this.startTime));
                this.timeSpendMYG = spendTime;
            },
            /**
             * ---> Launch modal with the given character object
             * @param {Object} character
             * @return none
             */
            launch(character) {
                if (this.$refs.listToFill.getCharacterListSize() < this.maxCharactersInGroup)  {
                    this.$refs.modal.openModal(this.totalCreated, character, this.totalCreated,
                        charactersJson.nbVulnerable, charactersJson.nbAvatar, false, this.labels.createAvatar);
                }
            },


            /**
             * ---> Launch edit modal with the given character object (might need refactoring)
             * @param {Object} character
             * @param {Number} index
             * @return none
             */
            launchEditModal(character, index) {
                this.$refs.modal.openModal(index, character, this.totalCreated,
                    charactersJson.nbVulnerable, charactersJson.nbAvatar, true,  this.labels.editAvatar);
            },

            /**
             * ---> Update Home information and add the character to the groupList
             * @param {Object} character
             * @param {Object} colors
             * @return none
             */
            saveCharacter(character, colors) {
                this.totalCreated++;
                this.manageCharacterCount();
                this.$refs.listToFill.addCharacterToGroup(character,
                    colors, this.getCurrentCharacterType(this.totalCreated));
                if (this.$refs.listToFill.getCharacterListSize() === this.maxCharactersInGroup) {
                    this.isGroupComplete = true;
                }

                window.scrollTo(0, document.body.scrollHeight);
                if(this.totalCreated <this.maxCharactersInGroup)
                    setTimeout(() => {
                            window.scrollTo({ top: 0, behavior: 'smooth', x: 0})
                        },
                        parseInt(charactersJson.scrollingTimeControl));
            },

            /**
             * ---> Edit groupList character
             * @param {Object} character
             * @param {Object} colors
             * @return none
             */
            editCharacter(character, colors) {
                this.$refs.listToFill.editCharacter(character,
                    colors, character.characterType);
            },

            /**
             * ---> Return current Character type based on the position in the groupList
             * @param {Number} position
             * @return {String} character Type
             */
            getCurrentCharacterType(position) {
                if (position <= charactersJson.nbAvatar) {
                    return "avatar";
                } else if (position <= charactersJson.nbAvatar + charactersJson.nbVulnerable)   {
                    return "vulnerable"
                } else if (position <= charactersJson.nbAvatar + charactersJson.nbVulnerable + charactersJson.nbCommunity) {
                    return "comm";
                }
            },

            setDiseaseToAnimate() {
                if (this.$route.query.d === "flu" ||  this.$route.query.d === "measles" || this.$route.query.d === "pertussis")
                    this.diseaseHome = this.$route.query.d;
                else {
                    this.diseaseHome = "measles";
                }
            },

            setVoiceToPlay() {
                if (this.$route.query.v === "male" ||  this.$route.query.v === "female")
                    this.gender = this.$route.query.v;
                else if (this.$route.query.v == null)
                    this.gender = "male";
                else {
                    let voiceType = ["male", "female"];
                    this.gender = voiceType[this.getRandomInt(voiceType.length)];
                }
            },

            /**
             * ---> Go to the animation Page. Send the current language and the character groupList
             * @param none
             * @return none
             */
            loadAnimationView() {
                let groupCharacter = this.$refs.listToFill.getCharacterList();
                this.setTimeOut();
                this.$router.push(
                    {name: 'Animation', params:{group: groupCharacter, labelSelected: this.labels.currentLanguage, diseaseToPlay: this.diseaseHome, voiceToPlay: this.gender}});
                localStorage.setItem("currentLanguage", this.labels.currentLanguage);
                localStorage.setItem("gender", this.gender);
            },

            /**
             * ---> Manage messages on the Home page based on the character group number created
             * @param none
             * @return none
             */
            manageCharacterCount() {
                if (this.totalCreated < charactersJson.nbAvatar)  {
                    this.contextualInfo = this.labels.contextualInfoAvatar;
                } else if (this.totalCreated < charactersJson.nbAvatar + charactersJson.nbVulnerable) {
                    this.contextualInfo = `${this.labels.nowSelect} ${charactersJson.nbVulnerable} ${this.labels.selectVulnerable}`;
                } else if (this.totalCreated < charactersJson.nbAvatar + charactersJson.nbVulnerable + charactersJson.nbCommunity) {
                    this.contextualInfo = `${this.labels.finallySelect} ${charactersJson.nbCommunity} ${this.labels.selectOthersPeople}`;
                } else {
                    this.contextualInfo = "";
                }
            },
            /**
             * ---> This function randomly returns between [0-2]
             *  @param {number} value
             *  @return {number}
             */
            getRandomInt(value){
                return Math.floor(Math.random()*Math.floor(value));
            },

            /**
             * ---> Change the language of the Application
             * @param none
             * @return none
             */
            changeLanguage() {
                if (this.isLanguageChanged)
                    this.labels = textsFr;
                else
                    this.labels = textsEng;
                this.isLanguageChanged = !this.isLanguageChanged;
                this.manageCharacterCount();
                this.$forceUpdate();
            },
        },

        /**
         * ---> Load json data and labels
         * @param none
         * @return none
         */
        created() {
            this.characterList = charactersJson.characters;
            this.labels = textsEng;
            this.maxCharactersInGroup = charactersJson.nbAvatar + charactersJson.nbVulnerable + charactersJson.nbCommunity;
            this.contextualInfo = this.labels.contextualInfoAvatar;
            this.facialHairList = facialHairJson.beards;
            this.glassesListJson = glassesJson.glasses;
            this.skinColors = charactersJson.skinColors;
            this.hairColors = charactersJson.hairColors;
            this.defaultCharacterColors = charactersJson.defaultColors;

        },
        mounted() {
            localStorage.clear();
            this.setDiseaseToAnimate();
            this.setVoiceToPlay();
        }
    }
</script>
<style>
    /* To change the visual for the color picker */
    div.vc-compact {
        width: 100%;
    }
    li.vc-compact-color-item {
        width: 45px;
        height: 45px;
    }
    div.vc-compact-dot {
        width: 50%;
        height: 50%;
        top: 25%;
        bottom: 25%;
        left: 25%;
        right: 25%;
    }
</style>
<style scoped>
    h1 {
        font-weight: bold;
        margin: 0 0 30px 0;
    }
    p {
        margin: 10px 0;
    }
    .tool {
        display: flex;
        justify-content: center;
    }

    p#contextualInfo {
        /* border: 2px solid #F67844;
        margin: 0 0;
        width: auto; */
        text-decoration: underline;
    }
    button#continueAnimation, p#contextualInfo, p#finalInfo {
        animation: appearanceAnim;
        /* animation: appearanceAnim 2s ease-in-out; */
        -webkit-animation-name: appearanceAnim; /* Safari 4.0 - 8.0 */
        -webkit-animation-duration: 2s; /* Safari 4.0 - 8.0 */
        /* -webkit-animation-iteration-count: 2; */
        -webkit-animation-direction: alternate; /* Safari 4.0 - 8.0 */
        animation-name: appearanceAnim;
        animation-duration: 2s;
        /* animation-iteration-count: 2; */
        animation-direction: alternate;
    }
    @keyframes appearanceAnim {
        0% {
            opacity: 1;
        }
        25% {
            opacity: 0.25;
        }
        50% {
            opacity: 1;
        }
        75% {
            opacity: 0.25;
        }
        100% {
            opacity: 1;
        }
    }
</style>
