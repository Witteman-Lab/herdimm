<template>
  <div id="app">
    <div>
      <Character style="cursor: pointer"  ref="character" :svgFile="require('./assets/F-1.svg')" :color="this.currentColor" />
    </div>
    <div>
      <Character style="cursor: pointer"  ref="character" :svgFile="require('./assets/F-6.svg')" :color="this.currentColor" />
    </div>
    <div>
      <Character style="cursor: pointer"  ref="character" :svgFile="require('./assets/F-1.svg')" :color="this.currentColor" />
    </div>
    <br/>
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
  import Character from './components/Character.vue'
  import { Slider } from 'vue-color';

  export default {
    name: 'app',
    components: {
      Character,
      'slider-picker': Slider,
    },
    data() {
      return {
        currentColor: '#FFFFFF',
        tab:['test1', 'test2', 'test3'],
        currentCharacter: "character"
      };
    },
    methods: {
      updateValue(color) {
        this.currentColor = color.hex;
      },
      changeFaceColor() {
        this.$refs[this.currentCharacter].changeFaceColor();
      },
      changeHairColor(){
        this.$refs[this.currentCharacter].changeHairColor();
      },
      resetFaceColor(){
        this.$refs[this.currentCharacter].resetFaceColor();
      },
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
