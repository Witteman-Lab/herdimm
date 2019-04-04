<template>
    <div class="container">
        <div class="modal" v-bind:class="{'is-active': isActive }">
            <div class="modal-background">
                <div class="modal-card mobile-modal">
                    <header class="modal-card-head">
                        <p class="modal-card-title">{{ modalTitle }}</p>
                        <button class="delete" aria-label="close modal" v-on:click="this.removeModal"></button>
                    </header>
                    <section class="modal-card-body">
                        <Character v-if="isActive" :size="{width: '70px', height: '95px'}" :edit="false" :customised="true" ref="character" :id="'current'" :svgFile="this.currentCharacter"
                                   :colors="{face: this.currentColorFace, hairFront: this.currentColorHair, beards: this.currentBeard, glasses: this.currentGlasses}" />

                        <div class="tabs is-centered is-boxed is-three-quarters">
                            <ul>
                                <li class="tab" v-on:click="openTab($event, 'skinColorSelect')">
                                    <a>Skin color</a>
                                </li>
                                <li class="tab" v-if="this.hasHair" v-on:click="openTab($event, 'hairColorSelect')">
                                    <a>Hair color</a>
                                </li>
                                <li class="tab" v-if="this.hasGlasses" v-on:click="openTab($event, 'glassesSelect')">
                                    <a>Glasses</a>
                                </li>
                                <li class="tab" v-if="this.hasFacialHair" v-on:click="openTab($event, 'facialHairSelect')">
                                    <a>Facial hair</a>
                                </li>
                            </ul>
                        </div>

                        <div style="display: flex; justify-content: center">

                            <!-- Skin color -->
                            <div id="skinColorSelect" class="content-tab">
                                <Compact
                                    :value="this.currentColorFace"
                                    @input="this.changeFaceColor"
                                    @mouseenter="e => e.target.classList.toggle('hovered')"
                                    @mouseleave="e => e.target.classList.toggle('notHovered')"
                                    :palette="[
                                        '#FFD6C5', '#E7C1B2', '#E4BDAD',
                                        '#FFE2C9', '#E7CBB5', '#E6C8B0',
                                        '#FFCBA3', '#E8B894', '#E7B38D',
                                        '#D8905F', '#C28155', '#BE794A',
                                        '#88513A', '#7B4934', '#733E26'
                                    ]"
                                />
                            </div>

                            <!-- Hair color -->
                            <div id="hairColorSelect" class="content-tab" v-if="this.hasHair" >
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

                            <!-- Glasses -->
                            <div id="glassesSelect" class="content-tab buttons" v-if="this.hasGlasses">
                                <span class="accessoriesList button" v-on:click="selectGlasses(-1)">None</span>
                                <span class="accessoriesList button" v-for="(glasses, index) in glassesListJson" v-on:click="selectGlasses(index)" v-html="require(`../assets/glasses/${glasses.file}`)"></span>
                            </div>

                            <!-- Facial hair -->
                            <div id="facialHairSelect" class="content-tab buttons" v-if="this.hasFacialHair">
                                <span class="accessoriesList button" v-on:click="selectBeards(-1)">None</span>
                                <span class="accessoriesList button facialHairList" v-for="(beard, index) in facialHairList" v-html="require(`../assets/facialHair/${beard.file}`)" v-on:click="selectBeards(index)"></span>
                            </div>
                        </div>

                        <br />
                        <div class="buttons is-light is-centered">
                            <button class="button is-centered" v-on:click="resetDefault">Reset</button>
                        </div>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button is-success" v-if="!this.isEdit" v-on:click="this.saveCharacter">Save</button>
                        <button class="button is-success" v-if="this.isEdit" v-on:click="this.saveEditCharacter">Save Edit</button>
                        <button class="button" v-on:click="this.removeModal">Cancel</button>
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
                            <CharacterList ref="listAvailable" :characters="this.characterList" :id="this.currentCharacterObject.file"></CharacterList>
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
    import glassesJson from '../assets/glasses.json';
    import facialHairJson from '../assets/facialHair.json';
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
                isEdit: false,
                isHairColorButtonEnable: false,
                isFaceColorButtonEnable: false,
                isBeardsButtonEnable: false,
                isGlassesButtonEnable: false,
                beardsList: [],
                glassesList: [],
                currentColorHair: '',
                currentColorFace: '',
                currentBeard: -1,
                currentGlasses: -1,
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
                hasFacialHair: false,
                hasGlasses: false,
                hasHair: false,
                facialHairList: [],
                glassesListJson: []
            };
        },
        props: {},
        methods: {
            openTab(evt, tabName) {
                let i, x, tablinks;
                x = document.getElementsByClassName("content-tab");

                for (i = 0; i < x.length; i++) {
                    x[i].style.display = "none";
                }

                tablinks = document.getElementsByClassName("tab");

                for (i = 0; i < x.length; i++) {
                    tablinks[i].className = tablinks[i].className.replace(" is-active", "");
                }

                document.getElementById(tabName).style.display = "inline-block";
                evt.currentTarget.className += " is-active";
                if (tabName === "glassesSelect")
                    this.setAccessoriesPosition("0 110 315 350"); // Works for now, but a bit too arbitrary to be shared
                else if (tabName === "facialHairSelect") {
                    this.setAccessoriesPosition("40 130 225 350"); // Works for now, but a bit too arbitrary to be shared
                }
            },
            changeFaceColor(color) {
                this.currentColorFace = color.hex;
                this.$refs.character.changeFaceColor(color.hex);
            },
            changeHairColor(color) {
                this.currentColorHair = color.hex;
                this.$refs.character.changeHairColor(color.hex);
            },
            resetDefault() {
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

                    this.currentColorFace = "#7C5235";
                    this.currentColorHair = "#412308";
                    this.currentGlasses = -1;
                    this.currentBeard = -1;
                    this.isActive = true;
                    this.isEdit = false;
                    this.modalTitle = this.getModalTitle(this.totalCreated, "Create");
                }
            },
            launchEditModal(character, index) {
                this.currentCharacter = require(`../assets/characters/${character.file}`);
                this.currentCharacterObject = character;

                this.currentColorFace = character.colors.face;
                this.currentColorHair = character.colors.hairFront;
                this.currentGlasses = character.colors.glasses;
                this.currentBeard = character.colors.beards;
                this.isActive = true;
                this.isEdit = true;
                this.modalTitle = this.getModalTitle(index, "Edit");
            },
            setAccessories(hasGlasses, hasBeard, hasHair) {
                this.hasGlasses = hasGlasses;
                this.hasFacialHair = hasBeard;
                this.hasHair = hasHair;
            },
            getModalTitle(index, verb) {
                return (index === 0 ?  `${verb} your avatar` : index <= json.nbVulnerable ? `${verb} a vulnerable person` : `${verb} a person around you`);
            },
            setGlassesList(glasses) {
                this.glassesList = glasses;
            },
            setBeardsList(beards) {
                this.beardsList = beards;
            },
            selectGlasses( pos) {
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
            saveEditCharacter() {
                this.$refs.listToFill.editCharacter(this.currentCharacterObject,
                    this.$refs.character.getSvgColor(), this.currentCharacterObject.characterType);
                this.removeModal();
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
                this.$router.push({name: 'Shapes', params:{group: groupCharacter}});
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
                } else if (this.totalCreated === json.nbAvatar + json.nbVulnerable) {
                    this.areVulnerableCreated = true;
                    this.contextualInfo = `Finally, select and customize ${json.nbCommunity} other people around you.`;
                } else if (this.totalCreated === json.nbAvatar + json.nbVulnerable + json.nbCommunity) {
                    this.areCommunityCreated = true;
                    this.contextualInfo = "Press the button to start the animation";
                }
            },
            setAccessoriesPosition(position) {
                let accessories = document.getElementsByClassName("accessoriesList");
                for (let i = 0; i < accessories.length; i++) {
                    if (accessories[i].innerHTML !== "None") {
                        let item = accessories[i].children[0];
                        item.setAttribute("viewBox", position);
                    }
                }
            }
        },
        created() {
            this.characterList = json.characters;
            this.maxCharactersInGroup = json.nbAvatar + json.nbVulnerable + json.nbCommunity;
            this.contextualInfo = "First, select and customize your own avatar.";
            this.facialHairList = facialHairJson.beards;
            this.glassesListJson = glassesJson.glasses;
        },
        mounted() {
            document.body.addEventListener('keyup', e => {
                if (e.keyCode === 27 && this.isActive) {
                    this.removeModal();
                } else if (e.keyCode === 13 && this.isActive) {
                    this.saveCharacter();
                }  else if (e.keyCode === 13 && this.isEdit) {
                    console.log("e.keyCode", e.keyCode);
                    console.log("this.isEdit", this.isEdit);
                    this.saveEditCharacter();
                }
            });
        }
    }
</script>
<style>
    div.vc-compact {
        width: 100%;
    }
    li.vc-compact-color-item {
        width: 45px;
        height: 45px;
    }
    div.vc-compact-dot {
        width: 50%;
        height: 50%;
        top: 25%;
        bottom: 25%;
        left: 25%;
        right: 25%;
    }
</style>
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
    header.modal-card-head {
        padding: 10px;
    }
    .content-tab {
        display: none;
        margin: 0 0 1rem 0;
        /* visibility: hidden; */
    }
    span.accessoriesList {
        display: inline-block;
        margin: 0 auto;
        min-width: 100px;
    }
    span.facialHairList {
        height: 60px;
    }
    @media only screen and (max-width: 768px) {
        .mobile-modal {
            margin-top: calc(20vh - 40px);
            width: auto;
            height: 85%;
        }
        header.modal-card-head {
            padding: 5px;
        }
    }
</style>
