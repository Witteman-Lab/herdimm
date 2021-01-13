<template>
    <div class="groups-banner">
        <div v-if="!isMobile" class="grid-category">
            <div v-bind:key="index"
                 v-for="(category, index) in this.labels.categories" class="fit-content" :style="index === 1 ? 'margin-left: 35px;' : ''">
                <div style="display: flex; justify-content: center;">
                    <div style="z-index: 2; " :key="character.id" v-for="(character) in characterList">
                        <div :content="index"
                                class="grid-list-character" v-if="character.characterType === isCharacterType[index]">
                            <div class="cercle-avatar" v-if="character.characterType === 'avatar'" v-html="require(`../assets/images/cercle-avatar.svg`)"></div>
                            <div v-if="character.file === ''" style="width: 64px; height: 50px;"></div>
                            <Character style="margin: 10px 5px;" :disabled="false" :ref="character.id"  :is-name="true" :size="{width: '64px', height: '70px'}"
                                       :edit="characterMode" :customised="true" :colors="character.colors" :id="character.id"
                                       :group="true"
                                       :svgFile="character.file ? require(`../assets/characters/${character.file}`) : ''"
                                       :launchModal="launchModal"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div v-if="isMobile" class="grid-category">
            <div class="fit-content">
                    <div style="z-index: 2;" :key="character.id" v-for="(character) in characterList">
                        <div class="grid-list-character">
                            <div  v-if="character.file === ''" style="width: 64px; height: 50px;"></div>
                            <Character  style="margin: 10px 5px;" :disabled="false" :ref="character.id"  :is-name="true" :size="{width: '64px', height: '70px'}"
                                       :edit="characterMode" :customised="true" :colors="character.colors" :id="character.id"
                                       :group="true"
                                       :svgFile="character.file ? require(`../assets/characters/${character.file}`) : ''"
                                        :launchModal="launchModal"/>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
    import Character from './Character.vue'

    export default {
        name: "GroupCharacter",
        data() {
            return {
                position: 0,
                characterList: [],
                isCharacterType: [],
                characterSize: {
                    width: "70px",
                    height: "95px",
                    border: "5px"
                },
                characterMode: true,
                isMobile: false
            }
        },
        components: {
            Character
        },
        props: {
            labels: Object,
            disableGroupCharacter : Boolean,
            nbAvatar: Number,
            nbVulnerable: Number,
            nbCommnunity: Number,
            launchEditModal: Function
        },
        methods: {
            setCharacterCategory(type) {
                if (type === "avatar")  this.isCharacterType[0] = type;
                else if (type === "vulnerable")  this.isCharacterType[1] = type;
                else if (type === "comm")  this.isCharacterType[2] = type;
            },
            /**
             * ---> Add a character with its attributes to the group list
             * @param {Object} character
             * @param {Object} characterColors
             * @param {String} type
             * @return none
             */
            addCharacterToGroup(character, characterColors, type) {
                let id = character.id + Date.now() + "_customised";
                this.characterList.splice(this.position, 1, {id, file: character.file, colors: characterColors, characterType: type});
                this.position++;
                this.changeBannerColor();
            },

            changeBannerColor() {
                if (this.position > this.characterList.length - 1) {
                    setTimeout(() => {
                        const groupBanner = document.getElementById("groupCharacter");
                        if (window.innerWidth > 768) {
                            const circleAvatar = document.getElementById("circle-avatar");
                            circleAvatar.setAttribute("stroke", "#05CDC1");
                            circleAvatar.setAttribute("stroke-width", 4);
                        }
                        groupBanner.style = "border: 4px solid #05CDC1;";
                    }, 50);
                }
            },


            replaceCharacterInGroup(character, characterColors, type, id) {
                const index = this.characterList.findIndex((characterObj) => characterObj.id === id);
                const newCharacterId = character.id + Date.now() + "_customised";
                if (index !== -1) {
                    this.characterList.splice(index, 1, {id: newCharacterId, file: character.file, colors: characterColors, characterType: type});
                }
                this.changeBannerColor();
            },


            /**
             * ---> Edit character attributes
             * @param {Object} character
             * @param {Object} characterColors
             * @param {String} type
             * @return none
             */
            editCharacter(character, characterColors, type) {
                const index = this.characterList.findIndex((characterObj) => characterObj.id === character.id);
                if (index !== -1) {
                    this.characterList.splice(index, 1, {id: character.id, file: character.file, colors: characterColors, characterType: type});
                    this.$refs[character.id][0].editCharacterColors(characterColors);
                }
            },

            /**
             * ---> Search the character object with the id given and launch edit modal with the character
             * @param {String} id
             * @return none
             */
            launchModal(id) {
                this.characterList.filter((obj, index) => {
                    if (obj.id === id) {
                        this.launchEditModal(obj, index);
                    }
                });
            },

            changeCharacterReplaceMode(mode) {
                this.characterMode = mode;
            },

            /**
             * ---> Set a list of characters
             * @param {Array} characters
             * @return none
             */
            addGroup(characters) {
                this.characterList = characters;
            },
            /**
             * ---> -------------------
             * @param none
             * @return none
             */
            removeSpecificGroupOfCharacter(value){
                let characterListCopy = this.characterList.splice(0, value);
                this.characterList = [];
                this.characterList = characterListCopy;
                const maxCharacters = this.nbAvatar + this.nbVulnerable + this.nbCommnunity;
                for (let i = value; i < maxCharacters; i++) {
                    let type = "";
                    if (i < this.nbAvatar) {
                        type = "avatar";
                    } else if (i < this.nbAvatar + this.nbVulnerable) {
                        type = "vulnerable"
                    } else if (i < this.nbAvatar + this.nbVulnerable + this.nbCommnunity) {
                        type = "comm";
                    }
                    this.setCharacterCategory(type);
                    this.characterList.push({characterType: type, file: "", colors: {}, id: type + i})
                }
                this.position = value;
                this.isScreenMobile();

            },
            /**
             * ---> -------------------
             * @param none
             * @return none
             */
            removeAllCharacters() {
                this.characterList = [];
                const maxCharacters = this.nbAvatar + this.nbVulnerable + this.nbCommnunity;
                for (let i = 0; i < maxCharacters; i++) {
                    let type = "";
                    if (i < this.nbAvatar) {
                        type = "avatar";
                    } else if (i < this.nbAvatar + this.nbVulnerable) {
                        type = "vulnerable"
                    } else if (i < this.nbAvatar + this.nbVulnerable + this.nbCommnunity) {
                        type = "comm";
                    }
                    this.setCharacterCategory(type);
                    this.characterList.push({characterType: type, file: "", colors: {}, id: type + i})
                }
                this.position = 0;
                this.isScreenMobile();
            },

            /**
             * ---> Get the current number of character in the group to manage "Go to the animation" button
             * @param none
             * @return {Number} characters number
             */
            getCharacterListSize() {
                return this.position;
            },

            /**
             * ---> Get the character list in order send it to the animation page
             * @param none
             * @return {Array} character list
             */
            getCharacterList() {
                return this.characterList;
            },

            isScreenMobile() {
                this.isMobile = window.innerWidth <= 768;
                this.changeBannerColor();
                return this.isMobile;
            }
        },
        mounted() {
            const maxCharacters = this.nbAvatar + this.nbVulnerable + this.nbCommnunity;
            for (let i = 0; i < maxCharacters; i++) {
                let type = "";
                if (i < this.nbAvatar) {
                    type = "avatar";
                } else if (i < this.nbAvatar + this.nbVulnerable) {
                    type = "vulnerable"
                } else if (i < this.nbAvatar + this.nbVulnerable + this.nbCommnunity) {
                    type = "comm";
                }
                this.setCharacterCategory(type);
                this.characterList.push({characterType: type, file: "", colors: {}, id: type + i})
            }
            this.isScreenMobile();
            window.addEventListener('resize', this.isScreenMobile);
        }
    }
</script>

<style scoped>
    .fit-content {
        width:fit-content;
        height:fit-content;
    }

    .cercle-avatar {
        position: absolute;
        z-index: -1;
        top: -20px;
        left: -39px;
    }
    .position-text-category {
        margin-bottom: 5px;
        font-size: 15px;
        color: #848484;
    }
    .grid-list-character {
        display: grid;
        position: relative;
        grid-gap: 20px;
    }
    .grid-category {
        display: grid;
        cursor: pointer;
        grid-template-columns: auto auto auto;
        grid-gap: 30px;
    }
    .groups-banner {
        padding-right: 16px;
        margin: 30px;
        display: flex;
        justify-content: center;
        background: #E4EDEE;
        border: 2px dashed #888888;
        box-sizing: border-box;
        border-radius: 10px;
    }
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        .fit-content {
            width:fit-content;
            height:fit-content;
            grid-template-columns: auto auto auto;
            grid-column-gap: 20px;
            display: grid;
        }
        .grid-category {
            display: inline;
        }
        .groups-banner {
            padding-bottom: 16px;
            padding-left: 16px;
        }

        .cercle-avatar {
            top: -43px;
            left: -60px;
        }
    }
</style>
