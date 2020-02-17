<template>
    <div class="container">
        <!-- MODAL WINDOW -->
        <Modal ref="modal"  :total-created="totalCreated" :is-group-complete="isGroupComplete" :max-characters-in-group="maxCharactersInGroup" :defaultCharacterColors="defaultCharacterColors" :skin-colors="skinColors" :hair-colors="hairColors" :total-characters-count="maxCharactersInGroup"  :facial-hair-list-json="facialHairList" :max-color-tile="maxColorTile" :labels="labels"/>

        <div class="is-centered is-half-desktop is-half-mobile">
            <div class="instructions-block">
                <h1 v-if="!replaceCharacterMode" class="page-instruction">{{this.labels.stepsMakingAvatar[step].title}}</h1>
                <h1 v-if="replaceCharacterMode" class="page-instruction">{{this.labels.selectAvatar}}</h1>
                <p v-if="!isGroupComplete & !replaceCharacterMode" id="contextualInfo">{{ this.labels.stepsMakingAvatar[step].description }}</p>
                <v-btn :disabled="replaceCharacterMode" color="#05CDC1" id="continue" class="continue" v-if="isGroupComplete" v-on:click="loadAnimationView()">
                        <span>{{this.labels.continueBtn.toUpperCase()}}</span>
                        <font-awesome-icon style="margin-left: 10px;" icon="play" size="lg"/>
                </v-btn>
            </div>
            <button id="selectLanguage" :style="{'z-index': languageButtonIndex}" style="z-index: 20" class="button" v-on:click="this.changeLanguage">{{this.labels.language}}</button>

            <!-- List of all the characters -->
            <div class="tool">
                <div style="width: 100%; margin: 12px;">
                    <div style="width: 100%">
                        <CharacterList :defaultCharacterColors="defaultCharacterColors" ref="listAvailable" :characters="this.characterList"></CharacterList>
                    </div>
                </div>
            </div>

            <div v-if="debugMode">
                <v-btn v-on:click="this.generateAllCharacters">{{this.labels.generateAllCharacters}}</v-btn>
                <v-btn v-on:click="this.changeCharacterGeneration">{{characterTypeToGenerate ? this.labels.differentCharacters : this.labels.sameCharacters}}</v-btn>
            </div>

            <!-- List of the group member -->
            <div class="tool">
                <GroupCharacter :nbAvatar="nbAvatar"
                                :nbVulnerable="nbrVulnerable"
                                :nbCommnunity="nbrCommunity" :labels='labels' id="groupCharacter" ref="listToFill"></GroupCharacter>
            </div>
        </div>
    </div>
</template>



