<template>
    <div id="app">
        <div class="is-centered is-half-desktop is-half-mobile">
            <div class="modal" v-bind:class="{'is-active': isActive }" >
                <div class="modal-background">
                    <div class="modal-card">
                        <div class="modal-card">
                            <header class="modal-card-head">
                                <p class="modal-card-title">Create your avatar</p>
                                <button class="delete" aria-label="close" v-on:click="removeModal"></button>
                            </header>
                            <section class="modal-card-body">
                                <Character  ref="character" :svgFile="this.currentCharacter" :color="this.currentColor" />
                                <br/>
                                <div style="display: flex; justify-content: center">
                                    <slider-picker :value="this.currentColor" @input="this.updateValue"/>
                                </div>
                                <br/>
                                <div class="buttons is-light is-centered">
                                    <span class="button"  v-on:click="this.resetFaceColor">Reset Color</span>
                                    <span class="button"  v-on:click="this.changeFaceColor">Change Face Color</span>
                                    <span class="button"  v-on:click="this.changeHairColor">Change Hair Color</span>
                                </div>
                            </section>
                            <footer class="modal-card-foot">
                                <button class="button is-success" v-on:click="saveCharacter">Save</button>
                                <button class="button" v-on:click="removeModal">Cancel</button>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
            <h1>Build your group</h1>
            <div class="Avatar">
                <div class="column is-flex-mobile  is-center is-four-fifths " >
                    <div style="cursor: pointer">
                        <div>
                            <CharacterList ref="listAvailable" :characters="this.characterList"></CharacterList>
                        </div>
                    </div>
                </div>
            </div>
            <h1>Your Group</h1>
            <div class="Avatar">
                <div class="column is-four-fifths" >
                    <div style="cursor: pointer">
                        <div v-on:click="launch">
                            <GroupCharacter :characters="[]" ref="listToFill"></GroupCharacter>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="button is-success" v-if="this.isVisible" v-on:click="loadAnimationView">Continue</div>
    </div>
</template>

<script>
    import Character from './components/Character.vue'
    import { Slider } from 'vue-color';
    import CharacterList from "./components/CharacterList";
    import json from './assets/characters.json';
    import GroupCharacter from "./components/GroupCharacter";

    export default {
        name: 'app',
        components: {
            GroupCharacter,
            CharacterList,
            Character,
            'slider-picker': Slider,
        },
        data() {
            return {
                isActive: false,
                isVisible: false,
                currentColor: '#FFFFFF',
                currentCharacter: "",
                currentCharacterObject: "",
                characterList: []
            };
        },
        methods: {
            updateValue(color) {
                this.currentColor = color.hex;
            },
            changeFaceColor() {
                this.$refs.character.changeFaceColor("#000000");
            },
            changeHairColor() {
                this.$refs.character.changeHairColor();
            },
            resetFaceColor() {
                this.$refs.character.resetFaceColor();
            },
            launch(character) {
                if (this.$refs.listToFill.getCharacterListSize() < json.maxCharactersInGroup)  {
                    this.currentCharacter = require(`./assets/characters/${character.file}`);
                    this.currentCharacterObject = character;
                    this.isActive = true;
                    this.$refs.character.$forceUpdate();
                }
            },
            removeModal() {
                this.isActive = false;
            },
            saveCharacter() {
                this.$refs.listToFill.addCharacterToList(this.currentCharacterObject);
                this.removeModal();
                if (this.$refs.listToFill.getCharacterListSize() === json.maxCharactersInGroup) {
                    this.isVisible = true;
                }
            },
            loadAnimationView() {
                //TODO switch view to view animation
                //console.log("load next view Animation")
            }
        },
        created() {
            this.characterList = json.characters;
        }
    }
</script>

<style>
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
</style>
