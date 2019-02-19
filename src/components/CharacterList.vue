<template>
    <div>
        <div v-for="(character) in characterList" :key="character.id">
            <Character  ref="character" :svgFile="require(`../assets/characters/${character.file}`)" :color="''" />
        </div>
    </div>
</template>

<script>
    import json from '../assets/characters.json';
    import Character from '../components/Character.vue'

    export default {
        name: "CharacterList",
        date() {
            return {
                characterList: []
            }
        },
        components: {
            Character,
        },
        methods: {
           addCharacterToList() {
               this.characterList.push('test');
               // a faire pour mercredi
               // potentiellement ajouter dans le json les couleurs ?

           }
        },
        created() {
            this.characterList = json.characters;
        }
    }
</script>

<style scoped>

</style>
