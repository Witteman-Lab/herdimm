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
            svgFile: String,
            id: Number
        },
        methods: {
            changeFaceColor(color) {
                this.svgColor.face = color;
                this.characterInstance.innerHTML =
                    this.characterInstance.innerHTML + `.cls-3{fill:${this.svgColor.face}}`;
            },
            changeHairColor(color){
                this.svgColor.hairFront = color;
                this.svgColor.hairBack = color;
                this.characterInstance.innerHTML = this.characterInstance.innerHTML +
                    `.cls-5{fill:${this.svgColor.hairFront}}.cls-6{fill:${this.svgColor.hairBack}}`;
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
            createYourCharacter() {
                this.$parent.launchModal(this.id);
            },
            loadSvgDatas() {
                if (this.svg) {
                    this.characterInstance = this.$refs.characterImg.children[0].children[0].children[0];
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
