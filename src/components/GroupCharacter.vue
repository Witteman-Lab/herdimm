<template>
  <div class="groups-banner">
    <div v-if="!isMobile" class="grid-category">
      <div
        v-bind:key="index"
        v-for="(category, index) in this.labels.categories"
        class="fit-content"
        :style="index === 1 ? 'margin-left: 35px;' : ''"
      >
        <div style="display: flex; justify-content: center">
          <div
            style="z-index: 2"
            :key="character.id"
            v-for="character in characterList"
          >
            <div
              class="grid-list-character"
              v-if="character.characterType === isCharacterType[index]"
            >
              <img
                class="cercle-avatar"
                v-if="character.characterType === 'avatar'"
                src="../assets/images/cercle-avatar.svg"
              />
              <div
                v-if="character.file === ''"
                style="width: 64px; height: 50px"
              ></div>
              <Character
                style="margin: 10px 5px"
                :disabled="false"
                :ref="character.id"
                :is-name="true"
                :size="{ width: '64px', height: '70px' }"
                :edit="characterMode"
                :customised="true"
                :colors="character.colors"
                :id="character.id"
                :group="true"
                :svgFile="character.file ? this.svgFiles[character.file] : ''"
                :launchModal="launchModal"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isMobile" class="grid-category">
      <div class="fit-content">
        <div
          style="z-index: 2"
          :key="character.id"
          v-for="character in characterList"
        >
          <div class="grid-list-character">
            <div
              v-if="character.file === ''"
              style="width: 64px; height: 50px"
            ></div>
            <Character
              style="margin: 10px 5px"
              :disabled="false"
              :ref="character.id"
              :is-name="true"
              :size="{ width: '64px', height: '70px' }"
              :edit="characterMode"
              :customised="true"
              :colors="character.colors"
              :id="character.id"
              :group="true"
              :svgFile="character.file ? this.svgFiles[character.file] : ''"
              :launchModal="launchModal"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <template>
  <div class="groups-banner">
    <div v-if="!isMobile" class="grid-category">
      <div v-bind:key="index" v-for="(category, index) in this.labels.categories" class="fit-content"
           :style="index === 1 ? 'margin-left: 35px;' : ''">
        <div style="display: flex; justify-content: center;">
          <div style="z-index: 2;" :key="character.id" v-for="(character) in characterList">
            <div class="grid-list-character" v-if="character.characterType === isCharacterType[index]">
              <div class="cercle-avatar" v-if="character.characterType === 'avatar'"
                   v-html="require(`@/assets/images/cercle-avatar.svg`)"></div>
              <div v-if="character.file === ''" style="width: 64px; height: 50px;"></div>
              <Character style="margin: 10px 5px;" :disabled="false" :ref="character.id" :is-name="true"
                         :size="{width: '64px', height: '70px'}"
                         :edit="characterMode" :customised="true" :colors="character.colors" :id="character.id"
                         :group="true"
                         :svgFile="character.file ? require(`@/assets/characters/${character.file}`) : ''"
                         :launchModal="launchModal"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isMobile" class="grid-category">
      <div class="fit-content">
        <div style="z-index: 2;" :key="character.id" v-for="(character) in characterList">
          <div class="grid-list-character">
            <div v-if="character.file === ''" style="width: 64px; height: 50px;"></div>
            <Character style="margin: 10px 5px;" :disabled="false" :ref="character.id" :is-name="true"
                       :size="{width: '64px', height: '70px'}"
                       :edit="characterMode" :customised="true" :colors="character.colors" :id="character.id"
                       :group="true"
                       :svgFile="character.file ? require(`@/assets/characters/${character.file}`) : ''"
                       :launchModal="launchModal"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> -->

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
import glasses1 from "../assets/glasses/glasses1.svg";
import glasses2 from "../assets/glasses/glasses2.svg";
import glasses3 from "../assets/glasses/glasses3.svg";
import glasses4 from "../assets/glasses/glasses4.svg";
import glasses5 from "../assets/glasses/glasses5.svg";
import facialHair1 from "../assets/facialHair/facialHair1.svg";
import facialHair2 from "../assets/facialHair/facialHair2.svg";
import facialHair3 from "../assets/facialHair/facialHair3.svg";
export default {
  name: "GroupCharacter",
  data() {
    return {
      svgFiles: {
        "baby01.svg": baby01,
        "baby02.svg": baby02,
        "baby03.svg": baby03,
        "baby04.svg": baby04,
        "child01.svg": child01,
        "child02.svg": child02,
        "child03.svg": child03,
        "child04.svg": child04,
        "child05.svg": child05,
        "adult01.svg": adult01,
        "adult02.svg": adult02,
        "adult03.svg": adult03,
        "adult04.svg": adult04,
        "adult05.svg": adult05,
        "adult06.svg": adult06,
        "adult07.svg": adult07,
        "adult08.svg": adult08,
        "adult09.svg": adult09,
        "adult10.svg": adult10,
        "adult11.svg": adult11,
        "adult12.svg": adult12,
        "adult13.svg": adult13,
        "adult14.svg": adult14,
        "adult15.svg": adult15,
        "adult16.svg": adult16,
        "adult17.svg": adult17,
        "adult18.svg": adult18,
        "adult19.svg": adult19,
        "adult20.svg": adult20,
        "adult21.svg": adult21,
        "adult22.svg": adult22,
        "adult23.svg": adult23,
        "adult24.svg": adult24,
        "adult25.svg": adult25,
        glasses1: glasses1,
        glasses2: glasses2,
        glasses4: glasses4,
        glasses3: glasses3,
        glasses5: glasses5,
        facialHair1: facialHair1,
        facialHair2: facialHair2,
        facialHair3: facialHair3,
      },
      position: 0,
      characterList: [],
      isCharacterType: [],
      characterSize: {
        width: "70px",
        height: "95px",
        border: "5px",
      },
      characterMode: true,
      isMobile: false,
    };
  },
  components: {
    Character,
  },
  props: {
    labels: Object,
    disableGroupCharacter: Boolean,
    nbAvatar: Number,
    nbVulnerable: Number,
    nbCommnunity: Number,
    launchEditModal: Function,
  },
  methods: {
    async loadSvgFile() {
      for (const key in this.svgFiles) {
        try {
          const response = await fetch(this.svgFiles[key]);
          this.svgFiles[key] = await response.text();
        } catch (error) {
          console.error("Error loading SVG file:", error);
        }
      }
    },
    setCharacterCategory(type) {
      if (type === "avatar") this.isCharacterType[0] = type;
      else if (type === "vulnerable") this.isCharacterType[1] = type;
      else if (type === "comm") this.isCharacterType[2] = type;
    },
    /**
     * ---> Add a character with its attributes to the group list
     * @param {Object} character
     * @param {Object} characterColors
     * @param {String} type
     * @return none
     */
    addCharacterToGroup(character, characterColors, type) {
      let id = character.id + Date.now() + "_customised";
      this.characterList.splice(this.position, 1, {
        id,
        file: character.file,
        colors: characterColors,
        characterType: type,
      });
      this.position++;
      this.changeBannerColor();
    },

    /**
     * ---> change color of banner
     * @param none
     * @return none
     */

    changeBannerColor() {
      if (this.position > this.characterList.length - 1) {
        setTimeout(() => {
          const groupBanner = document.getElementById("groupCharacter");
          if (window.innerWidth > 768) {
            const circleAvatar = document.getElementById("circle-avatar");
            circleAvatar.setAttribute("stroke", "#05CDC1");
            circleAvatar.setAttribute("stroke-width", 4);
          }
          groupBanner.style = "border: 4px solid #05CDC1;";
        }, 50);
      }
    },

    /**
     * ---> Replace character
     * @param {Object} character
     * @param {Object} characterColors
     * @param {String} type
     * @param {number} id
     * @return none
     */
    replaceCharacterInGroup(character, characterColors, type, id) {
      const index = this.characterList.findIndex(
        (characterObj) => characterObj.id === id
      );
      const newCharacterId = character.id + Date.now() + "_customised";
      if (index !== -1) {
        this.characterList.splice(index, 1, {
          id: newCharacterId,
          file: character.file,
          colors: characterColors,
          characterType: type,
        });
      }
      this.changeBannerColor();
    },

    /**
     * ---> Edit character attributes
     * @param {Object} character
     * @param {Object} characterColors
     * @param {String} type
     * @return none
     */
    editCharacter(character, characterColors, type) {
      const index = this.characterList.findIndex(
        (characterObj) => characterObj.id === character.id
      );
      if (index !== -1) {
        this.characterList.splice(index, 1, {
          id: character.id,
          file: character.file,
          colors: characterColors,
          characterType: type,
        });
        this.$refs[character.id][0].editCharacterColors(characterColors);
      }
    },

    /**
     * ---> Search the character object with the id given and launch edit modal with the character
     * @param {String} id
     * @return none
     */
    launchModal(id) {
      this.characterList.filter((obj, index) => {
        if (obj.id === id) {
          this.launchEditModal(obj, index);
        }
      });
    },
    changeCharacterReplaceMode(mode) {
      this.characterMode = mode;
    },

    /**
     * ---> Set a list of characters
     * @param {Array} characters
     * @return none
     */
    addGroup(characters) {
      this.characterList = characters;
    },

    removeSpecificGroupOfCharacter(value) {
      let characterListCopy = this.characterList.splice(0, value);
      this.characterList = [];
      this.characterList = characterListCopy;
      const maxCharacters =
        this.nbAvatar + this.nbVulnerable + this.nbCommnunity;
      for (let i = value; i < maxCharacters; i++) {
        let type = "";
        if (i < this.nbAvatar) {
          type = "avatar";
        } else if (i < this.nbAvatar + this.nbVulnerable) {
          type = "vulnerable";
        } else if (i < this.nbAvatar + this.nbVulnerable + this.nbCommnunity) {
          type = "comm";
        }
        this.setCharacterCategory(type);
        this.characterList.push({
          characterType: type,
          file: "",
          colors: {},
          id: type + i,
        });
      }
      this.position = value;
      this.isScreenMobile();
    },

    /**
     * ---> Remove choice of character
     * @param none
     * @return none
     */
    removeAllCharacters() {
      this.characterList = [];
      const maxCharacters =
        this.nbAvatar + this.nbVulnerable + this.nbCommnunity;
      for (let i = 0; i < maxCharacters; i++) {
        let type = "";
        if (i < this.nbAvatar) {
          type = "avatar";
        } else if (i < this.nbAvatar + this.nbVulnerable) {
          type = "vulnerable";
        } else if (i < this.nbAvatar + this.nbVulnerable + this.nbCommnunity) {
          type = "comm";
        }
        this.setCharacterCategory(type);
        this.characterList.push({
          characterType: type,
          file: "",
          colors: {},
          id: type + i,
        });
      }
      this.position = 0;
      this.isScreenMobile();
    },

    /**
     * ---> Get the current number of character in the group to manage "Go to the animation" button
     * @param none
     * @return {Number} characters number
     */
    getCharacterListSize() {
      return this.position;
    },

    /**
     * ---> Get the character list in order send it to the animation page
     * @param none
     * @return {Array} character list
     */
    getCharacterList() {
      return this.characterList;
    },

    isScreenMobile() {
      this.isMobile = window.innerWidth <= 768;
      this.changeBannerColor();
      return this.isMobile;
    },
  },
  mounted() {
    this.loadSvgFile();
    const maxCharacters = this.nbAvatar + this.nbVulnerable + this.nbCommnunity;
    for (let i = 0; i < maxCharacters; i++) {
      let type = "";
      if (i < this.nbAvatar) {
        type = "avatar";
      } else if (i < this.nbAvatar + this.nbVulnerable) {
        type = "vulnerable";
      } else if (i < this.nbAvatar + this.nbVulnerable + this.nbCommnunity) {
        type = "comm";
      }
      this.setCharacterCategory(type);
      this.characterList.push({
        characterType: type,
        file: "",
        colors: {},
        id: type + i,
      });
    }
    this.isScreenMobile();
    window.addEventListener("resize", this.isScreenMobile);
  },
};
</script>

<style scoped>
.fit-content {
  width: fit-content;
  height: fit-content;
}

.cercle-avatar {
  position: absolute;
  z-index: -1;
  top: -20px;
  left: -39px;
}
.position-text-category {
  margin-bottom: 5px;
  font-size: 15px;
  color: #848484;
}
.grid-list-character {
  display: grid;
  position: relative;
  grid-gap: 20px;
}
.grid-category {
  display: grid;
  cursor: pointer;
  grid-template-columns: auto auto auto;
  grid-gap: 30px;
}
.groups-banner {
  padding-right: 16px;
  margin: 30px;
  display: flex;
  justify-content: center;
  background: #e4edee;
  border: 2px dashed #888888;
  box-sizing: border-box;
  border-radius: 10px;
}
@media only screen and (min-width: 320px) and (max-width: 768px) {
  .fit-content {
    width: fit-content;
    height: fit-content;
    grid-template-columns: auto auto auto;
    grid-column-gap: 20px;
    display: grid;
  }
  .grid-category {
    display: inline;
  }
  .groups-banner {
    padding-bottom: 16px;
    padding-left: 16px;
  }

  .cercle-avatar {
    top: -43px;
    left: -60px;
  }
}
</style>
