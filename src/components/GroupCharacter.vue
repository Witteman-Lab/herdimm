<template>
    <div>
        <div v-for="(character) in characterList" :key="character.id">
            <Character ref="character" :id="character.id" :svgFile="require(`../assets/characters/${character.file}`)" />
        </div>
    </div>
</template>

<script>
    import Character from './Character.vue'

    export default {
        name: "GroupCharacter",
        data() {
            return {
                characterList: []
            }
        },
        components: {
            Character
        },
        methods: {
            addCharacterToList(character) {
                this.characterList.push({id: this.characterList.length + 1, file: character.file, type: character.type});
            },
            editCharacterToList(pos) {
                this.characterList.splice(pos, 1);
            },
            deleteCharacterToList(pos) {
                this.characterList.splice(pos, 1)
            },
            launchModal(id) {
               // TODO Manage Character Edition with a new modal
                console.log("Nothing happen here.");
                // this.$parent.launch(this.characterList[id]);
            },
            getCharacterListSize() {
                return this.characterList.length;
            }
        },
    }
</script>

<style scoped>

</style>