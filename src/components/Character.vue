<template>
    <div>
        <div style="display: block; float: left; margin-right: auto; margin-left: auto">
            <div v-on:click="createYourCharacter" ref="characterImg" v-html="this.svg" style="width: 70px; height: 95px;"></div>
        </div>
    </div>
</template>

<script>

export default {
    components: {
    },
    name: "Character",
    data() {
        return {
            svg: '',
            currentColor: '#FFFFFF',
            svgColor: {
                face: '',
                faceShadow: '',
                hairFront: '',
                hairBack: ''
            },
            characterInstance: '',
            defaultColor: '',
        };
    },
    props: {
        color: String,
        svgFile: String,
        id: String
    },
    methods: {
        changeFaceColor(color) {
            this.svgColor.face = color;
            this.svgColor.faceShadow = this.getDarkerShade(color);
            this.characterInstance.innerHTML =
            this.characterInstance.innerHTML + `.st2{fill:${this.svgColor.face}}.st3{fill:${this.svgColor.faceShadow}}`;
        },
        changeHairColor(color){
            this.svgColor.hairFront = color;
            this.svgColor.hairBack = this.getDarkerShade(color);
            this.characterInstance.innerHTML = this.characterInstance.innerHTML +
            `.st5{fill:${this.svgColor.hairFront}}.st4{fill:${this.svgColor.hairBack}}`;
        },
        resetFaceColor(){
            this.characterInstance.innerHTML = this.defaultColor;
        },
        getSvgColor() {
            return this.svgColor
        },
        getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
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
            console.log("createYourCharacter this.id", this.id);
            this.$parent.launchModal(this.id);
        },
        loadSvgDatas() {
            if (this.svg) {
                this.characterInstance = this.$refs.characterImg.children[0].children[0];
                this.defaultColor = this.characterInstance.innerHTML;
                this.changeFaceColor(this.getRandomColor());
                this.changeHairColor(this.getRandomColor());
            }
        },
        updateCurrentSvg() {
            this.svg = this.svgFile;
        }
    },
    created() {
        this.updateCurrentSvg()
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


</style>
