<template>
    <div>
        <div v-for="(character) in characterList" ref="characterList" :key="character.id">
            <Character ref="character" :size="this.characterSize" :edit="true" :customised="true" :colors="character.colors" :id="character.id" :svgFile="require(`../assets/characters/${character.file}`)" />
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
                    height: "95px"
                }
            }
        },
        components: {
            Character
        },
        methods: {
            addCharacterToGroup(character, characterColors, type) {
                this.characterList.push({id: character.id + this.characterList.length + "_customised",
                    file: character.file, type: character.type, colors: characterColors, characterType: type});
            },
            editCharacter(character, characterColors, type) {
                this.characterList.map((obj, index) => {
                    if (obj.id === character.id) {
                        this.characterList.splice(index, 1, {id: character.id,
                            file: character.file, type: character.type, colors: characterColors, characterType: type});
                        this.$refs.character[index].editCharacterColors(characterColors);
                    }
                });
            },
            launchModal(id) {
                this.characterList.filter((obj, index) => {
                    if (obj.id === id) {
                        this.$parent.launchEditModal(obj, index);
                    }
                });
            },
            getCharacterListSize() {
                return this.characterList.length;
            },
            getCharacterList() {
                return this.characterList;
            },
            addGroup(characters) {
                this.characterList = characters;
            }
        },
    }
</script>

<style scoped>

</style>
