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
                idCharacter: String
            },
            defaultColor: '',
        };
    },
    props: {
        color: String,
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
                `.st2_custom_${this.$refs.characterImg.children[0].id}{fill:${this.svgColor.face}}
                .st3_custom_${this.$refs.characterImg.children[0].id}{fill:${this.svgColor.faceShadow}}`;
        },
        changeHairColor(color){
            this.svgColor.hairFront = color;
            this.svgColor.hairBack = this.getDarkerShade(color);
            this.$refs.characterImg.children[0].children[0].innerHTML = this.$refs.characterImg.children[0].children[0].innerHTML +
                `.st5_custom_${this.$refs.characterImg.children[0].id}{fill:${this.svgColor.hairFront}}
                .st4_custom_${this.$refs.characterImg.children[0].id}{fill:${this.svgColor.hairBack}}`;
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
        loadSvgDatas() {
            if (this.svg) {
                if (this.customised) {
                    let characterId = this.$refs.characterImg.children[0].id;
                    this.$refs.characterImg.children[0].children[3].classList.remove("st2");
                    this.$refs.characterImg.children[0].children[4].classList.remove("st3");
                    this.$refs.characterImg.children[0].children[5].classList.remove("st4");
                    this.$refs.characterImg.children[0].children[6].classList.remove("st5");
                    this.$refs.characterImg.children[0].children[3].classList.add("st2_custom_" + characterId);
                    this.$refs.characterImg.children[0].children[4].classList.add("st3_custom_" + characterId);
                    this.$refs.characterImg.children[0].children[5].classList.add("st4_custom_" + characterId);
                    this.$refs.characterImg.children[0].children[6].classList.add("st5_custom_" + characterId);
                    this.changeFaceColor(this.colors.face);
                    this.changeHairColor(this.colors.hairFront);
                    this.defaultColor = this.$refs.characterImg.children[0].children[0].innerHTML;
                }
            }
        },
        updateCurrentSvg() {
            this.svg = this.svgFile;
        },
        // methods to parse glasses
        // methods to parse all facial parts(face, hair)
    },
    created() {
        this.updateCurrentSvg();
    },
    mounted() {
        this.loadSvgDatas();
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
