<template>
    <div class="modal" v-bind:class="{'is-active': isActive }" v-recognizer:pinch.cancel="">
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
                            <Character v-if="isActive" :size="{width: '70px', height: '78px'}" :edit="false" :customised="true" ref="character" :id="'current'" :svgFile="this.currentCharacter"
                                       :colors="{face: this.currentColorFace, hairFront: this.currentColorHair, beards: this.currentBeard,
                                           glasses: this.currentGlasses, shirt: this.currentShirt, name: this.characterName, options: this.options,
                                           characterTimeEdition: this.characterTimeEdition, numberOfEdition: this.numberOfEdition, characterTimeCreation: this.characterTimeCreation}"
                                       :is-name="true"/>

                            <div class="field is-one-fifth-mobile" style="margin-top: 5px">
                                <div class="control">
                                    <input v-on:input="setCharacterName(characterName)" class="input" v-model="characterName"  type="text" :placeholder="this.labels.nameInputPlaceHolder">
                                </div>
                                <div style="overflow: visible;margin-top: 10px;" v-show="isCharacterVulnerable" class="control">
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
<!--=======-->
<!--                    <header class="modal-card-head">-->
<!--                        <p class="modal-card-title">-->
<!--                            {{ modalTitle }}-->
<!--                            <br/>-->
<!--                            <span style="font-size: medium">{{ this.labels.totalCharacterCount }} {{this.currentCharacterNumber}} / {{totalCharactersCount}}</span>-->
<!--                        </p>-->
<!--                        <button class="delete" aria-label="close modal" v-on:click="this.closeModal"></button>-->
<!--                    </header>-->
<!--                    <section class="modal-card-body">-->
<!--                        <div class="columns">-->
<!--                            <div class="column is-centered ">-->
<!--                                <Character v-if="isActive" :size="{width: '70px', height: '78px'}" :edit="false" :customised="true" ref="character" :id="'current'" :svgFile="this.currentCharacter"-->
<!--                                           :colors="{face: this.currentColorFace, hairFront: this.currentColorHair, beards: this.currentBeard,-->
<!--                                           glasses: this.currentGlasses, shirt: this.currentShirt, name: this.characterName, options: this.options,-->
<!--                                           characterTimeEdition: this.characterTimeEdition, numberOfEdition: this.numberOfEdition, characterTimeCreation: this.characterTimeCreation}"-->
<!--                                           :is-name="true"/>-->
<!--                                &lt;!&ndash;<inputclass="input"type="text"placeholder="Entername">&ndash;&gt;-->
<!--                                &lt;!&ndash;<labelclass="label">Name:<inputclass="input"v-model="message"type="text"placeholder="editname"></label>&ndash;&gt;-->
<!--                                <div class="field is-one-fifth-mobile" style="margin-top: 5px">-->
<!--                                        <div class="control">-->
<!--                                            <input v-on:input="setCharacterName(characterName)" class="input" v-model="characterName"  type="text" :placeholder="this.labels.nameInputPlaceHolder" name="characterName">-->
<!--                                        </div>-->
<!--                                        <div style="overflow: visible;margin-top: 10px;" v-show="isCharacterVulnerable" class="control">-->
<!--                                            <div v-for="(option, index) in this.labels.vulnerableOptions" v-on:click="setCharacterOption(option.name, index)">-->
<!--                                                <label class="checkbox">-->
<!--                                                    <input type="checkbox" name="reason">-->
<!--                                                    {{option.name}}-->
<!--                                                </label>-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                </div>-->
<!--&gt;>>>>>> herdimm-data-->
<!--                            </div>-->
<!--                            <div class="column is-center">-->
<!--                                <div class="tabs is-centered is-boxed is-three-quarters">-->
<!--                                    <ul>-->
<!--                                        &lt;!&ndash; For testing, in case we want to group skin and hair colors in a single tab (saves space) &ndash;&gt;-->
<!--                                        &lt;!&ndash; <li class="tab" v-on:click="openTab($event, 'colorsSelect')">-->
<!--                                            <a>Colors</a>-->
<!--                                        </li> &ndash;&gt;-->
<!--                                        <li class="tab" id="skinColorTab" v-on:click="openTab('skinColorTab', 'skinColorSelect')">-->
<!--                                            &lt;!&ndash; <li class="tab" id="skinColorTab" v-on:click="openTab($event, 'skinColorSelect')"> &ndash;&gt;-->
<!--                                            <a>{{this.labels.skinColorTab}}</a>-->
<!--                                        </li>-->
<!--                                        <li class="tab" id="hairColorTab" v-if="this.hasHair" v-on:click="openTab('hairColorTab', 'hairColorSelect')">-->
<!--                                            &lt;!&ndash; <li class="tab" id="hairColorTab" v-if="this.hasHair" v-on:click="openTab($event, 'hairColorSelect')"> &ndash;&gt;-->
<!--                                            <a>{{this.labels.hairColorTab}}</a>-->
<!--                                        </li>-->

