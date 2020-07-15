<template>
    <div class="grid-list-character">
        <progress v-if="!isCharactersListLoaded" class="progress is-large is-info" max="100"></progress>
        <div v-for="(character) in this.characterList" :key="character.id">
            <Character  :size="{width: '74px', height: '80px'}" :customised="true" :edit="true" ref="character"
                       :id="character.id" :svgFile="require(`../assets/characters/${character.file}`)"
                       :colors="{face: defaultCharacterColors.SkinColor,
                                 hairFront: defaultCharacterColors.HairColor,
                                 shirt: defaultCharacterColors.ShirtColorCharacters,
                                 accessoriesColor: defaultCharacterColors.AccessoriesColor}"
                        :launch-modal="launchModal"/>
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
        characters: Array,
        defaultCharacterColors: Object,
        launch: Function
    },
    methods: {
        /**
         * ---> Search the character object with the id given and launch create modal with the character
         * @param {String} id
         * @return none
         */
        launchModal(id) {
            this.characterList.filter(obj => {
                if (obj.id === id) {
                    this.launch(obj);
                }
            });
        },
    },
    mounted() {
        this.characterList = this.characters;
        this.isCharactersListLoaded = true;
    }
}
</script>

<style scoped>
.grid-list-character {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(55px, 1fr) );
    grid-gap: 20px;
}
</style>
