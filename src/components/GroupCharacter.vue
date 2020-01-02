<template>
    <div class="groups-banner">
        <div class="grid-category">
            <div v-bind:key="index" v-for="(category, index) in this.labels.categories" class="fit-content">
                <div style="display: flex; justify-content: center;">
                    <div :key="character.id" v-for="(character) in characterList">
                        <div class="grid-list-character" v-if="character.characterType === isCharacterType[index]">
                            <div v-if="character.file === ''" style="width: 64px; height: 50px;"></div>
                            <Character style="margin: 10px 5px;" :disabled="false" :ref="character.id"  :is-name="true" :size="{width: '64px', height: '70px'}"
                                       :edit="characterMode" :customised="true" :colors="character.colors" :id="character.id"
                                       :group="true"
                                       :svgFile="character.file ? require(`../assets/characters/${character.file}`) : ''" />
                        </div>
                    </div>
                </div>
<!--                <div v-if="isCharacterType[index]" class="line">-->
<!--                    <div class="position-text-category">{{category}}</div>-->
<!--                </div>-->
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
                characterMode: true
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
            nbCommnunity: Number
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
                this.characterList.splice(this.position, 1, {id: character.id + Date.now() + "_customised",
                    file: character.file, colors: characterColors, characterType: type});
                this.position++;
            },


            replaceCharacterInGroup(character, characterColors, type, id) {
                const index = this.characterList.findIndex((characterObj) => characterObj.id === id);
                const newCharacterId = character.id + Date.now() + "_customised";
                if (index !== -1) {
                    this.characterList.splice(index, 1, {id: newCharacterId, file: character.file, colors: characterColors, characterType: type});
                }
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
                        this.$parent.launchEditModal(obj, index);
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
        }
    }
</script>

<style scoped>
    .fit-content {
        width:fit-content;
        height:fit-content;
    }
    .position-text-category {
        margin-bottom: 5px;
        font-size: 15px;
        color: #848484;
    }
    .grid-list-character {
        display: grid;
        grid-gap: 20px;
    }
    .grid-category {
        display: grid;
        cursor: pointer;
        grid-template-columns: auto auto auto;
        grid-gap: 30px;
    }


    .groups-banner {
        padding-left: 16px;
        padding-right: 16px;
        margin: 30px;
        display: flex;
        justify-content: center;
        background: #E4EDEE;
        border: 2px dashed #888888;
        box-sizing: border-box;
        border-radius: 10px;
    }
    @media only screen and (max-width: 500px) {
        .fit-content {
            width:fit-content;
            height:fit-content;
            display: inline;
        }
        .grid-category {
            display: inline;;
        }
    }
</style>
