<template>
    <div>
        Character component
        <div style="display: flex; justify-content: center">
            <div ref="characterImg" v-html="this.svg" style="width: 128px; height: 119px;"></div>
        </div>
        <div style="display:flex; justify-content: center;">
            <slider-picker :value="this.currentColor" @input="this.updateValue"/>
        </div>
        <br/>
        <br/>
        <button v-on:click="this.resetFaceColor">Reset Color</button>
        <button v-on:click="this.changeFaceColor">Change Face Color</button>
        <button v-on:click="this.changeHairColor">Change Hair Color</button>
    </div>
</template>

<script>
    /* eslint-disable no-console */

    import { Slider } from 'vue-color';
    export default {

        components: {
            'slider-picker': Slider,
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
                defaultColor: ''
            };
        },
        props: {

        },
        methods: {
            updateValue(color) {
                console.log(color.hex);
                this.currentColor = color.hex;
            },
            changeFaceColor() {
                this.svgColor.face = this.currentColor;
                this.characterInstance.innerHTML =
                    this.characterInstance.innerHTML + `.cls-3{fill:${this.svgColor.face}}`;
            },
            changeHairColor(){
                this.svgColor.hairFront = this.currentColor;
                this.svgColor.hairBack = this.currentColor;
                this.characterInstance.innerHTML = this.characterInstance.innerHTML +
                    `.cls-5{fill:${this.svgColor.hairFront}}.cls-6{fill:${this.svgColor.hairBack}}`;
            },
            resetFaceColor(){
                this.characterInstance.innerHTML = this.defaultColor;
            }
        },
        created() {
            this.svg = require('../assets/F-1.svg');
        },
        mounted() {
           this.characterInstance = this.$refs.characterImg.children[0].children[0].children[0];
           this.defaultColor = this.characterInstance.innerHTML;
        },
        beforeUpdate() {
        }
    }
</script>

<style scoped>

</style>