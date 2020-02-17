<template>
    <div>
        <div class="character-position" :style="{width: this.characterPositionWidth}">
            <div v-on:click="selectYourCharacter" ref="characterImg" v-html="this.svg" :style="{width: this.width, height: this.height}" style="margin: 5px auto auto auto;"></div>
            <span v-if="isName" style="white-space: nowrap;overflow: hidden; text-overflow: ellipsis;margin-bottom: 0.5em;color: #848484;font-size: 14px;">{{this.svgColor.name}}</span>
            <div style="display: flex;justify-content: center;">
                <div v-if="group" class="line"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        name: "Character",
        data() {
            return {
                characterPositionWidth: "",
                width: "0px",
                height: "0px",
                svg: '',
                currentColor: '#FFFFFF',
                svgColor: {
                    shirt: '',
                    shirtShadow: '',
                    face: '',
                    faceShadow: '',
                    hairFront: '',
                    hairBack: '',
                    idCharacter: String,
                    glasses: '',
                    beards: '',
                    accessoriesColor: '',
                    options: [],
                    characterTimeCreation: 0,
                    characterTimeEdition: 0,
                    numberOfEdition: 0
                },
                glassesList: [],
                beards: [],
                defaultColor: '',
                hasBeard: false,
                hasGlasses: false,
                hasHair: false,
                isLoaded: false,
            };
        },
        props: {
            svgFile: String,
            id: String,
            customised: Boolean,
            colors: Object,
            edit: Boolean,
            size: Object,
            isName: Boolean,
            changeAvatarState: Boolean,
            isModal: Boolean,
            setAccessories: Function,
            defaultColorForAllAvatarElements : String,
            group: Boolean
        },
        methods: {
            setCharacterTimeEdition(timeTotalEdition) {
              this.svgColor.characterTimeEdition += timeTotalEdition;
              this.svgColor.numberOfEdition++;
            },

            setCharacterTimeCreation(timeTotalCharacter) {
                this.svgColor.characterTimeCreation = timeTotalCharacter;
            },

            /***
             * ---> Change character options and save it in svgColor
             * @param {Array} options
             * @return none
             */
            setCharacterOption(options) {
                this.svgColor.options = options
            },

            /**
             * ---> Apply the color on the character shirt svg (style) with a given proportion
             * @param {String} color
             * @param {Number} proportion
             * @return none
             */
            changeShirtColor(color, proportion) {
                this.svgColor.shirt = color;
                this.svgColor.shirtShadow = this.getDarkerShade(color, proportion);
                this.$refs.characterImg.children[0].children[0].innerHTML +=
                    `.st0_custom_${this.id}{fill:${this.svgColor.shirt};}.st1_custom_${this.id}{fill:${this.svgColor.shirtShadow};}`;
            },

            /**
             * ---> Apply the color on the character shirt svg (style) with a given proportion
             * @param {String} color
             * @param {Number} proportion
             * @return none
             */
            changeAccessoriesColor(color, proportion) {
                this.svgColor.accessoriesColor = color;
                let darkerShadeAccessories  = this.getDarkerShade(color, proportion);
                this.$refs.characterImg.children[0].children[0].innerHTML +=
                    `.st8_custom_${this.id}{fill:${color};}.st9_custom_${this.id}{fill:${darkerShadeAccessories};}`;
            },

            /**
             * ---> Apply the color on the character face svg (style)
             * @param {String} color
             * @return none
             */
            changeFaceColor(color) {
                this.svgColor.face = color;
                this.svgColor.faceShadow = this.getDarkerShade(color, 0.8);
                this.$refs.characterImg.children[0].children[0].innerHTML +=
                    `.st2_custom_${this.id}{fill:${this.svgColor.face};}.st3_custom_${this.id}{fill:${this.svgColor.faceShadow};}`;
            },

            /**
             * ---> Apply the color on the character hair svg (style)
             * @param {String} color
             * @return none
             */
            changeHairColor(color){
                this.svgColor.hairFront = color;
                this.svgColor.hairBack = this.getDarkerShade(color, 0.8);
                this.$refs.characterImg.children[0].children[0].innerHTML +=
                    `.st5_custom_${this.id}{fill:${this.svgColor.hairFront};}.st4_custom_${this.id}{fill:${this.svgColor.hairBack};}`;
            },

            /**
             * ---> Choose the beard on the given position
             * @param {Number} pos
             * @return {Number} 0 (to end the function)
             */
            changeBeard(pos) {
                if (pos === undefined)
                    return 0;
                let currentBeards = "";
                for (let i = 0; i < this.$refs.characterImg.children[0].children.length; i++) {
                    let current_id = this.$refs.characterImg.children[0].children[i].id;
                    if (current_id === "facial-hair") {
                        for (let j = 0; j < this.$refs.characterImg.children[0].children[i].children.length; j++) {
                            if (j === pos) {
                                this.$refs.characterImg.children[0].children[i].children[j].style.display = "inline";
                                currentBeards = pos;
                            } else {
                                this.$refs.characterImg.children[0].children[i].children[j].style.display = "none";
                            }
                        }
                        this.svgColor.beards = currentBeards;
                        return 0;
                    }
                }
            },

            /**
             * ---> Choose the glasses on the given position
             * @param {Number} pos
             * @return {Number} 0 (to end the function)
             */
            changeGlasses(pos) {
                if (pos === undefined)
                    return 0;
                let currentGlasses = "";
                for (let i = 0; i < this.$refs.characterImg.children[0].children.length; i++) {
                    let current_id = this.$refs.characterImg.children[0].children[i].id;
                    if (current_id === "glasses") {
                        for (let j = 0; j < this.$refs.characterImg.children[0].children[i].children.length; j++) {
                            if (j === pos) {
                                this.$refs.characterImg.children[0].children[i].children[j].style.display = "inline";
                                currentGlasses = pos;
                            } else {
                                this.$refs.characterImg.children[0].children[i].children[j].style.display = "none";
                            }
                        }
                        this.svgColor.glasses = currentGlasses;
                        return 0;
                    }
                }
            },

            /**
             * ---> Reset colors and accessories
             * @param {} none
             * @return none
             */
            resetFaceColor() {
                this.$refs.characterImg.children[0].children[0].innerHTML = this.defaultColor;
            },

            /**
             * ---> Getter for all character properties (used to access character properties from another component)
             * @param {} none
             * @return {shirtShadow: (*|StringConstructor|String), hairBack: (*|StringConstructor|String), glasses: (*|StringConstructor|String), accessoriesColor: (*|StringConstructor|String), face: (*|StringConstructor|String), hairFront: (*|StringConstructor|String), shirt: (*|StringConstructor|String), idCharacter: StringConstructor, faceShadow: (*|StringConstructor|String), beards: (*|StringConstructor|String)}
             */
            getSvgColorForChangeAvatar() {
                return {
                    shirt: this.defaultColorForAllAvatarElements,
                    shirtShadow: this.defaultColorForAllAvatarElements,
                    face: this.defaultColorForAllAvatarElements,
                    faceShadow: this.defaultColorForAllAvatarElements,
                    hairFront: this.defaultColorForAllAvatarElements,
                    hairBack: this.defaultColorForAllAvatarElements,
                    idCharacter: String,
                    glasses: this.defaultColorForAllAvatarElements,
                    beards: this.defaultColorForAllAvatarElements,
                    accessoriesColor: this.defaultColorForAllAvatarElements
                };
            },


            /**
             * ---> Getter for all character properties ( used to access character properties from another component )
             * @param {} none
             * @return svgColor
             */
            getSvgColor() {
                return this.svgColor;
            },

            /**
             * ---> For getting a darker shade for the hair, skin, face and shirt
             * --->  To-do: That method could be optimized later
             * @param {String} selectedColorToHex
             * @param {Number} proportion
             * @return {String} color
             */
            getDarkerShade(selectedColorToHex, proportion) {
                // const proportion = 0.8;

                let red 	= selectedColorToHex.substr(1,2);
                let green 	= selectedColorToHex.substr(3,2);
                let blue 	= selectedColorToHex.substr(5,2);

                let dec_red 	= parseInt(red, 16);
                let dec_green 	= parseInt(green, 16);
                let dec_blue 	= parseInt(blue, 16);

                dec_red 	*= proportion;
                dec_green 	*= proportion;
                dec_blue 	*= proportion;

                dec_red = Math.round(dec_red);
                dec_green = Math.round(dec_green);
                dec_blue = Math.round(dec_blue);

                let hex_red 	= dec_red.toString(16);
                let hex_green 	= dec_green.toString(16);
                let hex_blue 	= dec_blue.toString(16);

                // 0 left padding
                if (hex_red.length === 1) {
                    hex_red = "0" + hex_red.toString();
                }
                if (hex_green.length === 1) {
                    hex_green = "0" + hex_green.toString();
                }
                if (hex_blue.length === 1) {
                    hex_blue = "0" + hex_blue.toString();
                }

                return "#" + hex_red + hex_green + hex_blue;
            },

            /**
             * ---> Load Modal to create or edit your character
             * @param {} none
             * @return none
             */
            selectYourCharacter() {
                if (this.edit) {
                    this.$parent.launchModal(this.id);
                }
            },


            /**
             * ---> Apply properties on the character (colors is most likely given as props)
             * @param {Object} colors
             * @return none
             */
            editCharacterColors(colors) {
                this.changeFaceColor(colors.face);
                this.changeHairColor(colors.hairFront);
                this.changeGlasses(colors.glasses);
                this.changeBeard(colors.beards);
                this.changeShirtColor(colors.shirt, 0.8);
                this.changeAccessoriesColor(colors.accessoriesColor, 0.8);
                this.setCharacterOption(colors.options);
                this.setCharacterTimeCreation(colors.characterTimeCreation);
                this.svgColor.numberOfEdition = colors.numberOfEdition;
                this.svgColor.characterTimeEdition = colors.characterTimeEdition;
            },

            /**
             * ---> Load svg into component and apply properties (if given as prop)
             * @param {} none
             * @return none
             */
            loadSvgData() {
                if (this.svg) {
                    this.width = this.size.width;
                    this.height = this.size.height;
                    if (this.customised) {
                        this.parseCharacterAttributes();
                        this.editCharacterColors(this.colors);
                        this.defaultColor = this.$refs.characterImg.children[0].children[0].innerHTML;

                        // Set Modal content after knowing if the character has glasses, has hair or beard
                        if (this.isModal)
                            this.setAccessories(this.hasGlasses, this.hasBeard, this.hasHair, this.glassesList);
                    }
                }
            },


            /**
             * ---> st6 for glasses and beards
             * @param {Object} childrenPosition
             * @param {Object} accessory
             * @return none
             */
            manageAccessories(childrenPosition, accessory) {
                childrenPosition.classList.remove("st6");
                childrenPosition.classList.add("st6" + accessory + this.id);
                childrenPosition.style.display = "inline";
            },

            /**
             * ---> Modify svg character style in order to apply glasses
             * @param {Number} position
             * @return none
             */
            manageGlasses(position) {
                let childrenPosition = this.$refs.characterImg.children[0].children[position];
                this.manageAccessories(childrenPosition, "_glasses_");

                // st7 glasses
                for (let i = 0; i < childrenPosition.children.length; i++) {
                    childrenPosition.children[i].classList.remove("st7");
                    childrenPosition.classList.add("st7_" + i +"_" + this.id);
                    childrenPosition.children[i].style.display = "none";
                    this.glassesList.push(childrenPosition.children[i].id);
                }
                this.hasGlasses = true;
            },

            /**
             * ---> Modify svg character style in order to apply beards
             * @param {Number} position
             * @return none
             */
            manageBeards(position) {
                let childrenPosition = this.$refs.characterImg.children[0].children[position];
                this.manageAccessories(childrenPosition, "_beards_");

                // st8 beards
                for (let i = 0; i < childrenPosition.children.length; i++) {
                    if (childrenPosition.children[i].classList.value === "st7") {
                        childrenPosition.children[i].classList.remove("st7");
                        childrenPosition.children[i].classList.add("st8");
                        for (let j = 0; j < childrenPosition.children[i].children.length; j++) {
                            childrenPosition.children[i].children[j].classList.remove("st5");
                            childrenPosition.children[i].children[j].classList.add("st5_custom_" + this.id);
                        }
                    }
                    childrenPosition.children[i].classList.remove("st5");
                    childrenPosition.children[i].classList.add("st5_custom_" + this.id);
                    childrenPosition.children[i].classList.remove("st8");
                    childrenPosition.children[i].classList.add("st8_" + i +"_" + this.id);
                    childrenPosition.children[i].style.display = "none";
                    childrenPosition.children[i].setAttribute("id", "beards_" + i +"_" + this.id);
                    this.beards.push(childrenPosition.children[i].id);
                }
                this.hasBeard = true;
            },

            /**
             * ---> Modify svg character style in order to apply face, shirt and hair color
             * @param {} none
             * @return none
             */
            parseCharacterAttributes() {
                let characterImgSVG = this.$refs.characterImg.children[0];

                for (let i = 0; i < characterImgSVG.children.length; i++) {
                    let id = characterImgSVG.children[i].id;
                    let classValue = characterImgSVG.children[i].classList.value;

                    // Detect the presence of hair on the character
                    if (["st4", "st5"].includes(classValue)) {
                        if (!this.hasHair) {
                            this.hasHair = true;
                        }
                    }

                    // Because we don't need to change class names of these (none, st0, and st1)
                    if (![""].includes(classValue)) {
                        characterImgSVG.children[i].classList.remove(classValue);
                        characterImgSVG.children[i].classList.add(classValue + "_custom_" + this.id);
                    }

                    // Because glasses and facial hair are grouped in <g> elements with ids
                    if (id === "glasses") {
                        this.manageGlasses(i);
                    } else if (id === "facial-hair") {
                        this.manageBeards(i);
                    }
                    characterImgSVG.children[0].innerHTML = "";
                }
            },

            /**
             * ---> Update svg in case color doesn't apply
             * @param {} none
             * @return none
             */
            updateCurrentSvg() {
                this.svg = this.svgFile;
            }
        },
        created() {
            this.updateCurrentSvg();
        },
        mounted() {
            this.loadSvgData();
            if (!this.isName)
                this.characterPositionWidth = this.width;
            this.isLoaded = true;
        },
        beforeUpdate() {
            this.updateCurrentSvg();
        }
    }
</script>

<style scoped>
    .line {
        border: 0.08rem solid #888888;
        width: 60px;
    }
    .character-position {
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-left: auto;
        cursor: pointer;
    }
</style>
