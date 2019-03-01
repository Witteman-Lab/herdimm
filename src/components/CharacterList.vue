<template>
    <div>
        <div v-for="(character) in characterList" :key="character.id">
          <Character ref="character" :id="character.id" :svgFile="require(`../assets/characters/${character.file}`)" :color="''" />
        </div>
    </div>
</template>

<script>
    import Character from './Character.vue'

    export default {
        name: "CharacterList",
        data() {
            return {
                characterList: []
            }
        },
        components: {
            Character,
        },
        props: {
            characters: Array
        },
        methods: {
            launchModal(id) {
                this.$parent.launch(this.characterList[id]);
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
