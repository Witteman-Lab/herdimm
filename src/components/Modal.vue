<template>
    <div class="modal" v-bind:class="{'is-active': isActive }">
        <div class="modal-background">
            <div class="modal-card mobile-modal">
                <header class="modal-card-head">
                    <p class="modal-card-title">
                        {{ modalTitle }}
                        <br/>
                        <span style="font-size: medium">{{ this.labels.totalCharacterCount }} {{this.currentCharacterNumber}} / {{totalCharactersCount}}</span>
                    </p>
                    <button class="delete" aria-label="close modal" v-on:click="this.closeModal"></button>
                </header>
                <section class="modal-card-body">
                    <div class="columns">
                        <div class="column is-centered ">
                            <Character  v-if="isActive" :size="{width: '70px', height: '78px'}" :disable-group-character="disableGroupCharacter" :change-avatar-state="changeAvatarState" :edit="false" :customised="true" ref="character" :id="'current'" :svgFile="this.currentCharacter"
                                       :colors="{face: this.currentColorFace, hairFront: this.currentColorHair, beards: this.currentBeard,
                                       glasses: this.currentGlasses, shirt: this.currentShirt, name: this.characterName, options: this.options,
                                       characterTimeEdition: this.characterTimeEdition, numberOfEdition: this.numberOfEdition,
                                       characterTimeCreation: this.characterTimeCreation, accessoriesColor: this.currentAccessories}"
                                        :default-color-for-all-avatar-elements="defaultColorForAllAvatarElements"
                                       :is-name="true" :is-modal="true" :setAccessories="setAccessories"/>

                            <v-btn v-if="isEdit" color="#212121" style="color:white" v-on:click="this.changeAvatar">{{this.labels.changeAvatar}}</v-btn>

                            <div class="field is-one-fifth-mobile" style="margin-top: 5px">
                                <div style="overflow: visible;margin-top: 10px;" v-show="characterType === 'vulnerable'" class="control">
                                    <p id="vulnerableDescription">{{ this.labels.vulnerableDescription }}</p>
                                    <div v-for="(option, index) in this.labels.vulnerableOptions" :key="index">
                                        <label class="checkbox" >
                                            <input v-on:click="setCharacterOption(option, index)" type="checkbox" :checked="options[index] ? options[index].id === option.id : ''">
                                            {{option.name}}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column is-center">
                            <div class="tabs is-centered is-boxed is-three-quarters">
                                <ul>
                                    <li class="tab" id="skinColorTab" v-on:click="openTab('skinColorTab', 'skinColorSelect')">
                                        <a>{{this.labels.skinColorTab}}</a>
                                    </li>
                                    <li class="tab" id="hairColorTab" v-if="this.hasHair" v-on:click="openTab('hairColorTab', 'hairColorSelect')">
                                        <a>{{this.labels.hairColorTab}}</a>
                                    </li>
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
                                    <Compact
                                            :value="this.currentColorFace"
                                            @input="this.changeFaceColor"
                                            :palette="skinColors"/>
                                </div>

                                <!-- Hair color -->
                                <div id="hairColorSelect" class="content-tab" v-if="this.hasHair" >
                                    <Compact v-show="!this.isVueColorActive"
                                             :value="this.currentColorHair"
                                             @input="this.changeHairColorByTile"
                                             :palette="hairColors"/>


                                    <v-color-picker  v-if="isVueColorActive"
                                                     v-model="currentColorHair"
                                                     @input="this.changeHairColorBySpectrum"
                                                     :hide-canvas="false"
                                                     :hide-inputs="true"
                                                     :show-swatches="false"
                                                     :dot-size=20
                                                     :light="false"
                                                     class="mx-auto" />

                                    <div style="display: flex; justify-content: center;" >
                                        <v-btn v-if="!this.isVueColorActive" :disabled='this.showMoreColor' color="black"  style="margin: 10px; color:white"  @click="showSpectrum">{{this.labels.moreColor}}</v-btn>
                                        <v-btn v-if="this.isVueColorActive" color="black" style="margin: 10px; color: white"  @click="addColorToSpectrum">{{this.labels.addColor}}</v-btn>
                                        <v-btn v-if="this.isVueColorActive" color="#D50000" style="margin: 10px; color: white"  @click="closeSpectrumColorCanvas">{{this.labels.cancelSpectrumColor}}</v-btn>
                                    </div>

                                </div>


                                <!-- Glasses -->
                                <div id="glassesSelect" style="justify-content: center;" class="content-tab buttons" v-if="this.hasGlasses">
                                    <ul>
                                        <li class="accessoriesList button" style="overflow: hidden" v-on:click="selectGlasses(-1)">{{this.labels.None}}</li>
                                        <li class="accessoriesList button" style="overflow: hidden" v-for="(glasses, index) in glassesList" :key="index" v-on:click="selectGlasses(index)" v-html="require(`../assets/glasses/${glasses}.svg`)"></li>
                                    </ul>
                                </div>

                                <!-- Facial hair -->
                                <div id="facialHairSelect" style="justify-content: center;" class="content-tab buttons" v-if="this.hasFacialHair">
                                    <ul>
                                        <li class="accessoriesList button" style="overflow: hidden" v-on:click="selectBeards(-1)">{{this.labels.None}}</li>
                                        <li class="accessoriesList button facialHairList"  style="overflow: hidden" v-for="(beard, index) in facialHairListJson" :key="index" v-html="require(`../assets/facialHair/${beard.file}`)" v-on:click="selectBeards(index)"></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <div class="buttons is-light">
                        <button class="button is-success" v-if="!this.isEdit" v-on:click="this.saveCharacter">{{this.labels.saveBtn}}</button>
                        <button class="button is-success" v-if="this.isEdit" v-on:click="this.saveEditCharacter">{{this.labels.saveEditBtn}}</button>
                        <button class="button" v-on:click="this.closeModal">{{this.labels.cancelBtn}}</button>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
    import Character from "../components/Character.vue"
    import { Compact }  from "vue-color";
    import charactersJson from "../assets/json/characters";

    export default {
        name: "Modal",
        components: {
            Character,
            Compact
        },
        data() {
            return {
                modalTitle: "",
                modalInputLabel: "",
                modalInputPlaceholder: "",

                currentColorFace: '',
                currentColorHair: '',
                currentBeard: -1,
                currentGlasses: -1,
                currentCharacter: "",
                currentShirt: "",
                currentCharacterObject: "",
                currentAccessories: "",
                currentCharacterObjectToRemove:"",
                defaultColorForAllAvatarElements:"",

                hasHair: false,
                hasFacialHair: false,
                hasGlasses: false,

                colorToShow: "",
                isVueColorActive: false,
                spectrumSaveCurrentColorHair: "",
                ColorNumberCreateWithSpectrum : 0,
                showMoreColor :  false,

                changeAvatarState : true,
                disableGroupCharacter : true,
                replaceCharacterMode: false,
                characterIndex: 0,
                characterIndexSave: 0,
                characterId :"",
                characterType: "",

                isActive: false,
                isDropdownActive: false,
                isEdit: false,
                isBeardsButtonEnable: false,
                isGlassesButtonEnable: false,
                isHairColorButtonEnable: false,
                isFaceColorButtonEnable: false,

                glassesList: [],
                beardsList: [],
                characterName: "",
                currentCharacterNumber: 0,
                options: [],
                endCharacterTime: 0,
                characterTimeEdition: 0,
                characterTimeCreation: 0,
                numberOfEdition: 0
            }
        },
        props: {
            labels: Object,
            facialHairListJson: Array,
            totalCharactersCount: Number,
            vulnerableOptions: Array,
            skinColors: Array,
            hairColors: Array,
            defaultCharacterColors: Object,
            maxColorTile: Number,
            totalCreated: Number,
            maxCharactersInGroup : Number,
            isGroupComplete: Boolean,
            setReplaceCharacterMode: Function,
            editCharacter: Function,
            saveCharacterAfterReplace: Function,
            saveCharacterInfo: Function,
        },
        methods: {

            /**
             * ---> change avatar ( Mask old avatar and close Modal)
             * @param none
             * @return none
             */
            changeAvatar() {
                this.replaceCharacterMode = true;
                this.characterIndexSave = this.characterIndex;
                this.characterId = this.currentCharacterObject.id;
                this.characterType = this.getCurrentCharacterType(this.characterIndexSave);
                this.setReplaceCharacterMode(false);
                this.editCharacter(this.currentCharacterObject, this.$refs.character.getSvgColorForChangeAvatar());
                this.closeModal();
            },

            /**
             * ---> get the current character type
             * @param none
             * @return none
             */
            getCurrentCharacterType(position) {
                if (position < charactersJson.nbAvatar) {
                    return "avatar";
                } else if (position < charactersJson.nbAvatar + charactersJson.nbVulnerable) {
                    return "vulnerable"
                } else if (position < charactersJson.nbAvatar + charactersJson.nbVulnerable + charactersJson.nbCommunity) {
                    return "comm";
                }
            },


            /**
             * ---> Close the spectrum color canvas
             * @param none
             * @return none
             */
            closeSpectrumColorCanvas() {
                this.isVueColorActive = false;
                this.currentColorHair = this.colorToShow;
                this.$refs.character.changeHairColor(this.currentColorHair);
            },

            /**
             * ---> add the new color in color tile
             * @param none
             * @return none
             */
            addColorToSpectrum() {
                let isColorPresent = false;
                this.hairColors.forEach((color) => {
                    if (this.currentColorHair === color) {
                        isColorPresent = true;
                    }
                });
                if (!isColorPresent && this.ColorNumberCreateWithSpectrum < this.maxColorTile) {
                    this.hairColors.push(this.currentColorHair);
                    this.ColorNumberCreateWithSpectrum++;
                }
                if (this.ColorNumberCreateWithSpectrum === this.maxColorTile) {
                    this.showMoreColor = true;
                }
                this.$refs.character.changeHairColor(this.currentColorHair);
                this.isVueColorActive = false;
            },

            /**
             * ---> show the spectrum color when we press on more colors
             * @param none
             * @return none
             */
            showSpectrum() {
                this.colorToShow = this.currentColorHair;
                this.isVueColorActive = true;
            },

            /**
             * ---> calculate time spend for a user to create a character
             * @param  none
             * @return none
             */
            calculateTimeCharacter() {
                let startCharacterTime = this.startCharacterTime;
                let  spendTime = Math.round((this.endCharacterTime - startCharacterTime));
                this.$refs.character.setCharacterTimeCreation(spendTime);
            },

            /**
             * ---> reset vulnerable option
             * @param  none
             * @return none
             */
            resetVulnerableOption() {
                this.options = [];
                this.labels.vulnerableOptions.forEach(() => {
                    this.options.push({id: -1})
                });
            },
            /**
             * ---> Show create or edit modal and adapt the different tabs
             * @param {Number} index
             * @param {Object} character
             * @param {Number} totalCreated
             * @param {Boolean} isEdit
             * @param {String} label
             * @return none
             */
            openModal(index, character, totalCreated, isEdit, label) {
                this.startCharacterTime = Date.now();

                if (!this.replaceCharacterMode)
                    this.characterIndex = index;
                else
                    this.characterIndex = this.characterIndexSave;

                this.characterType = this.getCurrentCharacterType(this.characterIndex);

                this.modalTitle = this.getModalTitle(label);
                this.currentCharacter = require(`../assets/characters/${character.file}`);
                this.currentCharacterObject = character;
                this.isActive = true;
                this.isEdit = isEdit;

                this.currentCharacterNumber = totalCreated;
                this.resetVulnerableOption();
                this.setCharacterColors(isEdit, character, this.characterType);

                // Display the skin tab content when opening modal window
                this.openTab("skinColorTab", "skinColorSelect");
            },

            /**
             * ---> Apply character attributes when edit or default attributes when create
             * @param {Boolean} isEdit
             * @param {Object} character
             * @param {string} characterType
             * @return none
             */
            setCharacterColors(isEdit, character, characterType) {
                if (isEdit) {
                    this.currentColorFace = character.colors.face;
                    this.currentColorHair = character.colors.hairFront;
                    this.currentGlasses = character.colors.glasses;
                    this.currentBeard = character.colors.beards;
                    this.currentShirt = character.colors.shirt;
                    this.characterName = character.colors.name;
                    this.characterTimeEdition = character.colors.characterTimeEdition;
                    this.numberOfEdition = character.colors.numberOfEdition;
                    this.characterTimeCreation = character.colors.characterTimeCreation;
                    this.setVulnerableOption(character.colors.options);
                } else {
                    // Avatar gets a special shirt
                    if (characterType === "avatar") {
                        this.currentAccessories = this.defaultCharacterColors.ShirtColorAvatar;
                        this.currentShirt = this.defaultCharacterColors.ShirtColorAvatar;
                    } else {
                        this.currentShirt = this.defaultCharacterColors.ShirtColorCharacters;
                        this.currentAccessories = this.defaultCharacterColors.AccessoriesColor;
                    }
                    this.currentColorFace = this.defaultCharacterColors.SkinColor;
                    this.currentColorHair = this.defaultCharacterColors.HairColor;
                    this.currentGlasses = -1;
                    this.currentBeard = -1;
                }
            },

            /***
             * --> Set character option
             * @param {String} option
             * @param {Number} index
             * @return none
             */
            setCharacterOption(option, index) {
                if (this.options[index].id === -1)
                    this.options[index] = option;
                else {
                    this.options[index] = {id: -1};
                }
            },

            /**
             * ---> Close the modal and reset default parameter
             * @param none
             * @return none
             */
            closeModal() {
                this.isActive = false;
                this.isDropdownActive = false;
                this.isHairColorButtonEnable = false;
                this.isFaceColorButtonEnable = false;
                this.isVueColorActive = false;
                this.characterName = "";
            },

            /**
             * ---> Manage character name if user type a name or not and save the character in the group list
             * @param none
             * @return none
             */
            saveCharacter() {
                if (this.characterType === "vulnerable") {
                    this.$refs.character.setCharacterOption(this.options);
                }
                this.endCharacterTime = Date.now();
                this.calculateTimeCharacter();

                if (this.replaceCharacterMode) {
                    this.saveCharacterAfterReplace(this.currentCharacterObject, this.$refs.character.getSvgColor(), this.characterType, this.characterId);
                    this.replaceCharacterMode = false;
                    this.setReplaceCharacterMode(true);
                    this.characterId = "";
                    this.characterIndexSave = "";
                } else {
                    this.saveCharacterInfo(this.currentCharacterObject, this.$refs.character.getSvgColor());
                }
                this.closeModal();
            },

            /**
             * ---> Save the edited character in the group list
             * @param none
             * @return none
             */
            saveEditCharacter() {
                //modification time for a character
                this.endCharacterTime = Date.now();
                this.editCharacter(this.currentCharacterObject, this.$refs.character.getSvgColor());
                this.closeModal();
            },

            /**
             * ---> Set accessories tabs
             * @param {Boolean} hasGlasses
             * @param {Boolean} hasBeard
             * @param {Boolean} hasHair
             * @param {Array} glassesList
             * @return none
             */
            setAccessories(hasGlasses, hasBeard, hasHair, glassesList) {
                this.hasGlasses = hasGlasses;
                this.hasFacialHair = hasBeard;
                this.hasHair = hasHair;
                this.glassesList = glassesList;
            },

            /**
             * ---> Apply the glasses at the given position to the character
             * @param {Number} pos
             * @return none
             */
            selectGlasses(pos) {
                this.$refs.character.changeGlasses(pos);
                this.isGlassesButtonEnable = false;
            },

            /**
             * ---> Apply the beards at the given position to the character
             * @param {Number} pos
             * @return none
             */
            selectBeards(pos) {
                this.$refs.character.changeBeard(pos);
                this.isBeardsButtonEnable = false;
            },

            /***
             * --> set checked button based on the option name
             * @param {String} options
             * @return none
             **/
            setVulnerableOption(options) {
                this.options = options;
            },

            /**
             * ---> Open tab based on the content and the name
             * @param {String} target
             * @param {String} tabName
             * @return none
             */
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

            /**
             * ---> May need some refactor or find another solution
             * ---> Apply specific position to glasses and beards buttons
             * @param {String} height
             * @param {String} marginTop
             * @return none
             */
            setAccessoriesPosition(height, marginTop) {
                let accessories = document.getElementsByClassName("accessoriesList");
                for (let i = 0; i < accessories.length; i++) {
                    if (accessories[i].innerHTML !== this.labels.None) {
                        let item = accessories[i].children[0];
                        item.setAttribute("height", height);
                        if (item.id !== "glasses4" && item.id !== "glasses5") {
                            item.setAttribute("style", `margin-top: ${marginTop};`);
                        }
                    }
                }
            },

            /**
             * ---> Apply the chosen color on the current character skin
             * @param {String} color
             * @return none
             */
            changeFaceColor(color) {
                this.currentColorFace = color.hex;
                this.$refs.character.changeFaceColor(color.hex);
            },

            /**
             * ---> Apply the chosen color on the current character hair
             * @param {Object} color
             * @return none
             */
            changeHairColorBySpectrum(color) {
                this.currentColorHair = color;
                this.$refs.character.changeHairColor(this.currentColorHair);
            },

            /**
             * ---> Apply the chosen color on the current character hair
             * @param {Object} color
             * @return none
             */
            changeHairColorByTile(color) {
                this.currentColorHair = color.hex;
                this.$refs.character.changeHairColor(this.currentColorHair);
            },

            /**
             * ---> Get modal title based on the position of the character to create/edit
             * @param {String} verb
             * @return {String} modal Title
             */
            getModalTitle(verb) {
                if (!this.replaceCharacterMode) {
                    if (this.characterType === "avatar") {
                        return `${verb} ${this.labels.avatar}`
                    } else if (this.characterType === "vulnerable") {
                        return `${verb} ${this.labels.vulnerable}`
                    } else {
                        return `${verb} ${this.labels.otherPeople}`
                    }
                } else {
                    if (this.characterType === "avatar") {
                        return this.labels.replaceYourAvatar;
                    } else if (this.characterType === "vulnerable") {
                        return this.labels.replaceYourVulnerable;
                    } else {
                        return this.labels.replaceYourComm;
                    }
                }

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
            this.defaultColorForAllAvatarElements = charactersJson.defaultColorForAllAvatarElements;
        }
    }
</script>

<style scoped>
    @import '~@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css';

    #vulnerableDescription {
        font-weight: bold;
        margin: 1rem 0;
    }
    header.modal-card-head {
        padding: 10px;
    }
    .content-tab {
        display: none;
        margin: 0 0 1rem 0;
    }
    li.accessoriesList {
        display: inline-block;
        min-width: 115px;
        margin: 0 auto 10px;
        padding-left: 0;
        padding-right: 0;
    }
    .mobile-modal {
        margin-top: calc(20vh - 40px);
    }

    ul {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        padding-left: 0;
    }

    li.tab {
        display: inline-block;
        text-align: center;
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
