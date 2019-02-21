<template>
    <div>
        <div v-for="(character) in this.characterList" :key="character.id">
          <Character ref="character" :id="character.id" :svgFile="require(`../assets/characters/${character.file}`)" :color="''" />
        </div>
    </div>
</template>

<script>
    import Character from '../components/Character.vue'

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
           addCharacterToList(character) {
               character.id = this.characterList.length;
               // TODO manage character id for update or delete
               this.characterList.push(character);
           },
            launchModal(id) {
                this.$parent.launch(this.characterList[id]);
            }
        },
        mounted() {
            this.characterList = this.characters;
        }
    }
</script>

<style scoped>

</style>
