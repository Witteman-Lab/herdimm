<template>
    <div>
        <div v-for="(character) in this.characterList" :key="character.id">
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
        addCharacterToList(character) {
            character.id = this.characterList.length;
            this.characterList.push(character);
        },
        launchModal(id) {
            this.characterList.filter(obj => {
                if (obj.id === id) {
                    this.$parent.launch(obj);
                }
            });
        },
        getCharacterListSize() {
            return this.characterList.length;
        }
    },
    mounted() {
        this.characterList = this.characters;
        console.log()
    }
}
</script>

<style scoped>

</style>