<!--                                        &lt;!&ndash; Maybe we could also group these 2 tabs in a single one called accessories &ndash;&gt;-->
<!--                                        &lt;!&ndash; Would need to take consider the v-if conditions... &ndash;&gt;-->
<!--                                        &lt;!&ndash; <li class="tab" v-if="(this.hasGlasses || this.hasFacialHair)" v-on:click="openTab($event, 'accessoriesSelect')">-->
<!--                                            <a>Accessories</a>-->
<!--                                        </li> &ndash;&gt;-->
<!--                                        <li class="tab" id="glassesTab" v-if="this.hasGlasses" v-on:click="openTab('glassesTab', 'glassesSelect')">-->
<!--                                            <a>{{this.labels.glassesTab}}</a>-->
<!--                                        </li>-->
<!--                                        <li class="tab" id="facialHairTab" v-if="this.hasFacialHair" v-on:click="openTab('facialHairTab', 'facialHairSelect')">-->
<!--                                            <a>{{this.labels.facialHairTab}}</a>-->
<!--                                        </li>-->
<!--                                    </ul>-->
<!--                                </div>-->


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
                                        <Compact
                                                :value="this.currentColorHair"
                                                @input="this.changeHairColor"
                                                :palette="hairColors"/>
                                        <div style="display: flex; justify-content: space-between">
                                            <button style="margin: 10px" class="button" v-on:click="showSpectrum(0)">Chrome (vue-color)</button>
                                            <button style="margin: 10px" class="button" v-on:click="showSpectrum(1)">Radical Color Picker</button>
                                            <button style="margin: 10px" class="button" v-on:click="showSpectrum(2)">Vuetify color picker</button>
                                        </div>

                                        <div v-if="isSpectrumActive" style="position: fixed;top: 230px;">
                                            <Chrome  :value="this.currentColorHair"
                                                    @input="this.changeHairColor"/>
                                            <button class="button" v-on:click="addColorToSpectrum">Valider</button>
                                        </div>

                                        <ColorPicker v-model="colorToShow" v-if="isRadicalColorPickerActive" @input="this.getColorInHex"></ColorPicker>
                                        <v-color-picker v-if="isVueColorActive"
                                                        @input="this.changeHairColor"
                                                :hide-canvas="false"
                                                :hide-inputs="true"
                                                :show-swatches="false"
                                                class="mx-auto"
                                        ></v-color-picker>
                                    </div>


                                <!-- Glasses -->
                                <div id="glassesSelect" style="justify-content: center;" class="content-tab buttons" v-if="this.hasGlasses">
                                    <ul>
                                        <li class="accessoriesList button" style="overflow: hidden" v-on:click="selectGlasses(-1)">None</li>
                                        <li class="accessoriesList button" style="overflow: hidden" v-for="(glasses, index) in glassesListJson" :key="index" v-on:click="selectGlasses(index)" v-html="require(`../assets/glasses/${glasses.file}`)"></li>
                                    </ul>
                                </div>

                                <!-- Facial hair -->
                                <div id="facialHairSelect" style="justify-content: center;" class="content-tab buttons" v-if="this.hasFacialHair">
                                    <ul>
                                        <li class="accessoriesList button" style="overflow: hidden" v-on:click="selectBeards(-1)">None</li>
                                        <li class="accessoriesList button facialHairList"  style="overflow: hidden" v-for="(beard, index) in facialHairListJson" :key="index" v-html="require(`../assets/facialHair/${beard.file}`)" v-on:click="selectBeards(index)"></li>
                                    </ul>
                                </div>
