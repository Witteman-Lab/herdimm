<template>
    <div>
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
    }
}
</script>

<style scoped>

</style>
