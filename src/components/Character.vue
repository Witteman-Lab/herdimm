<template>
    <div>
        Character component
        <!---<div v-html="svg"></div>-->
        <div>
            <img src="../assets/F-1.svg" height="119" width="128"/>
            <simple-svg :filepath="svg" height="119" width="128"/>
        </div>
        <div style="display:flex; justify-content: center;">
            <slider-picker :value="this.colors" @input="this.updateValue"/>
        </div>
        <br/>
        <br/>
        <button>Select Color</button>
    </div>
</template>

<script>
    /* eslint-disable no-console */

    import { Slider } from 'vue-color';
    import {SimpleSVG} from 'vue-simple-svg';
    export default {

        components: {
            'slider-picker': Slider,
            'simple-svg': SimpleSVG
        },
        name: "Character",
        data() {
            return {
                svg: '../assets/F-1.svg',
                colors: '#000000',
            };
        },
        props: {

        },
        methods: {
            updateValue(color) {
                this.colors = color;
                console.log(color.hex);
            }
        },
        created() {
            this.svg = require('../assets/F-1.svg');
            console.log(this.svg);
        }
    }
</script>

<style scoped>

</style>