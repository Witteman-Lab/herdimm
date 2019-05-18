<template>
    <div class="grid-list-character">
        <div v-for="(character) in characterList" ref="characterList" :key="character.id">
            <Character ref="character"  :size="{width: '74px', height: '80px'}" :edit="true" :customised="true" :colors="character.colors" :id="character.id" :svgFile="require(`../assets/characters/${character.file}`)" />
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
        methods: {
            // METHOD DESCRIPTION
            addCharacterToGroup(character, characterColors, type) {
                this.characterList.push({id: character.id + this.characterList.length + "_customised",
                    file: character.file, colors: characterColors, characterType: type});
            },

            // METHOD DESCRIPTION
            editCharacter(character, characterColors, type) {
                this.characterList.map((obj, index) => {
                    if (obj.id === character.id) {
                        this.characterList.splice(index, 1, {id: character.id,
                            file: character.file, colors: characterColors, characterType: type});
                        this.$refs.character[index].editCharacterColors(characterColors);
                    }
                });
            },

            // METHOD DESCRIPTION
            launchModal(id) {
                this.characterList.filter((obj, index) => {
                    if (obj.id === id) {
                        this.$parent.launchEditModal(obj, index);
                    }
                });
            },

            // METHOD DESCRIPTION
            addGroup(characters) {
                this.characterList = characters;
            },

            // METHOD DESCRIPTION
            getCharacterListSize() {
                return this.characterList.length;
            },

            // METHOD DESCRIPTION
            getCharacterList() {
                return this.characterList;
            }
        },
    }
</script>

<style scoped>
    .test{
        /*border: 2px solid black;*/
    }
    .grid-list-character {
        display: grid;
        grid-template-columns: repeat( auto-fit, minmax(55px, 1fr) );
    }
</style>
