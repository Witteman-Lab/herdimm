<template>
    <div>
        <div class="character-position">
            <div v-on:click="createYourCharacter" ref="characterImg" v-html="this.svg" :style="{width: this.width, height: this.height}" style="width: 70px;"></div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        name: "Character",
        data() {
            return {
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
                    beards: ''
                },
                glasses: [],
                beards: [],
                defaultColor: '',
                hasBeard: false,
                hasGlasses: false,
                hasHair: false,
                isLoaded: false
            };
        },
        props: {
            svgFile: String,
            id: String,
            customised: Boolean,
            colors: Object,
            edit: Boolean,
            size: Object
        },
        methods: {
            // METHOD DESCRIPTION
            changeShirtColor(color) {
                this.svgColor.shirt = color;
                this.svgColor.shirtShadow = this.getDarkerShade(color);
                this.$refs.characterImg.children[0].children[0].innerHTML +=
                    `.st0_custom_${this.id}{fill:${this.svgColor.shirt};}.st1_custom_${this.id}{fill:${this.svgColor.shirtShadow};}`;
            },

            // METHOD DESCRIPTION
            changeFaceColor(color) {
                this.svgColor.face = color;
                this.svgColor.faceShadow = this.getDarkerShade(color);
                this.$refs.characterImg.children[0].children[0].innerHTML +=
                    `.st2_custom_${this.id}{fill:${this.svgColor.face};}.st3_custom_${this.id}{fill:${this.svgColor.faceShadow};}`;
            },

            // METHOD DESCRIPTION
            changeHairColor(color){
                this.svgColor.hairFront = color;
                this.svgColor.hairBack = this.getDarkerShade(color);
                this.$refs.characterImg.children[0].children[0].innerHTML +=
                    `.st5_custom_${this.id}{fill:${this.svgColor.hairFront};}.st4_custom_${this.id}{fill:${this.svgColor.hairBack};}`;
            },

            // METHOD DESCRIPTION
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

            // METHOD DESCRIPTION
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

            // METHOD DESCRIPTION
            resetFaceColor(){
                this.$refs.characterImg.children[0].children[0].innerHTML = this.defaultColor;
            },

            // METHOD DESCRIPTION
            getSvgColor() {
                return this.svgColor
            },

            // For getting a darker shade for the hair or skin
            // To-do: That method could be optimized later
            getDarkerShade(selectedColorToHex) {
                const proportion = 0.8;

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

            // METHOD DESCRIPTION
            createYourCharacter() {
                if (this.edit) {
                    this.$parent.launchModal(this.id);
                }
            },

            // METHOD DESCRIPTION
            editCharacterColors(colors) {
                this.changeFaceColor(colors.face);
                this.changeHairColor(colors.hairFront);
                this.changeGlasses(colors.glasses);
                this.changeBeard(colors.beards);
                this.changeShirtColor(colors.shirt);
            },

            // METHOD DESCRIPTION
            loadSvgData() {
                if (this.svg) {
                    this.width = this.size.width;
                    this.height = this.size.height;
                    if (this.customised) {
                        this.parseCharacterAttributes();
                        this.editCharacterColors(this.colors);
                        this.defaultColor = this.$refs.characterImg.children[0].children[0].innerHTML;

                        // Why this?
                        if (this.$parent.$options.name === "Modal")
                            this.$parent.setAccessories(this.hasGlasses, this.hasBeard, this.hasHair);
                    }
                }
            },

            // st6 for glasses and beards
            manageAccessories(childrenPosition, accessory) {
                childrenPosition.classList.remove("st6");
                childrenPosition.classList.add("st6" + accessory + this.id);
                childrenPosition.style.display = "inline";
            },

            // METHOD DESCRIPTION
            manageGlasses(position) {
                let childrenPosition = this.$refs.characterImg.children[0].children[position];
                this.manageAccessories(childrenPosition, "_glasses_");

                // st7 glasses
                for (let i = 0; i < childrenPosition.children.length; i++) {
                    childrenPosition.children[i].classList.remove("st7");
                    childrenPosition.classList.add("st7_" + i +"_" + this.id);
                    childrenPosition.children[i].style.display = "none";
                    childrenPosition.children[i].setAttribute("id", "glasses_" + i +"_" + this.id);
                    this.glasses.push(childrenPosition.children[i].id);
                }
                this.hasGlasses = true;
            },

            // METHOD DESCRIPTION
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

            // METHOD DESCRIPTION
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

            // METHOD DESCRIPTION
            updateCurrentSvg() {
                this.svg = this.svgFile;
            }
        },
        created() {
            this.updateCurrentSvg();
        },
        mounted() {
            this.loadSvgData();
            this.isLoaded = true;
        },
        beforeUpdate() {
            this.updateCurrentSvg();
        }
    }
</script>

<style scoped>
    .character-position {
        display: block;
        float: left;
        margin: 0 auto;
        /* margin-right: auto;
        margin-left: auto; */
    }
</style>