<!--=======-->
<!--                                    &lt;!&ndash; Glasses &ndash;&gt;-->
<!--                                    <div id="glassesSelect" style="justify-content: center;" class="content-tab buttons" v-if="this.hasGlasses">-->
<!--                                        <ul>-->
<!--                                            <li class="accessoriesList button" style="overflow: hidden" v-on:click="selectGlasses(-1)">None</li>-->
<!--                                            <li class="accessoriesList button" style="overflow: hidden" v-for="(glasses, index) in glassesListJson" v-on:click="selectGlasses(index)" v-html="require(`../assets/glasses/${glasses.file}`)"></li>-->
<!--                                        </ul>-->
<!--                                    </div>-->

<!--                                    &lt;!&ndash; Facial hair &ndash;&gt;-->
<!--                                    <div id="facialHairSelect" style="justify-content: center;" class="content-tab buttons" v-if="this.hasFacialHair">-->
<!--                                        <ul>-->
<!--                                            <li class="accessoriesList button" style="overflow: hidden" v-on:click="selectBeards(-1)">None</li>-->
<!--                                            <li class="accessoriesList button facialHairList"  style="overflow: hidden" v-for="(beard, index) in facialHairListJson" v-html="require(`../assets/facialHair/${beard.file}`)" v-on:click="selectBeards(index)"></li>-->
<!--                                        </ul>-->
<!--                                    </div>-->
<!--&gt;>>>>>> herdimm-data-->

                                </div>
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
    import { Compact, Chrome }  from "vue-color";
    import ColorPicker from '@radial-color-picker/vue-color-picker';


    export default {
        name: "Modal",
        components: {
            Character,
            Compact,
            Chrome,
            ColorPicker
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

                hasHair: false,
                hasFacialHair: false,
                hasGlasses: false,

                isSpectrumActive: false,
                isRadicalColorPickerActive: false,
                colorToShow: {},
                isVueColorActive: false,

                isActive: false,
                isDropdownActive: false,
                isEdit: false,
                isBeardsButtonEnable: false,
                isGlassesButtonEnable: false,
                isHairColorButtonEnable: false,
                isFaceColorButtonEnable: false,
                isCharacterVulnerable: false,

                glassesList: [],
                beardsList: [],
                characterName: "",
                currentCharacterNumber: 0,
                avatarNbr: 0,
                vulnerableNbr: 0,
                options: [],
                endCharacterTime: 0,
                characterTimeEdition: 0,
                characterTimeCreation: 0,
                numberOfEdition: 0
            }
        },
        props: {
            labels: Object,
            glassesListJson: Array,
            facialHairListJson: Array,
            totalCharactersCount: Number,
            vulnerableOptions: Array,
            skinColors: Array,
            hairColors: Array,
            defaultCharacterColors: Object,

        },
        methods: {
            hslToHex(h, s, l) {
                h /= 360;
                s /= 100;
                l /= 100;
                let r, g, b;
                if (s === 0) {
                    r = g = b = l; // achromatic
                } else {
                    const hue2rgb = (p, q, t) => {
                        if (t < 0) t += 1;
                        if (t > 1) t -= 1;
                        if (t < 1 / 6) return p + (q - p) * 6 * t;
                        if (t < 1 / 2) return q;
                        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                        return p;
                    };
                    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                    const p = 2 * l - q;
                    r = hue2rgb(p, q, h + 1 / 3);
                    g = hue2rgb(p, q, h);
                    b = hue2rgb(p, q, h - 1 / 3);
                }
                const toHex = x => {
                    const hex = Math.round(x * 255).toString(16);
                    return hex.length === 1 ? '0' + hex : hex;
                };
                return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
            },
            getColorInHex(hue) {
                const color = this.hslToHex(hue, 100, 50);
                this.currentColorHair = color;
                this.$refs.character.changeHairColor(color);
            },
            addColorToSpectrum() {
                this.isSpectrumActive = false;
                this.hairColors.push(this.currentColorHair);
            },
            showSpectrum(index) {
                if (index === 0) {
                    this.isSpectrumActive = !this.isSpectrumActive;
                    this.isRadicalColorPickerActive = false;
                    this.isVueColorActive = false;
                } else if (index === 1) {
                    this.isSpectrumActive = false;
                    this.isRadicalColorPickerActive = !this.isRadicalColorPickerActive;
                    this.isVueColorActive = false;
                } else {
                    this.isSpectrumActive = false;
                    this.isRadicalColorPickerActive = false;
                    this.isVueColorActive = !this.isVueColorActive;
                }
            },

            /**
             * ---> calculate time spend for a user to create a character
             * @param  none
             * @return none
             */
            calculateTimeCharacter() {
                let startCharacterTime = this.startCharacterTime;
                console.log("startCharacterTime", startCharacterTime);
                let  spendTime = Math.round((this.endCharacterTime - startCharacterTime));
                console.log("spendTime", spendTime);
                this.$refs.character.setCharacterTimeCreation(spendTime);
            },
            /***
             *--> Check if the current character is vulnerable or not
             * @return {Boolean} isCharacterVulnerable
             **/
            checkCharacterVulnerable(index) {
                return index >= this.avatarNbr &&
                    index < this.vulnerableNbr + this.avatarNbr;
            },
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
             * @param {Number} nbrVulnerable
             * @param {Number} nbrAvatar
             * @param {Boolean} isEdit
             * @param {String} label
             * @return none
             */
            openModal(index, character, totalCreated, nbrVulnerable, nbrAvatar, isEdit, label) {
                this.startCharacterTime = Date.now();
                console.log("temps de debut",this.startCharacterTime);
                this.modalTitle = this.getModalTitle(index, label, nbrVulnerable);
                this.currentCharacter = require(`../assets/characters/${character.file}`);
                this.currentCharacterObject = character;

                this.isActive = true;
                this.isEdit = isEdit;
                // this.isEdit ? this.currentCharacterNumber = index : this.currentCharacterNumber = totalCreated;
                this.currentCharacterNumber = totalCreated;
                this.avatarNbr = nbrAvatar;
                this.vulnerableNbr = nbrVulnerable;
                this.isCharacterVulnerable = this.checkCharacterVulnerable(this.currentCharacterNumber);
                this.resetVulnerableOption();
                this.setCharacterColors(isEdit, character, totalCreated < nbrAvatar, index);

                // Display the skin tab content when opening modal window
                this.openTab("skinColorTab", "skinColorSelect");
            },

            /**
             * ---> Apply character attributes when edit or default attributes when create
             * @param {Boolean} isEdit
             * @param {Object} character
             * @param {Boolean} isAvatar
             * @param {number} index
             * @return none
             */
            setCharacterColors(isEdit, character, isAvatar, index) {
                if (isEdit) {
                    this.isCharacterVulnerable = this.checkCharacterVulnerable(index);
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
                    isAvatar ? this.currentShirt = this.defaultCharacterColors.ShirtColorAvatar  :
                        this.currentShirt = this.defaultCharacterColors.ShirtColorCharacters;
                    this.currentColorFace = this.defaultCharacterColors.SkinColor;
                    this.currentColorHair = this.defaultCharacterColors.HairColor;
                    this.currentGlasses = -1;
                    this.currentBeard = -1;
                }
            },

            /**
             * ---> Set user input (name) for the current character
             * @param {String} name
             * @return none
             */
            setCharacterName(name) {
                this.$refs.character.setCharacterName(name);
            },

            /***
             * --> Set character option
             * @param {String} name
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
                this.characterName = "";
            },

            /**
             * ---> Manage character name if user type a name or not and save the character in the group list
             * @param none
             * @return none
             */
            saveCharacter() {
                if (this.isCharacterVulnerable) {
                    this.$refs.character.setCharacterOption(this.options);
                }
                if (this.avatarNbr > this.currentCharacterNumber && !this.characterName) {
                this.setCharacterName(this.labels.avatarName);
                }
                else if (!this.characterName)
                    this.setCharacterName(this.labels.defaultCharacterName + " " + (this.currentCharacterNumber + 1));
                this.endCharacterTime = Date.now();
                this.calculateTimeCharacter();
                this.$parent.saveCharacter(this.currentCharacterObject, this.$refs.character.getSvgColor());
                this.closeModal();
            },

            /**
             * ---> Save the edited character in the group list
             * @param none
             * @return none
             */
            saveEditCharacter() {
                //temps de modification pour un caractere

                this.endCharacterTime = Date.now();
                let startCharacterTime = this.startCharacterTime;
                console.log("startCharacterTime", startCharacterTime);
                let spendTime = Math.round((this.endCharacterTime - startCharacterTime));
                this.$refs.character.setCharacterTimeEdition(spendTime);
                this.$parent.editCharacter(this.currentCharacterObject, this.$refs.character.getSvgColor());
                console.log(this.$refs.character.getSvgColor().characterTimeEdition);
                this.closeModal();
            },

            /**
             * ---> Set accessories tabs
             * @param {Boolean} hasGlasses
             * @param {Boolean} hasBeard
             * @param {Boolean} hasHair
             * @return none
             */
            setAccessories(hasGlasses, hasBeard, hasHair) {
                this.hasGlasses = hasGlasses;
                this.hasFacialHair = hasBeard;
                this.hasHair = hasHair;
            },

            /**
             * ---> Set the glasses list show on the modal
             * @param {Array} glasses
             * @return none
             */
            setGlassesList(glasses) {
                this.glassesList = glasses;
            },

            /**
             * ---> Set the beards list show on the modal
             * @param {Array} beards
             * @return none
             */
            setBeardsList(beards) {
                this.beardsList = beards;
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

            /**
             * ---> Reset character attributes
             * @param none
             * @return none
             */
            resetDefault() {
                this.currentColorFace = this.defaultCharacterColors.SkinColor;
                this.currentColorHair = this.defaultCharacterColors.HairColor;
                this.$refs.character.resetFaceColor();
                this.$refs.character.changeFaceColor(this.currentColorFace);
                this.$refs.character.changeHairColor(this.currentColorHair);
                this.$refs.character.changeGlasses(-1);
                this.$refs.character.changeBeard(-1);
                this.resetVulnerableOption();
            },

            /***
             * --> set checked button based on the option name
             * @param {String} name
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
                    if (accessories[i].innerHTML !== "None") {
                        let item = accessories[i].children[0];
                        item.setAttribute("height", height);
                        item.setAttribute("style", `margin-top: ${marginTop};`);
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
             * @param {String} color
             * @return none
             */
            changeHairColor(color) {
                this.currentColorHair = color.hex;
                this.$refs.character.changeHairColor(color.hex);
            },

            /**
             * ---> Get modal title based on the position of the character to create/edit
             * @param {Number} index
             * @param {String} verb
             * @param {Number} nbVulnerable
             * @return {String} modal Title
             */
            getModalTitle(index, verb, nbVulnerable) {
                return (index === 0 ?  `${verb} ${this.labels.avatar}` : index <= nbVulnerable ? `${verb} ${this.labels.vulnerable}` : `${verb} ${this.labels.otherPeople}`);
            },
        },
        mounted() {
            // this.resetVulnerableOption();
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
            // this.calculateTimeForACharacter();
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
        margin: 0 auto;
        min-width: 115px;
        margin-right: auto !important;
        margin-bottom: 10px;
    }
    .mobile-modal {
        margin-top: calc(20vh - 40px);
    }
    span.facialHairList {
        height: 60px;
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
    .radio-list {
        margin-top: 2vh;
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
