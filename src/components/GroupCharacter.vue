<template>
    <div class="grid-category">
        <div class="fit-content">
            <div style="display: flex; justify-content: center;">
                <div v-for="(character) in characterList" ref="characterList" :key="character.id">
                    <div class="grid-list-character" v-if="character.characterType === 'avatar'">
                        <Character ref="character"  :is-name="true" :size="{width: '74px', height: '80px'}"
                                   :edit="true" :customised="true" :colors="character.colors" :id="character.id"
                                   :svgFile="require(`../assets/characters/${character.file}`)" />
                    </div>
                </div>
            </div>
            <div class="line"><div class="position-text-category">{{this.labels.categories[0]}}</div></div>
        </div>
        <div class="fit-content">
            <div style="display: flex; justify-content: center;">
                <div v-for="(character) in characterList" ref="characterList" :key="character.id">
                    <div class="grid-list-character" v-if="character.characterType === 'vulnerable'">
                        <Character ref="character"  :is-name="true" :size="{width: '74px', height: '80px'}"
                                   :edit="true" :customised="true" :colors="character.colors" :id="character.id"
                                   :svgFile="require(`../assets/characters/${character.file}`)" />
                    </div>
                </div>
            </div>
            <div class="line"><div class="position-text-category">{{this.labels.categories[1]}}</div></div>
        </div>
        <div class="fit-content">
            <div style="display: flex; justify-content: center;">
                <div v-for="(character) in characterList" ref="characterList" :key="character.id">
                    <div class="grid-list-character" v-if="character.characterType === 'comm'">
                        <Character ref="character"  :is-name="true" :size="{width: '74px', height: '80px'}"
                                   :edit="true" :customised="true" :colors="character.colors" :id="character.id"
                                   :svgFile="require(`../assets/characters/${character.file}`)" />
                    </div>
                </div>
            </div>
            <div class="line"><div class="position-text-category">{{this.labels.categories[2]}}</div></div>
        </div>
    </div>
</template>

<!--
v-for="(character) in characterList" ref="characterList" :key="character.id"
<div class="grid-list-character">
                    <Character ref="character"  :is-name="true" :size="{width: '74px', height: '80px'}"
                               :edit="true" :customised="true" :colors="character.colors" :id="character.id"
                               :svgFile="require(`../assets/characters/${character.file}`)" />
                    <div class="line">Test</div>
                </div>-->

<script>
    import Character from './Character.vue'

    export default {
        name: "GroupCharacter",
        data() {
            return {
                characterList: [],
                characterSize: {
                    width: "70px",
                    height: "95px",
                    border: "5px"
                }
            }
        },
        components: {
            Character
        },
        props: {
          labels: Object
        },
        methods: {
            /**
             * ---> Add a character with its attributes to the group list
             * @param {Object} character
             * @param {Object} characterColors
             * @param {String} type
             * @return none
             */
            addCharacterToGroup(character, characterColors, type) {
                console.log(type);
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
        grid-gap: 10px;
    }
    .line {
        justify-self: center;
        border-top: 0.10rem solid #848484;
    }
</style>
