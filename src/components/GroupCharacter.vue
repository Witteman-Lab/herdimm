<template>
    <div>
        <div v-for="(character) in characterList" :key="character.id">
            <Character ref="character" :customised="true" :colors="character.colors" :id="character.id" :svgFile="require(`../assets/characters/${character.file}`)" />
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
            }
        },
        components: {
            Character
        },
        methods: {
            addCharacterToGroup(character, characterColors) {
                this.characterList.push({id: character.id, file: character.file, type: character.type, colors: characterColors});
            },
            editCharacter(pos) {
                this.characterList.splice(pos, 1);
            },
            launchModal() {
               // TODO Manage Character Edition with a new modal
                // implement launchModal(id)
                // /console.log("Nothing happen here."  + id);
            },
            getCharacterListSize() {
                return this.characterList.length;
            }
        },
    }
</script>

<style scoped>

</style>