<template>
    <div>
        <progress v-if="!isCharactersListLoaded" class="progress is-large is-info" max="100"></progress>
        <div v-for="(character) in this.characterList" :key="character.id">
            <Character :size="{width: '70px', height: '95px'}" :customised="false" :edit="true" ref="character" :id="character.id" :svgFile="require(`../assets/characters/${character.file}`)"/>
        </div>
    </div>
</template>

<script>
import Character from './Character.vue'

export default {
    name: "CharacterList",
    data() {
        return {
            characterList: [],
            isCharactersListLoaded: false,
        }
    },
    components: {
        Character,
    },
    props: {
        characters: Array
    },
    methods: {
        // METHOD DESCRIPTION
        launchModal(id) {
            this.characterList.filter(obj => {
                if (obj.id === id) {
                    this.$parent.launch(obj);
                }
            });
        },

        // METHOD DESCRIPTION
        getCharacterListSize() {
            return this.characterList.length;
        }
    },
    mounted() {
        this.characterList = this.characters;
        this.isCharactersListLoaded = true;
    }
}
</script>

<style scoped>

</style>
