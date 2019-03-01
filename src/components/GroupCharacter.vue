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
        props: {
            characters: Array
        },
        methods: {
            addCharacterToList(character) {
                character.id = this.characterList.length;
                this.characterList.push(character);
            },
            editCharacterToList(pos) {
                character.id = this.characterList.length;
                this.characterList.splice(pos, 1);
            },
            deleteCharacterToList(pos) {
                character.id = this.characterList.length;
                this.characterList.splice(pos, 1)
            },
            launchModal(id) {
               // TODO Edit to have a new modal
                // this.$parent.launch(this.characterList[id]);
            },
            getCharacterListSize() {
                return this.characterList.length;
            }
        },
        mounted() {
            this.characterList = this.characters;
        }
    }
</script>

<style scoped>

</style>