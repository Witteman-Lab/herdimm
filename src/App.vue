<template>
  <div id="app">
        <section class="section">
            <div class="columns is-mobile  " style="padding: 2rem;" >
              <div class="column ">


             <!--
                  <Character  ref="character" :svgFile="require('./assets/F-1.svg')" :color="this.currentColor" />
                  <Character  ref="character" :svgFile="require('./assets/F-1.svg')" :color="this.currentColor" />
                  <Character  ref="character" :svgFile="require('./assets/F-1.svg')" :color="this.currentColor" />
                  <Character  ref="character" :svgFile="require('./assets/F-1.svg')" :color="this.currentColor" />
                  <Character  ref="character" :svgFile="require('./assets/F-1.svg')" :color="this.currentColor" />
                  <Character  ref="character" :svgFile="require('./assets/F-1.svg')" :color="this.currentColor" />
                  <div>
                      <CharacterList></CharacterList>
                  </div>
                  <br/>
                -->
              </div>

              <div class="column is-one-third " >
                  <div class="image " style="cursor: pointer">
                      <div class="image" v-on:click="launch">
                          <CharacterList></CharacterList>

                      </div>

                      <div class="modal" v-bind:class="{'is-active': isActive }" >
                          <div class="modal-background">
                              <div class="modal-card">
                                  <section class=" section">

                                      <div class=" modal-card head">

                                          <div class="dropdown is-center is-active">
                                              <div class="dropdown-trigger">
                                                  <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                                      <span>Hair color</span>
                                                        <span class="icon is-small">
                                                          <i class="fas fa-angle-down" aria-hidden="true"></i>
                                                        </span>
                                                  </button>
                                              </div>
                                              <div class="dropdown-content">

                                              </div>
                                              <div class="dropdown is-pulled-left is-active">
                                                  <div class="dropdown-trigger">
                                                      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                                          <span>Hair color</span>
                                                           <span class="icon is-small">
                                                          <i class="fas fa-angle-down" aria-hidden="true"></i>
                                                      </span>
                                                      </button>
                                                  </div>
                                                  <div class="dropdown-content">

                                                  </div>
                                            </div>
                                          </div>

                                      </div>
                                  </section>
                              </div>
                          </div>
                      </div>

                  </div>
              </div>
              <div class="column is-centered is-half-desktop is-half-mobile ">

                  <div  style="display: flex; justify-content: center" >
                      <slider-picker :value="this.currentColor" @input="this.updateValue"/>
                  </div>

                  <br/>
                  <br/>
                  <div class="buttons is-light is-centered">
                      <span class="button"  v-on:click="this.resetFaceColor">Reset Color</span>
                      <span class="button"  v-on:click="this.changeFaceColor">Change Face Color</span>
                      <span class="button"  v-on:click="this.changeHairColor">Change Hair Color</span>
                  </div>




              </div>
            </div>
     </section>
   </div>
</template>

<script>
    import Character from './components/Character.vue'
    import { Slider } from 'vue-color';
    import CharacterList from "./components/CharacterList";

    export default {
        name: 'app',
        el: '#launch-modal',
        components: {
            CharacterList,
            Character,
            'slider-picker': Slider,
        },
        data() {

            return {
                isActive: false,
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
            launch(){
                this.isActive =true;

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
