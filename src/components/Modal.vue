<template>
    <div class="modal" v-bind:class="{'is-active': isActive }">
        <div class="modal-background">
            <div class="modal-card mobile-modal">
                <header class="modal-card-head">
                    <p class="modal-card-title">{{ modalTitle }}</p>
                    <button class="delete" aria-label="close modal" v-on:click="this.closeModal"></button>
                </header>
                <section class="modal-card-body">
                    <Character v-if="isActive" :size="{width: '70px', height: '95px'}" :edit="false" :customised="true" ref="character" :id="'current'" :svgFile="this.currentCharacter"
                               :colors="{face: this.currentColorFace, hairFront: this.currentColorHair, beards: this.currentBeard, glasses: this.currentGlasses, shirt: this.currentShirt}" />

                    <div class="tabs is-centered is-boxed is-three-quarters">
                        <ul>
                            <!-- For testing, in case we want to group skin and hair colors in a single tab (saves space) -->
                            <!-- <li class="tab" v-on:click="openTab($event, 'colorsSelect')">
                                <a>Colors</a>
                            </li> -->
                            <li class="tab" id="skinColorTab" v-on:click="openTab('skinColorTab', 'skinColorSelect')">
                                <!-- <li class="tab" id="skinColorTab" v-on:click="openTab($event, 'skinColorSelect')"> -->
                                <a>{{this.labels.skinColorTab}}</a>
                            </li>
                            <li class="tab" id="hairColorTab" v-if="this.hasHair" v-on:click="openTab('hairColorTab', 'hairColorSelect')">
                                <!-- <li class="tab" id="hairColorTab" v-if="this.hasHair" v-on:click="openTab($event, 'hairColorSelect')"> -->
                                <a>{{this.labels.hairColorTab}}</a>
                            </li>

                            <!-- Maybe we could also group these 2 tabs in a single one called accessories -->
                            <!-- Would need to take consider the v-if conditions... -->
                            <!-- <li class="tab" v-if="(this.hasGlasses || this.hasFacialHair)" v-on:click="openTab($event, 'accessoriesSelect')">
                                <a>Accessories</a>
                            </li> -->
                            <li class="tab" id="glassesTab" v-if="this.hasGlasses" v-on:click="openTab('glassesTab', 'glassesSelect')">
                                <a>{{this.labels.glassesTab}}</a>
                            </li>
                            <li class="tab" id="facialHairTab" v-if="this.hasFacialHair" v-on:click="openTab('facialHairTab', 'facialHairSelect')">
                                <a>{{this.labels.facialHairTab}}</a>
                            </li>
                        </ul>
                    </div>

                    <div style="display: flex; justify-content: center">

                        <!-- Skin color -->
                        <div id="skinColorSelect" class="content-tab">
                            <Compact :value="this.currentColorFace" @input="this.changeFaceColor"
                                    :palette="['#FFE2C9', '#FFCBA3', '#E7B38D', '#D8905F', '#7C5235']"/>
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
                                    ]"/>
                        </div>

                        <!-- Glasses -->
                        <div id="glassesSelect" class="content-tab buttons" v-if="this.hasGlasses">
                            <ul>
                                <li class="accessoriesList button" style="height: 15%; width: 15%;" v-on:click="selectGlasses(-1)">None</li>
                                <li class="accessoriesList button" v-for="(glasses, index) in glassesListJson" v-on:click="selectGlasses(index)" v-html="require(`../assets/glasses/${glasses.file}`)"></li>
                            </ul>
                        </div>

                        <!-- Facial hair -->
                        <div id="facialHairSelect" class="content-tab buttons" v-if="this.hasFacialHair">
                            <ul>
                                <li class="accessoriesList button" style="height: 15%; width: 15%;" v-on:click="selectBeards(-1)">None</li>
                                <li class="accessoriesList button facialHairList" v-for="(beard, index) in facialHairListJson" v-html="require(`../assets/facialHair/${beard.file}`)" v-on:click="selectBeards(index)"></li>
                            </ul>
                        </div>

                    </div>
                </section>
                <footer class="modal-card-foot">
                    <div class="buttons is-light">
                        <button class="button is-success" v-if="!this.isEdit" v-on:click="this.saveCharacter">{{this.labels.saveBtn}}</button>
                        <button class="button is-success" v-if="this.isEdit" v-on:click="this.saveEditCharacter">{{this.labels.saveEditBtn}}</button>
                        <button class="button" v-on:click="this.closeModal">{{this.labels.cancelBtn}}</button>
                        <button class="button" v-on:click="this.resetDefault">{{this.labels.resetAllBtn}}</button>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
    import Character from "../components/Character.vue"
    import { Compact }  from "vue-color";

    export default {
        name: "Modal",
        components: {
            Character,
            Compact,
        },
        data() {
          return {
              modalTitle: "",
              currentColorFace: '',
              currentColorHair: '',
              currentBeard: -1,
              currentGlasses: -1,
              currentCharacter: "",
              currentShirt: "",
              currentCharacterObject: "",
              hasHair: false,
              hasFacialHair: false,
              hasGlasses: false,
              isActive: false,
              isEdit: false,
              isBeardsButtonEnable: false,
              isGlassesButtonEnable: false,
              isHairColorButtonEnable: false,
              isFaceColorButtonEnable: false,
              glassesList: [],
              beardsList: [],
          }
        },
        props: {
            labels: Object,
            glassesListJson: Array,
            facialHairListJson: Array
        },
        methods: {
            // METHOD DESCRIPTION
            openModal(index, character, totalCreated, nbrVulnerable, nbrAvatar, isEdit, label) {
                this.modalTitle = this.getModalTitle(index, label, nbrVulnerable);

                this.currentCharacter = require(`../assets/characters/${character.file}`);
                this.currentCharacterObject = character;

                this.isActive = true;
                this.isEdit = isEdit;
                this.setCharacterColors(isEdit, character, totalCreated < nbrAvatar);

                // Display the skin tab content when opening modal window
                this.openTab("skinColorTab", "skinColorSelect");
            },

            // METHOD DESCRIPTION
            setCharacterColors(isEdit, character, isAvatar) {
                if (isEdit) {
                    this.currentColorFace = character.colors.face;
                    this.currentColorHair = character.colors.hairFront;
                    this.currentGlasses = character.colors.glasses;
                    this.currentBeard = character.colors.beards;
                    this.currentShirt = character.colors.shirt;
                } else {
                    // Avatar gets a special shirt
                    isAvatar ? this.currentShirt = "#F67844" : this.currentShirt = "#BFBABE";
                    this.currentColorFace = "#7C5235";
                    this.currentColorHair = "#412308";
                    this.currentGlasses = -1;
                    this.currentBeard = -1;
                }
            },

            // METHOD DESCRIPTION
            closeModal() {
                this.isActive = false;
                this.isHairColorButtonEnable = false;
                this.isFaceColorButtonEnable = false;
            },

            // METHOD DESCRIPTION
            saveCharacter() {
                this.$parent.saveCharacter(this.currentCharacterObject, this.$refs.character.getSvgColor());
                this.closeModal();
            },

            // METHOD DESCRIPTION
            saveEditCharacter() {
                this.$parent.editCharacter(this.currentCharacterObject, this.$refs.character.getSvgColor());
                this.closeModal();
            },

            // METHOD DESCRIPTION
            setAccessories(hasGlasses, hasBeard, hasHair) {
                this.hasGlasses = hasGlasses;
                this.hasFacialHair = hasBeard;
                this.hasHair = hasHair;
            },
            // METHOD DESCRIPTION
            setGlassesList(glasses) {
                this.glassesList = glasses;
            },

            // METHOD DESCRIPTION
            setBeardsList(beards) {
                this.beardsList = beards;
            },

            // METHOD DESCRIPTION
            selectGlasses(pos) {
                this.$refs.character.changeGlasses(pos);
                this.isGlassesButtonEnable = false;
            },

            // METHOD DESCRIPTION
            selectBeards(pos) {
                this.$refs.character.changeBeard(pos);
                this.isBeardsButtonEnable = false;
            },

            //METHOD DESCRIPTION
            resetDefault() {
                this.currentColorFace = "#7C5235";
                this.currentColorHair = "#412308";
                this.$refs.character.resetFaceColor();
                this.$refs.character.changeFaceColor(this.currentColorFace);
                this.$refs.character.changeHairColor(this.currentColorHair);
                this.$refs.character.changeGlasses(-1);
                this.$refs.character.changeBeard(-1);
            },
            // METHOD DESCRIPTION
            openTab(target, tabName) {

                document.querySelectorAll('.content-tab').forEach(e => e.style.display = "none");
                document.querySelectorAll('.tab').forEach(e => e.classList.remove("is-active"));

                document.getElementById(tabName).style.display = "inline-block";
                document.getElementById(target).classList.add("is-active");

                if (tabName === "glassesSelect")
                    this.setAccessoriesPosition("100px","-30px"); // Works for now, but a bit too arbitrary to be shared
                else if (tabName === "facialHairSelect") {
                    this.setAccessoriesPosition("90px", "-43px"); // Works for now, but a bit too arbitrary to be shared
                }
            },

            // METHOD DESCRIPTION
            setAccessoriesPosition(height, marginTop) {
                let accessories = document.getElementsByClassName("accessoriesList");
                for (let i = 0; i < accessories.length; i++) {
                    if (accessories[i].innerHTML !== "None") {
                        let item = accessories[i].children[0];
                        item.setAttribute("height", height);
                        item.setAttribute("style", `margin-top: ${marginTop};`);
                    }
                }
            },

            // METHOD DESCRIPTION
            changeFaceColor(color) {
                this.currentColorFace = color.hex;
                this.$refs.character.changeFaceColor(color.hex);
            },

            // METHOD DESCRIPTION
            changeHairColor(color) {
                this.currentColorHair = color.hex;
                this.$refs.character.changeHairColor(color.hex);
            },

            // METHOD DESCRIPTION
            getModalTitle(index, verb, nbVulnerable) {
                return (index === 0 ?  `${verb} ${this.labels.avatar}` : index <= nbVulnerable ? `${verb} ${this.labels.vulnerable}` : `${verb} ${this.labels.otherPeople}`);
            },
        },
        mounted() {
            document.body.addEventListener('keyup', e => {
                // Escape key to close the modal window (customizer)
                if (e.keyCode === 27 && this.isActive) {
                    this.closeModal();
                    // Enter key to add a new character to the group (and close the customizer)
                } else if (e.keyCode === 13 && this.isActive  && !this.isEdit) {
                    this.saveCharacter();
                    // Enter key to save edits to a group member (and close the customizer)
                }  else if (e.keyCode === 13  && this.isActive && this.isEdit) {
                    this.saveEditCharacter();
                }
            });
        }
    }
</script>

<style scoped>
    header.modal-card-head {
        padding: 10px;
    }
    .content-tab {
        display: none;
        margin: 0 0 1rem 0;
    }
    li.accessoriesList {
        display: inline-block;
        margin: 0 auto;
        min-width: 100px;
    }
    .mobile-modal {
        margin-top: calc(20vh - 40px);
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
