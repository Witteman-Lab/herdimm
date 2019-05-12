<template>
    <div class="container">
        <!-- MODAL WINDOW -->
        <Modal ref="modal" :glasses-list-json="glassesListJson" :facial-hair-list-json="facialHairList" :labels="labels"/>
        <!-- INTERFACE -->
        <div class="is-centered is-half-desktop is-half-mobile">
            <h1>{{this.labels.pageTitle}}</h1>
            <button id="selectLanguage" class="button" v-on:click="this.changeLanguage">{{this.labels.language}}</button>

            <p id="generalInfo">{{this.labels.generalInfo}}</p>
            <p id="contextualInfo">{{ contextualInfo }}</p>

            <!-- List of all the characters -->
            <div class="tool">
                <div class="column is-center is-four-fifths">
                    <!-- Not sure if it should be displayed here or in the CharacterList.vue -->
                    <!-- <progress v-if="!isCharactersListLoaded" class="progress is-large is-info" max="100"></progress> -->
                    <div style="cursor: pointer">
                        <CharacterList ref="listAvailable" :characters="this.characterList"></CharacterList>
                    </div>
                </div>
            </div>

            <h1>{{this.labels.subtitle}}</h1>

            <!-- List of the group member -->
            <div class="tool">
                <div class="column is-four-fifths">
                    <div style="cursor: pointer">
                        <GroupCharacter ref="listToFill"></GroupCharacter>
                    </div>
                </div>
            </div>
        </div>

        <!-- Button to continue to the next section (e.g. the animation) -->
        <section>
            <div class="control has-text-centered">
                <p id="finalInfo" v-if="isGroupComplete">{{this.labels.finalInfo}}</p>
                <button id="continue" class="button is-primary is-success" v-if="isGroupComplete" v-on:click="loadAnimationView()">{{this.labels.continueBtn}}</button>
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
                texts: ''
            };
        },
        props: {},
        methods: {
            // METHOD DESCRIPTION
            launch(character) {
                if (this.$refs.listToFill.getCharacterListSize() < this.maxCharactersInGroup)  {
                    this.$refs.modal.openModal(this.totalCreated, character, this.totalCreated,
                        charactersJson.nbVulnerable, charactersJson.nbAvatar, false, this.labels.createAvatar);
                }
            },

            // METHOD DESCRIPTION
            launchEditModal(character, index) {
                this.$refs.modal.openModal(index, character, this.totalCreated,
                    charactersJson.nbVulnerable, charactersJson.nbAvatar, true,  this.labels.editAvatar);
            },

            // METHOD DESCRIPTION
            saveCharacter(character, colors) {
                this.totalCreated++;
                this.manageCharacterCount();
                this.$refs.listToFill.addCharacterToGroup(character,
                    colors, this.getCurrentCharacterType(this.totalCreated));
                if (this.$refs.listToFill.getCharacterListSize() === this.maxCharactersInGroup) {
                    this.isGroupComplete = true;
                }
            },

            // METHOD DESCRIPTION
            editCharacter(character, colors) {
                this.$refs.listToFill.editCharacter(character,
                    colors, character.characterType);
            },

            // METHOD DESCRIPTION
            getCurrentCharacterType(position) {
                if (position <= charactersJson.nbAvatar) {
                    return "avatar";
                } else if (position <= charactersJson.nbAvatar + charactersJson.nbVulnerable)   {
                    return "vulnerable"
                } else if (position <= charactersJson.nbAvatar + charactersJson.nbVulnerable + charactersJson.nbCommunity) {
                    return "comm";
                }
            },

            // METHOD DESCRIPTION
            loadAnimationView() {
                let groupCharacter = this.$refs.listToFill.getCharacterList();
                this.$router.push({name: 'Animation', params:{group: groupCharacter}});
            },

            // METHOD DESCRIPTION
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
        created() {
            this.characterList = charactersJson.characters;
            this.labels = textsEng;
            this.maxCharactersInGroup = charactersJson.nbAvatar + charactersJson.nbVulnerable + charactersJson.nbCommunity;
            this.contextualInfo = this.labels.contextualInfoAvatar;
            this.facialHairList = facialHairJson.beards;
            this.glassesListJson = glassesJson.glasses;
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
    button#continue, p#contextualInfo, p#finalInfo {
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
