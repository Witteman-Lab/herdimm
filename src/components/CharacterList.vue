<template>
  <div class="grid-list-character">
    <progress
      v-if="!isCharactersListLoaded"
      class="progress is-large is-info"
      max="100"
    ></progress>
    <div v-for="(character, index) in this.characterList" :key="character.id">
      <Character 
        :size="{ width: '74px', height: '80px' }"
        :customised="true"
        :edit="true"
        ref="character"
        :id="character.id"
        :svgFile="svgFiles[index]"
        :defaultColorForAllAvatarElements="defaultCharacterColors"
        :colors="{
          face: defaultCharacterColors.SkinColor,
          hairFront: defaultCharacterColors.HairColor,
          shirt: defaultCharacterColors.ShirtColorCharacters,
          accessoriesColor: defaultCharacterColors.AccessoriesColor,
        }"
        :launch-modal="launchModal"
      />
    </div> 
  </div>
</template>

<script>
import Character from "./Character.vue";
import baby01 from "../assets/characters/baby01.svg";
import baby02 from "../assets/characters/baby02.svg";
import baby03 from "../assets/characters/baby03.svg";
import baby04 from "../assets/characters/baby04.svg";
import child01 from "../assets/characters/child01.svg";
import child02 from "../assets/characters/child02.svg";
import child03 from "../assets/characters/child03.svg";
import child04 from "../assets/characters/child04.svg";
import child05 from "../assets/characters/child05.svg";
import adult01 from "../assets/characters/adult01.svg";
import adult02 from "../assets/characters/adult02.svg";
import adult03 from "../assets/characters/adult03.svg";
import adult04 from "../assets/characters/adult04.svg";
import adult05 from "../assets/characters/adult05.svg";
import adult06 from "../assets/characters/adult06.svg";
import adult07 from "../assets/characters/adult07.svg";
import adult08 from "../assets/characters/adult08.svg";
import adult09 from "../assets/characters/adult09.svg";
import adult10 from "../assets/characters/adult10.svg";
import adult11 from "../assets/characters/adult11.svg";
import adult12 from "../assets/characters/adult12.svg";
import adult13 from "../assets/characters/adult13.svg";
import adult14 from "../assets/characters/adult14.svg";
import adult15 from "../assets/characters/adult15.svg";
import adult16 from "../assets/characters/adult16.svg";
import adult17 from "../assets/characters/adult17.svg";
import adult18 from "../assets/characters/adult18.svg";
import adult19 from "../assets/characters/adult19.svg";
import adult20 from "../assets/characters/adult20.svg";
import adult21 from "../assets/characters/adult21.svg";
import adult22 from "../assets/characters/adult22.svg";
import adult23 from "../assets/characters/adult23.svg";
import adult24 from "../assets/characters/adult24.svg";
import adult25 from "../assets/characters/adult25.svg";

export default {
  name: "CharacterList",
  data() {
    return {
      characterList: [],
      isCharactersListLoaded: false,
      responses:[],
      svgFiles: [
        baby01,
        baby02,
        baby03,
        baby04,
        child01,
        child02,
        child03,
        child04,
        child05,
        adult01,
        adult02,
        adult03,
        adult04,
        adult05,
        adult06,
        adult07,
        adult08,
        adult09,
        adult10,
        adult11,
        adult12,
        adult13,
        adult14,
        adult15,
        adult16,
        adult17,
        adult18,
        adult19,
        adult20,
        adult21,
        adult22,
        adult23,
        adult24,
        adult25
      ],
    };
  },
  components: {
    Character,
  },
  props: {
    characters: Array,
    defaultCharacterColors: Object,
    launch: Function,
  },
  methods: {
    async loadSvgFile() {
      for (const svgFile of this.svgFiles){
      try {
        const response = await fetch(svgFile);
        this.svgFiles[this.svgFiles.indexOf(svgFile)] = await response.text();
      } catch (error) {
        console.error("Error loading SVG file:", error);
      }}
    },
    getImageUrl(name) {
      return new URL(`../assets/characters/${name}`, import.meta.url).href;
    },
    /**
     * ---> Search the character object with the id given and launch create modal with the character
     * @param {String} id
     * @return none
     */
    launchModal(id) {
      this.characterList.filter((obj) => {
        if (obj.id === id) {
          this.launch(obj);
        }
      });
    },
  },
  mounted() {
    this.characterList = this.characters;
    this.isCharactersListLoaded = true;
    this.loadSvgFile();
  },
};
</script>

<style scoped>
.grid-list-character {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(55px, 1fr));
  grid-gap: 20px;
}
</style>
