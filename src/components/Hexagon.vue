<template>
  <!-- Hexagon  -->
  <svg :class="shape.className" :id="shape.id" x="0px" y="0px"
       viewBox="0 0 512 512" xml:space="preserve" >

      <path class="base" d="M485.291,129.408l-224-128c-3.285-1.877-7.296-1.877-10.581,0l-224,128c-3.328,1.899-5.376,5.44-5.376,9.259v234.667
      c0,3.819,2.048,7.36,5.376,9.259l224,128c1.643,0.939,3.456,1.408,5.291,1.408s3.648-0.469,5.291-1.408l224-128
      c3.328-1.899,5.376-5.44,5.376-9.259V138.667C490.667,134.848,488.619,131.307,485.291,129.408z"
      />

      <g v-if="shape.isCharacter">
        <svg>
<!--          included in the  DOM but does not appear-->
          <Character :characterType="shape.character.characterType" v-bind:ref="shape.id" :size="{ width: characterSize }"
               :edit="false" :customised="true" :colors="shape.character.colors" :id="shape.character.id"
               :svgFile="require(`../assets/characters/${shape.character.file}`)" />
        </svg>
      </g>
  </svg>
</template>

<script>
import Character from "./Character";

export default {
  name: "Hexagon",
  components: {
    Character
  },

  props: {
    shape: Object,
    characterSize : String
  },

  created() {
    console.log(this.shape.isCharacter)
  }

}
</script>

<style scoped>
  .base{
    fill: grey;
  }
</style>