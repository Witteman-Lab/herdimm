<template>
    <div>
        <div class="character-position">
            <div v-on:click="createYourCharacter" ref="characterImg" v-html="this.svg" style="width: 70px; height: 95px;"></div>
        </div>
    </div>
</template>

<script>

    export default {
        components: {},
        name: "Character",
        data() {
            return {
                svg: '',
                currentColor: '#FFFFFF',
                svgColor: {
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
            };
        },
        props: {
            svgFile: String,
            id: String,
            customised: Boolean,
            colors: Object
        },
        methods: {
            changeFaceColor(color) {
                this.svgColor.face = color;
                this.svgColor.faceShadow = this.getDarkerShade(color);
                this.$refs.characterImg.children[0].children[0].innerHTML = this.$refs.characterImg.children[0].children[0].innerHTML +
                    `.st2_custom_${this.id}{fill:${this.svgColor.face}}.st3_custom_${this.id}{fill:${this.svgColor.faceShadow}}`;
            },
            changeHairColor(color){
                this.svgColor.hairFront = color;
                this.svgColor.hairBack = this.getDarkerShade(color);
                this.$refs.characterImg.children[0].children[0].innerHTML = this.$refs.characterImg.children[0].children[0].innerHTML +
                    `.st5_custom_${this.id}{fill:${this.svgColor.hairFront}}.st4_custom_${this.id}{fill:${this.svgColor.hairBack}}`;
            },
            changeBeard(id) {
                for (let i = 0; i < this.$refs.characterImg.children.length; i++) {
                    let id = this.$refs.characterImg.children[0].children[i].id;
                    if (id === "beards") {
                        for (let j = 0; j < this.$refs.characterImg.children[0].children[i].length; j++) {
                            if (this.$refs.characterImg.children[0].children[i].children[j].id === id) {
                                this.$refs.characterImg.children[0].children[i].children[j].style.display = "inline";
                            } else {
                                this.$refs.characterImg.children[0].children[i].children[j].style.display = "none";
                            }
                        }
                        return 0;
                    }
                }
            },
            changeGlasses(pos) {
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
            resetFaceColor(){
                this.$refs.characterImg.children[0].children[0].innerHTML = this.defaultColor;
            },
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
            createYourCharacter() {
                if (!this.customised) {
                    this.$parent.launchModal(this.id);
                }
            },
            loadSvgData() {
                if (this.svg) {
                    if (this.customised) {
                        this.parseCharacterAttributes();
                        this.changeFaceColor(this.colors.face);
                        this.changeHairColor(this.colors.hairFront);
                        this.changeGlasses(this.colors.glasses);
                        this.defaultColor = this.$refs.characterImg.children[0].children[0].innerHTML;
                    }
                }
            },
            // st6 for glasses and beards
            manageGlasses(position) {
                // st7 glasses
                this.$refs.characterImg.children[0].children[position].classList.remove("st6");
                this.$refs.characterImg.children[0].children[position].classList.add("st6_glasses_" + this.id);
                this.$refs.characterImg.children[0].children[position].style.display = "inline";
                //console.log(this.$refs.characterImg.children[0].children[position].children.length);
                for (let i = 0; i < this.$refs.characterImg.children[0].children[position].children.length; i++) {
                    this.$refs.characterImg.children[0].children[position].children[i].classList.remove("st7");
                    this.$refs.characterImg.children[0].children[position].children[i].classList.add("st7_" + i +"_" + this.id);
                    this.$refs.characterImg.children[0].children[position].children[i].style.display = "none";
                    this.$refs.characterImg.children[0].children[position].children[i].setAttribute("id", "glasses_" + i +"_" + this.id);
                    this.glasses.push(this.$refs.characterImg.children[0].children[position].children[i].id);
                }
                this.glasses.push("None");

                if (this.$parent.$options.name === "home")
                    this.$parent.setGlassesList(this.glasses);
            },
            manageBeards(position) {
                // st8 beards
                this.$refs.characterImg.children[0].children[position].classList.remove("st6");
                this.$refs.characterImg.children[0].children[position].classList.add("st6_beards_" + this.id);
                this.$refs.characterImg.children[0].children[position].style.display = "none";
                for (let i = 0; i < this.$refs.characterImg.children[0].children[position].children.length; i++) {
                    this.$refs.characterImg.children[0].children[position].children[i].classList.remove("st8");
                    this.$refs.characterImg.children[0].children[position].children[i].classList.add("st8_" + i +"_" + this.id);
                    this.$refs.characterImg.children[0].children[position].children[i].style.display = "none";
                    this.$refs.characterImg.children[0].children[position].children[i].setAttribute("id", "beards_" + i +"_" + this.id);
                    this.beards.push(this.$refs.characterImg.children[0].children[position].children[i].id);
                }
                if (this.$parent.$options.name === "home")
                    this.$parent.setBeardsList(this.beards);
            },
            parseCharacterAttributes() {
                //console.log("Character id :" + this.$refs.characterImg.children[0].id);
                for (let i = 0; i < this.$refs.characterImg.children[0].children.length; i++) {
                    let id = this.$refs.characterImg.children[0].children[i].id;
                    if (id === "face") {
                        this.$refs.characterImg.children[0].children[i].classList.remove("st2");
                        this.$refs.characterImg.children[0].children[i].classList.add("st2_custom_" + this.id);
                    } else if (id === "face-shadow") {
                        this.$refs.characterImg.children[0].children[i].classList.remove("st3");
                        this.$refs.characterImg.children[0].children[i].classList.add("st3_custom_" + this.id);
                    } else if (id === "hair-dark") {
                        this.$refs.characterImg.children[0].children[i].classList.remove("st4");
                        this.$refs.characterImg.children[0].children[i].classList.add("st4_custom_" + this.id);
                    } else if (id === "hair-light") {
                        this.$refs.characterImg.children[0].children[i].classList.remove("st5");
                        this.$refs.characterImg.children[0].children[i].classList.add("st5_custom_" + this.id);
                    } else if (id === "glasses") {
                        this.manageGlasses(i);
                    } else if (id === "facial-hair") {
                        this.manageBeards(i);
                    }
                    //console.log("Attributes : " + this.$refs.characterImg.children[0].children[i].id)
                    this.$refs.characterImg.children[0].children[0].innerHTML = "";
                }
            },
            updateCurrentSvg() {
                this.svg = this.svgFile;
            }
            // methods to parse glasses
            // methods to parse all facial parts(face, hair)
        },
        created() {
            this.updateCurrentSvg();
        },
        mounted() {
            this.loadSvgData();
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
        margin-right: auto;
        margin-left: auto;
    }
</style>
