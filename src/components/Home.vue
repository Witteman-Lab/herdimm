<template>
    <div class="container">
        <div class="modal" v-bind:class="{'is-active': isActive }">
            <div class="modal-background">
                <div class="modal-card mobile-modal">
                    <header class="modal-card-head">
                        <p class="modal-card-title">{{ modalTitle }}</p>
                        <button class="delete" aria-label="close" v-on:click="removeModal"></button>
                    </header>
                    <section class="modal-card-body">
                        <Character v-if="isActive" ref="character" :id="'current'" :svgFile="this.currentCharacter"
                                   :colors="{face: this.currentColorFace, hairFront: this.currentColorHair}" :customised="true" />
                        <div style="display: flex; justify-content: center">
                            <div v-if="this.isAdult" class="dropdown" v-bind:class="{'is-active': isBeardsButtonEnable }">
                                <div class="dropdown-trigger">
                                    <button v-on:click="openDropdownBeards" class="button">
                                        <span>Beards</span>
                                    </button>
                                </div>
                                <div class="dropdown-menu" role="menu">
                                    <div class="dropdown-content">
                                        <a v-bind:key="beard" v-for="(beard, index) in beardsList" class="dropdown-item" v-on:click="selectBeards(index)">{{beard}}</a>
                                    </div>
                                </div>
                            </div>
                            <div  v-if="this.isAdult" class="dropdown" v-bind:class="{'is-active': isGlassesButtonEnable }">
                                <div class="dropdown-trigger">
                                    <button v-on:click="openDropdownGlasses" class="button">
                                        <span>Glasses</span>
                                    </button>
                                </div>
                                <div class="dropdown-menu" role="menu">
                                    <div class="dropdown-content">
                                        <a v-bind:key="glasses" v-for="(glasses, index) in glassesList" class="dropdown-item" v-on:click="selectGlasses(index)">{{glasses}}</a>
                                    </div>
                                </div>
                            </div>
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
            <p id="generalInfo">Click or tap on a character of your choice to select and customize it at your will.</p>
            <p id="contextualInfo">{{ contextualInfo }}</p>
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
        <section>
            <div class="control has-text-centered">
                <button class="button is-primary is-success" v-if="isVisible" v-on:click="loadAnimationView()">Continue</button>
            </div>
        </section>
    </div>
</template>

