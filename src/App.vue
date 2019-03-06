<template>
    <div id="app">
        <div class="modal" v-bind:class="{'is-active': isActive }" >
            <div class="modal-background">
                <div class="modal-card mobile-modal" >
                    <header class="modal-card-head">
                        <p class="modal-card-title">Create your avatar</p>
                        <button class="delete" aria-label="close" v-on:click="removeModal"></button>
                    </header>
                    <section class="modal-card-body">
                        <Character v-if="isActive" ref="character" :svgFile="this.currentCharacter"
                                   :colors="{face: this.currentColorFace, hairFront: this.currentColorHair}" :customised="true" />
                        <div style="display: flex; justify-content: center">
                            <div class="dropdown" v-bind:class="{'is-active': isHairColorButtonEnable }">
                                <div class="dropdown-trigger">
                                    <button v-on:click="openDropdownHair" class="button">
                                        <span>Hair Color</span>
                                        <span class="current-color" v-bind:style="{'background-color': this.currentColorHair }"></span>
                                    </button>
                                </div>
                                <div class="dropdown-menu" role="menu">
                                    <Compact
                                        :value="this.currentColorHair"
                                        @input="this.changeHairColor"
                                        :palette="[
                            				'#090806', '#2C222B', '#71635A',
                            				'#B7A69E', '#D6C4C2', '#CABFB1',
                            				'#DCD0BA', '#FFF5E1', '#E6CEA8',
                            				'#E5C8A8', '#DEBC99', '#B89778',
                            				'#A56B46', '#B55239', '#8D4A43',
                                            '#91553D', '#533D32', '#3B3024',
                                            '#554838', '#4E433F', '#504444',
                                            '#6A4E42', '#A7856A', '#977961'
                                        ]"
                                    />
                                </div>
                            </div>
                            <div class="dropdown" v-bind:class="{'is-active': isFaceColorButtonEnable }">
                                <div class="dropdown-trigger">
                                    <button v-on:click="openDropdownFace" class="button">
                                        <span>Skin Color</span>
                                        <span class="current-color" v-bind:style="{'background-color': this.currentColorFace }"></span>
                                    </button>
                                </div>
                                <div class="dropdown-menu" role="menu">
                                    <Compact
                                        :value="this.currentColorFace"
                                        @input="this.changeFaceColor"
                                        :palette="[
                            				'#FFD6C5', '#E7C1B2', '#E4BDAD',
                                            '#FFE2C9', '#E7CBB5', '#E6C8B0',
                                            '#FFCBA3', '#E8B894', '#E7B38D',
                                            '#D8905F', '#C28155', '#BE794A',
                                            '#88513A', '#7B4934', '#733E26'
                                        ]"
                                    />
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div class="buttons is-light is-centered">
                            <span class="button"  v-on:click="this.resetFaceColor">Reset Color</span>
                        </div>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button is-success" v-on:click="saveCharacter">Save</button>
                        <button class="button" v-on:click="removeModal">Cancel</button>
                    </footer>
                </div>
            </div>
        </div>
        <div class="is-centered is-half-desktop is-half-mobile">
            <h1>Build your group</h1>
            <div class="Avatar">
                <div class="column is-center is-four-fifths " >
                    <div style="cursor: pointer">
                        <div>
                            <CharacterList  ref="listAvailable" :characters="this.characterList" :id="this.currentCharacterObject.file"></CharacterList>
                        </div>
                    </div>
                </div>
            </div>
            <h1>Your Group</h1>
            <div class="Avatar">
                <div class="column is-four-fifths" >
                    <div style="cursor: pointer">
                        <div>
                            <GroupCharacter ref="listToFill"></GroupCharacter>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="button is-success" style="cursor: pointer" v-if="isVisible" v-on:click="loadAnimationView()">Continue</div>
        <router-view/>
    </div>
</template>

<script>
    import Character from './components/Character.vue'
    import { Compact } from 'vue-color';
    import CharacterList from "./components/CharacterList";
    import json from './assets/characters.json';
    import GroupCharacter from "./components/GroupCharacter";

    export default {
        name: 'app',
        components: {
            GroupCharacter,
            CharacterList,
            Character,
            Compact,
        },
        data() {
            return {
                isActive: false,
                isVisible: false,
                isHairColorButtonEnable: false,
                isFaceColorButtonEnable: false,
                currentColorHair: '#FF0000',
                currentColorFace: '#0000FF',
                currentCharacter: "",
                currentCharacterObject: "",
                characterList: [],
            };
        },
        methods: {
            changeFaceColor(color) {
                this.currentColorFace = color.hex;
                this.$refs.character.changeFaceColor(color.hex);
            },
            changeHairColor(color) {
                this.currentColorHair = color.hex;
                this.$refs.character.changeHairColor(color.hex);
            },
            resetFaceColor() {
                this.$refs.character.resetFaceColor();
            },
            launch(character) {
                if (this.$refs.listToFill.getCharacterListSize() < json.maxCharactersInGroup)  {
                    this.currentCharacter = require(`./assets/characters/${character.file}`);
                    this.currentCharacterObject = character;
                    this.currentColorFace = "#7C5235";
                    this.currentColorHair = "#412308";
                    this.isActive = true;
                }
            },
            removeModal() {
                this.isActive = false;
                this.isHairColorButtonEnable = false;
                this.isFaceColorButtonEnable = false;
            },
            saveCharacter() {
                this.$refs.listToFill.addCharacterToGroup(this.currentCharacterObject, this.$refs.character.getSvgColor());
                this.removeModal();
                if (this.$refs.listToFill.getCharacterListSize() === json.maxCharactersInGroup) {
                    this.isVisible = true;
                }
            },
            loadAnimationView() {
                this.$router.push('Animations')
            },
            openDropdownHair() {
                this.isHairColorButtonEnable = !this.isHairColorButtonEnable;
                this.isFaceColorButtonEnable = false;
            },
            openDropdownFace() {
                this.isFaceColorButtonEnable = !this.isFaceColorButtonEnable;
                this.isHairColorButtonEnable = false;
            }
        },
        created() {
            this.characterList = json.characters;
        }
    }
</script>

<style scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    .Avatar {
        display: flex;
        justify-content: center;
    }
    .mobile-modal {
        margin-top: calc(20vh - 40px);
    }
    .current-color {
        width: 20px;
        height: 20px;
        margin-left: 10px;
        border-style: solid;
    }
    @media only screen and (max-width: 768px) {
        .mobile-modal {
            margin-top: calc(20vh - 40px);
            width: auto;
        }
    }
</style>
