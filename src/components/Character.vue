<template>
    <div>
        <div style="display: block; float: left; margin-right: auto; margin-left: auto">
            <div ref="characterImg" v-html="this.svg" style="width: 60px; height: 75px;"></div>
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
                svg: '../assets/F-1.svg',
                currentColor: '#FFFFFF',
                svgColor: {
                    face: '',
                    hairFront: '',
                    hairBack: ''
                },
                characterInstance: '',
                defaultColor: '',
            };
        },
        props: {
            color: String,
            svgFile: String
        },
        methods: {
            changeFaceColor() {
                this.svgColor.face = this.color;
                this.characterInstance.innerHTML =
                    this.characterInstance.innerHTML + `.cls-3{fill:${this.svgColor.face}}`;
            },
            changeHairColor(){
                this.svgColor.hairFront = this.color;
                this.svgColor.hairBack = this.color;
                this.characterInstance.innerHTML = this.characterInstance.innerHTML +
                    `.cls-5{fill:${this.svgColor.hairFront}}.cls-6{fill:${this.svgColor.hairBack}}`;
            },
            resetFaceColor(){
                this.characterInstance.innerHTML = this.defaultColor;
            },
            getSvgColor() {
                return this.svgColor
            }
        },
        created() {
            this.svg = this.svgFile;
        },
        mounted() {
            this.characterInstance = this.$refs.characterImg.children[0].children[0].children[0];
            this.defaultColor = this.characterInstance.innerHTML;
        },
    }
</script>

<style scoped>


</style>