<script>
    import Character from '../components/Character.vue'
    import { Compact }  from 'vue-color';
    import CharacterList from "../components/CharacterList";
    import json from '../assets/characters.json';
    import GroupCharacter from "../components/GroupCharacter";
    export default {
        name: 'home',
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
                isBeardsButtonEnable: false,
                isGlassesButtonEnable: false,
                beardsList: [],
                glassesList: [],
                currentColorHair: '',
                currentColorFace: '',
                currentCharacter: "",
                currentCharacterObject: "",
                characterList: [],
                contextualInfo: "",
                modalTitle: "",
                totalCreated: 0,
                isAvatarCreated: false,
                areVulnerableCreated: false,
                areCommunityCreated: false,
                maxCharactersInGroup: 0,
                type: String,
                isAdult: false
            };
        },
        props: {
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
                this.currentColorFace = "#7C5235";
                this.currentColorHair = "#412308";
                this.$refs.character.resetFaceColor();
                this.$refs.character.changeFaceColor(this.currentColorFace);
                this.$refs.character.changeHairColor(this.currentColorHair);
                this.$refs.character.changeGlasses(-1);
                this.$refs.character.changeBeard(-1);
            },
            launch(character) {
                if (this.$refs.listToFill.getCharacterListSize() < this.maxCharactersInGroup)  {
                    this.currentCharacter = require(`../assets/characters/${character.file}`);
                    this.currentCharacterObject = character;
                    this.isAdult = (character.type === "adult");
                    this.currentColorFace = "#7C5235";
                    this.currentColorHair = "#412308";
                    this.isActive = true;
                }
            },
            setGlassesList(glasses) {
                this.glassesList = glasses;
            },
            setBeardsList(beards) {
                this.beardsList = beards;
            },
            selectGlasses(pos) {
                this.$refs.character.changeGlasses(pos);
                this.isGlassesButtonEnable = false;
            },
            selectBeards(pos) {
                this.$refs.character.changeBeard(pos);
                this.isBeardsButtonEnable = false;
            },
            removeModal() {
                this.isActive = false;
                this.isHairColorButtonEnable = false;
                this.isFaceColorButtonEnable = false;
            },
            saveCharacter() {
                this.manageCharacterCount();
                this.$refs.listToFill.addCharacterToGroup(this.currentCharacterObject,
                    this.$refs.character.getSvgColor(), this.getCurrentCharacterType(this.totalCreated));
                this.removeModal();
                if (this.$refs.listToFill.getCharacterListSize() === this.maxCharactersInGroup) {
                    this.isVisible = true;
                }
            },
            getCurrentCharacterType(position) {
                if (position <= json.nbAvatar) {
                    return "avatar";
                } else if (position <= json.nbAvatar + json.nbVulnerable)   {
                    return "vulnerable"
                } else if (position <= json.nbAvatar + json.nbVulnerable + json.nbCommunity) {
                    return "comm";
                }
            },
            loadAnimationView() {
                let groupCharacter = this.$refs.listToFill.getCharacterList();
                this.$router.push({name: 'Animations', params:{group: groupCharacter}});
            },
            openDropdownHair() {
                this.isHairColorButtonEnable = !this.isHairColorButtonEnable;
                this.isFaceColorButtonEnable = false;
                this.isGlassesButtonEnable = false;
                this.isBeardsButtonEnable = false;
            },
            openDropdownFace() {
                this.isFaceColorButtonEnable = !this.isFaceColorButtonEnable;
                this.isHairColorButtonEnable = false;
                this.isGlassesButtonEnable = false;
                this.isBeardsButtonEnable = false;
            },
            openDropdownBeards() {
                this.isBeardsButtonEnable = !this.isBeardsButtonEnable;
                this.isGlassesButtonEnable = false;
                this.isFaceColorButtonEnable = false;
                this.isHairColorButtonEnable = false;
            },
            openDropdownGlasses() {
                this.isGlassesButtonEnable = !this.isGlassesButtonEnable;
                this.isFaceColorButtonEnable = false;
                this.isHairColorButtonEnable = false;
                this.isBeardsButtonEnable = false;
            },
            manageCharacterCount() {
                this.totalCreated++;
                if (this.totalCreated === json.nbAvatar) {
                    this.isAvatarCreated = true;
                    this.contextualInfo = `Now, select and customize ${json.nbVulnerable} people you consider vulnerable.`;
                    this.modalTitle = "Create a vulnerable person";
                } else if (this.totalCreated === json.nbAvatar + json.nbVulnerable) {
                    this.areVulnerableCreated = true;
                    this.contextualInfo = `Finally, select and customize ${json.nbCommunity} other people around you.`;
                    this.modalTitle = "Create a person around you";
                } else if (this.totalCreated === json.nbAvatar + json.nbVulnerable + json.nbCommunity) {
                    this.areCommunityCreated = true;
                    this.contextualInfo = "Press the button to start the animation";
                    this.modalTitle = "";
                }
            }
        },
        created() {
            this.characterList = json.characters;
            this.maxCharactersInGroup = json.nbAvatar + json.nbVulnerable + json.nbCommunity;
            this.contextualInfo = "First, select and customize your own avatar.";
            this.modalTitle = "Create your avatar";
        },
        mounted() {
            document.body.addEventListener('keyup', e => {
                if (e.keyCode === 27 && this.isActive) {
                    this.removeModal();
                } else if (e.keyCode === 13 && this.isActive) {
                    this.saveCharacter();
                }
            })
        }
    }
</script>

<style scoped>
    h1 {
        font-weight: bold;
        margin: 0 0 20px 0;
    }
    p {
        margin: 10px 0;
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
