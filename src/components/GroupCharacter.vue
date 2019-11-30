<template>
    <div class="grid-category">
        <div v-bind:key="index" v-for="(category, index) in this.labels.categories" class="fit-content">
            <div style="display: flex; justify-content: center;">
                <div :key="character.id" v-for="(character) in characterList" >
                    <div class="grid-list-character" v-if="character.characterType === isCharacterType[index]">
                        <Character :disabled="false" ref="character"  :is-name="true" :size="{width: '74px', height: '80px'}"
                                   :edit="true" :customised="true" :colors="character.colors" :id="character.id"
                                   :svgFile="require(`../assets/characters/${character.file}`)" />
                    </div>
                </div>
            </div>
            <div v-if="isCharacterType[index]" class="line">
                <div class="position-text-category">{{category}}</div>
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
                characterList: [],
                isCharacterType: [],
                characterSize: {
                    width: "70px",
                    height: "95px",
                    border: "5px"
                },
            }
        },
        components: {
            Character
        },
        props: {
            labels: Object,
            disableGroupCharacter : Boolean
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
                this.setCharacterCategory(type);
                this.characterList.push({id: character.id + this.characterList.length + "_customised",
                    file: character.file, colors: characterColors, characterType: type});
            },

            /**
             * ---> Edit character attributes
             * @param {Object} character
             * @param {Object} characterColors
             * @param {String} type
             * @return none
             */
            editCharacter(character, characterColors, type) {
                this.characterList.map((obj, index) => {
                    if (obj.id === character.id) {
                        this.characterList.splice(index, 1, {id: character.id,
                            file: character.file, colors: characterColors, characterType: type});
                        this.$refs.character[index].editCharacterColors(characterColors);
                        console.log("characterColors", characterColors);
                    }
                });
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
                return this.characterList.length;
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
    }
</script>

<style scoped>
    .fit-content {
        width:fit-content;
        height:fit-content;
    }
    .position-text-category {
        margin-top: 1vh;
        font-size: 15px;
        color: #848484;
    }
    .grid-list-character {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(55px, 1fr) );
        grid-gap: 20px;
    }
    .grid-category {
        display: grid;
        cursor: pointer;
        grid-template-columns: auto auto auto;
        grid-gap: 30px;
    }
    .line {
        justify-self: center;
        border-top: 0.10rem solid #848484;
        margin-bottom: 30px;
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