<script>

    import CharacterList from "./CharacterList";
    import GroupCharacter from "./GroupCharacter";
    import Modal from "./Modal";

    import charactersJson from "../assets/json/characters.json";
    import textsEng from "../assets/json/textsEng.json";
    import textsFr from "../assets/json/textsFr.json";
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
                maxColorTile: 0,
                facialHairList: [],
                texts: '',
                skinColors: [],
                hairColors: [],
                defaultCharacterColors: {},
                languageButtonIndex: 20,
                nbAvatar: 0,
                nbrVulnerable: 0,
                nbrCommunity: 0,
                characterTypeToGenerate: false,
                debugMode: false,
                totalTime: 0,
                startTime: Date.now(),
                step: 0,
                replaceCharacterMode: false
            };
        },
        props: {
            characterTime: Number,
        },
        methods: {
            /**
             * ---> ---------  completed soon -------
             * @param none
             * @return none
             */
            changeCharacterGeneration() {
                this.characterTypeToGenerate = !this.characterTypeToGenerate
            },

            /**
             * ---> ---------  completed soon -------
             * @param none
             * @return none
             */
            generateAllCharacters() {
                if (!this.isGroupComplete) {
                    let character;
                    if (this.characterTypeToGenerate) {
                        character = charactersJson.characters[Math.floor(Math.random() * charactersJson.characters.length)];
                    }
                    for (let i = this.totalCreated; i < this.maxCharactersInGroup; i++) {
                        if (!this.characterTypeToGenerate) {
                            character = charactersJson.characters[Math.floor(Math.random() * charactersJson.characters.length)];
                        }
                        let shirt = "#BFBABE";
                        let shirtShadow = "#999598";
                        let accessoriesColor = this.defaultCharacterColors.AccessoriesColor;
                        if (i === 0) {
                            shirt = "#F67844";
                            shirtShadow = "#c56036";
                            accessoriesColor = shirt;
                        }
                        let svgColor = {
                            beards: "",
                            face: "#E7B38D",
                            faceShadow: "#b98f71",
                            glasses: "",
                            hairBack: "#553e35",
                            hairFront: "#6A4E42",
                            idCharacter: "",
                            options: ['', '', ''],
                            shirt,
                            shirtShadow,
                            name,
                            accessoriesColor
                        };
                        this.saveCharacter(character, svgColor);
                    }
                }
            },
            /**
             * ---> ---------  completed soon -------
             * @param {string} action
             * @return none
             */
            changeLanguageButtonIndex(action) {
                if (action === "open")
                    this.languageButtonIndex = 40;
                else if (action === "close")
                    this.languageButtonIndex = 20;
            },

            /**
             * ---> calculate total time spend for a user
             * @param  none
             * @return none
             */
            calculateTotalTime() {
                let endTime = Date.now();
                let spendTime = Math.round((endTime - this.startTime));
                this.totalTime = spendTime;
            },

            /**
             * ---> Launch modal with the given character object
             * @param {Object} character
             * @return none
             */
            launch(character) {
                if (this.$refs.listToFill.getCharacterListSize() < this.maxCharactersInGroup || this.replaceCharacterMode) {
                    this.$refs.modal.openModal(this.totalCreated, character, this.totalCreated, false, this.labels.createAvatar);
                }
            },


            /**
             * ---> Launch edit modal with the given character object (might need refactoring)
             * @param {Object} character
             * @param {Number} index
             * @return none
             */
            launchEditModal(character, index) {
                this.$refs.modal.openModal(index, character, this.totalCreated, true, this.labels.editAvatar);
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

                if (this.totalCreated <= this.maxCharactersInGroup && window.innerWidth < 420) {
                    setTimeout(() => {
                        window.scrollTo({top: 0, behavior: 'smooth', x: 0})
                    },
                    parseInt(charactersJson.scrollingTimeControl));
                }
            },


            saveCharacterAfterReplace(character, colors, type, id) {
                this.$refs.listToFill.replaceCharacterInGroup(character,
                    colors, type, id);
                window.scrollTo(0, document.body.scrollHeight);
                if (this.totalCreated < this.maxCharactersInGroup && window.innerWidth < 420) {
                    setTimeout(() => {
                            window.scrollTo({top: 0, behavior: 'smooth', x: 0})
                        },
                        parseInt(charactersJson.scrollingTimeControl));
                }
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
                } else if (position <= charactersJson.nbAvatar + charactersJson.nbVulnerable) {
                    return "vulnerable"
                } else if (position <= charactersJson.nbAvatar + charactersJson.nbVulnerable + charactersJson.nbCommunity) {
                    return "comm";
                }
            },


            /**
             * ---> Go to the animation Page. Send the current language and the character groupList
             * @param none
             * @return none
             */
            loadAnimationView() {
                let groupCharacter = this.$refs.listToFill.getCharacterList();
                this.calculateTotalTime();
                this.$router.push({
                    name: 'Animation',
                    params: {
                        group: groupCharacter,
                        totalTime: [this.totalTime],
                    }
                });
                localStorage.setItem("language", this.labels.currentLanguage);
            },

            /**
             * ---> Manage messages on the Home page based on the character group number created
             * @param none
             * @return none
             */
            manageCharacterCount() {
                if (this.totalCreated < charactersJson.nbAvatar + charactersJson.nbVulnerable) {
                    this.step++;
                } else if (this.totalCreated < charactersJson.nbAvatar + charactersJson.nbVulnerable + charactersJson.nbCommunity && this.step < this.labels.stepsMakingAvatar.length - 1) {
                    this.step++;
                }
            },


            /**
             * ---> Change the language of the Application
             * @param none
             * @return none
             */
            changeLanguage() {
                if (this.isLanguageChanged)
                    this.labels = textsEng;
                else
                    this.labels = textsFr;
                this.isLanguageChanged = !this.isLanguageChanged;
                this.$forceUpdate();
            },

            /**
             * ---> ---------  completed soon -------
             * @param none
             * @return none
             */
            setDebugMode() {
                if (this.$route.query.debug === "true") {
                    this.debugMode = true;
                }
            },

            /**
             * ---> Check if the language in query is en and change the language to english it's that the case
             * @return none
             */
            setLanguage() {
                if (localStorage.getItem("language") === "en") {
                    this.changeLanguage()
                }
            },

            /**
             * ---> Check if the language in query is en and change the language to english it's that the case
             * @return none
             */
            setReplaceCharacterMode(mode) {
                this.replaceCharacterMode = !mode;
                this.$refs.listToFill.changeCharacterReplaceMode(mode);
            },

        },


            /**
             * ---> Load json data and labels
             * @param none
             * @return none
             */
            created() {
                this.characterList = charactersJson.characters;
                this.labels = textsFr;
                this.maxCharactersInGroup = charactersJson.nbAvatar + charactersJson.nbVulnerable + charactersJson.nbCommunity;
                this.contextualInfo = this.labels.contextualInfoAvatar;
                this.facialHairList = facialHairJson.beards;
                this.skinColors = charactersJson.skinColors;
                this.hairColors = charactersJson.hairColors;
                this.defaultCharacterColors = charactersJson.defaultColors;
                this.nbAvatar = charactersJson.nbAvatar;
                this.nbrVulnerable = charactersJson.nbVulnerable;
                this.nbrCommunity = charactersJson.nbCommunity;
                this.maxColorTile =  charactersJson.maxColorTile;
            },

            mounted() {
                let html = document.querySelector("html");
                html.style = "background-color: #FFFFFF !important";
                this.setDebugMode();
                this.setLanguage()
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
    html {
        overflow-y: hidden !important;
    }
    .container {
        margin-top: 50px;
    }

    .instructions-block {
        margin: 15px 0px;
    }

    @media screen and (min-width:300px) {
        .instructions-block {
            margin: auto;

        }
    }

    @media screen and (min-width:697px) {
        .instructions-block {
            margin: auto 200px;
        }
    }
    @media screen and (min-width:420px) {
        .page-instruction {
            margin-top: 8px;
            font-family: Roboto;
            font-weight: bold;
            font-size: 24px;
        }
        #selectLanguage {
            position: absolute;
            right: 0px;
            top: 0px;
            margin-top: 20px;
            margin-right: 20px;
        }
    }

    h1 {
        font-size: 2rem;
        font-weight: bold;
        margin: 10px;
    }
    h2 {
        font-size: 1.3rem;
        font-weight: bold;
        margin: 2rem 0 1rem;
    }
    p {
        margin: 10px 0;
    }
    .tool {
        margin: 10px;
        display: flex;
        justify-content: center;
    }

    p#contextualInfo {
        margin: 1rem;
        font-size: 1.1rem;
    }

    button#continue {
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        line-height: 28px;
        text-align: center;
        color: #043213;
        width: 289px;
        height: 61px;
        box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        font-size: 17px;
        position: relative;
        margin: 16px auto;
    }

    button#continue:active {
        top: 4px;
        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.25);
    }

    button#continue:focus {outline:0;}


    #selectLanguage {
        color: #0000EE;
        background-color: #FFF;
        border: 1px solid #0000EE;
        font-family: Roboto;
        font-weight: bold;
        font-size: 14px;
        width: 120px;
        height: 34px;
        border-radius: 15px;
    }
</style>
