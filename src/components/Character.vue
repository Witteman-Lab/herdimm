<template>
    <div>
        Character component
        <!---<div v-html="svg"></div>-->
        <div>
            <img src="../assets/F-1.svg" height="119" width="128"/>
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

    export default {

        components: {
            'slider-picker': Slider
        },
        name: "Character",
        data() {
            return {
                svg: '',
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
         //   this.svg = require('resources/assets/images/svg/${this.name}.svg');
        }
    }
</script>

<style scoped>

</style>