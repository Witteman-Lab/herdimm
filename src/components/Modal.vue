<template>
  <v-dialog v-model="isActive">
    <v-card class="w-75 mx-auto">
      <div class="pa-8">
        <section>
          <div class="d-flex flex-column">
            <div class="mx-auto mb-8">
              <Character
                v-if="isActive"
                :size="{ width: '70px', height: '78px' }"
                :changeAvatarState="changeAvatarState"
                :edit="false"
                :customised="true"
                ref="character"
                :id="'current'"
                :svgFile="this.currentCharacter"
                :colors="{
                  face: this.currentColorFace,
                  hairFront: this.currentColorHair,
                  beards: this.currentBeard,
                  glasses: this.currentGlasses,
                  shirt: this.currentShirt,
                  name: this.characterName,
                  options: this.options,
                  characterTimeEdition: this.characterTimeEdition,
                  numberOfEdition: this.numberOfEdition,
                  characterTimeCreation: this.characterTimeCreation,
                  accessoriesColor: this.currentAccessories,
                }"
                :defaultColorForAllAvatarElements="
                  defaultColorForAllAvatarElements
                "
                :isName="true"
                :isModal="true"
                :setAccessories="setAccessories"
                class="mb-2"
              />

              <v-btn
                v-if="isEdit"
                color="#212121"
                style="color: white"
                v-on:click="this.changeAvatar"
                >{{ this.labels.changeAvatar }}</v-btn
              >
            </div>
            <div>
              <div class="d-flex justify-center">
                <div v-if="isMobile" class="w-100">
                  <v-select
                    :items="filteredItems"
                    density="compact"
                    label="TRAIT"
                    v-model="selectedItem"
                    @update:modelValue="handleSelectItemClick"
                  ></v-select>
                </div>
                <div v-if="!isMobile">
                  <v-btn-toggle divided class="mb-5">
                    <v-btn
                      size="small"
                      variant="outlined"
                      id="skinColorTab"
                      v-on:click="openTab('skinColorTab', 'skinColorSelect')"
                    >
                      <a>{{ this.labels.skinColorTab }}</a>
                    </v-btn>
                    <v-btn
                      size="small"
                      variant="outlined"
                      id="hairColorTab"
                      v-if="this.hasHair"
                      v-on:click="openTab('hairColorTab', 'hairColorSelect')"
                    >
                      <a>{{ this.labels.hairColorTab }}</a>
                    </v-btn>
                    <v-btn
                      size="small"
                      variant="outlined"
                      id="glassesTab"
                      v-if="this.hasGlasses"
                      v-on:click="openTab('glassesTab', 'glassesSelect')"
                    >
                      <a>{{ this.labels.glassesTab }}</a>
                    </v-btn>
                    <v-btn
                      size="small"
                      variant="outlined"
                      id="facialHairTab"
                      v-if="this.hasFacialHair"
                      v-on:click="openTab('facialHairTab', 'facialHairSelect')"
                    >
                      <a>{{ this.labels.facialHairTab }}</a>
                    </v-btn>
                  </v-btn-toggle>
                </div>
              </div>
              <div class="d-flex justify-center">
                <!-- Skin color -->
                <div id="skinColorSelect" class="content-tab">
                  <VSwatches
                    :swatches="skinColors"
                    v-model="this.currentColorFace"
                    inline
                    :input="this.changeFaceColor()"
                  />
                </div>

                <!-- Hair color -->
                <div
                  id="hairColorSelect"
                  class="content-tab"
                  v-if="this.hasHair"
                >
                  <div class="d-flex justify-center">
                    <VSwatches
                      style="width: 265px"
                      :swatches="hairColors"
                      v-model="this.currentColorHair"
                      inline
                      :input="this.changeHairColorByTile()"
                    />
                  </div>
                  <v-color-picker
                    v-if="isVueColorActive"
                    v-model="currentColorHair"
                    @input="this.changeHairColorBySpectrum"
                    :hide-canvas="false"
                    :hide-inputs="true"
                    :show-swatches="false"
                    :dot-size="20"
                    :light="false"
                    class="mx-auto"
                  />

                  <div style="display: flex; justify-content: center">
                    <v-btn
                      v-if="!this.isVueColorActive"
                      :disabled="this.showMoreColor"
                      color="black"
                      style="margin: 10px; color: white"
                      @click="showSpectrum"
                      >{{ this.labels.moreColor }}</v-btn
                    >
                    <v-btn
                      v-if="this.isVueColorActive"
                      color="black"
                      style="margin: 10px; color: white"
                      @click="addColorToSpectrum"
                      >{{ this.labels.addColor }}</v-btn
                    >
                    <v-btn
                      v-if="this.isVueColorActive"
                      color="#D50000"
                      style="margin: 10px; color: white"
                      @click="closeSpectrumColorCanvas"
                      >{{ this.labels.cancelSpectrumColor }}</v-btn
                    >
                  </div>
                </div>

                <!-- Glasses -->
                <div
                  id="glassesSelect"
                  class="content-tab mb-n5"
                  v-if="this.hasGlasses"
                >
                  <ul>
                    <li
                      class="accessoriesList button"
                      style="overflow: hidden"
                      v-on:click="selectGlasses(-1)"
                    >
                      {{ this.labels.None }}
                    </li>
                    <li
                      class="accessoriesList button"
                      style="overflow: hidden"
                      v-for="(glasses, index) in glassesList"
                      :key="index"
                      v-on:click="selectGlasses(index)"
                      v-html="this.svgFiles[glasses]"
                    ></li>
                  </ul>
                </div>

                <!-- Facial hair -->
                <div
                  id="facialHairSelect"
                  style="justify-content: center"
                  class="content-tab mb-n1"
                  v-if="this.hasFacialHair"
                >
                  <ul>
                    <li
                      class="accessoriesList button"
                      style="overflow: hidden"
                      v-on:click="selectBeards(-1)"
                    >
                      {{ this.labels.None }}
                    </li>
                    <li
                      class="accessoriesList button facialHairList"
                      style="overflow: hidden"
                      v-for="(beard, index) in facialHairListJson"
                      :key="index"
                      v-on:click="selectBeards(index)"
                      v-html="this.svgFiles[beard.id]"
                    ></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer class="d-flex justify-center">
          <div class="mt-3">
            <v-btn
              color="success"
              v-if="!this.isEdit"
              v-on:click="this.saveCharacter"
              class="ma-3"
            >
              {{ this.labels.saveBtn }}
            </v-btn>
            <v-btn
              color="success"
              v-if="this.isEdit"
              v-on:click="this.saveEditCharacter"
              class="ma-3"
            >
              {{ this.labels.saveEditBtn }}
            </v-btn>
            <v-btn v-on:click="this.closeModal" class="ml-3">
              {{ this.labels.cancelBtn }}
            </v-btn>
          </div>
        </footer>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import Character from "../components/Character.vue";
import { ColorPicker } from "vue3-colorpicker";
import { VSwatches } from "vue3-swatches";
import "vue3-swatches/dist/style.css";
import charactersJson from "../assets/json/characters";
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
  name: "Modal",
  components: {
    Character,
    ColorPicker,
  },
  data() {
    return {
      isMobile: false,
      items: [
        this.labels.skinColorTab,
        this.labels.hairColorTab,
        this.labels.glassesTab,
        this.labels.facialHairTab,
      ],
      selectedItem: null,
      color: "black",
      swatches: ["#F64272", "#F6648B", "#F493A7", "#F891A6", "#FFCCD5", ""],
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
      modalTitle: "",
      modalInputLabel: "",
      modalInputPlaceholder: "",

      currentColorFace: "",
      currentColorHair: "",
      currentBeard: -1,
      currentGlasses: -1,
      currentCharacter: "",
      currentShirt: "",
      currentCharacterObject: "",
      currentAccessories: "",
      currentCharacterObjectToRemove: "",
      defaultColorForAllAvatarElements: "",

      hasHair: false,
      hasFacialHair: false,
      hasGlasses: false,

      colorToShow: "",
      isVueColorActive: false,
      spectrumSaveCurrentColorHair: "",
      ColorNumberCreateWithSpectrum: 0,
      showMoreColor: false,

      changeAvatarState: true,
      disableGroupCharacter: true,
      replaceCharacterMode: false,
      characterIndex: 0,
      characterIndexSave: 0,
      characterId: "",
      characterType: "",

      isActive: false,
      isDropdownActive: false,
      isEdit: false,
      isBeardsButtonEnable: false,
      isGlassesButtonEnable: false,
      isHairColorButtonEnable: false,
      isFaceColorButtonEnable: false,

      glassesList: [],
      beardsList: [],
      characterName: "",
      currentCharacterNumber: 0,
      options: [],
      endCharacterTime: 0,
      characterTimeEdition: 0,
      characterTimeCreation: 0,
      numberOfEdition: 0,
    };
  },
  props: {
    labels: Object,
    facialHairListJson: Array,
    totalCharactersCount: Number,
    vulnerableOptions: Array,
    skinColors: Array,
    hairColors: Array,
    defaultCharacterColors: Object,
    maxColorTile: Number,
    totalCreated: Number,
    maxCharactersInGroup: Number,
    isGroupComplete: Boolean,
    setReplaceCharacterMode: Function,
    editCharacter: Function,
    saveCharacterAfterReplace: Function,
    saveCharacterInfo: Function,
  },
  // created() {
  //   if (this.items.length > 0) {
  //     this.selectedItem = this.items[0]; // Set the first item as the selected item
  //   }
  // },
  computed: {
    filteredItems() {
      const filteredItems = [...this.items]; // Create a copy of the items array
      console.log(filteredItems);

      if (!this.hasHair) {
        filteredItems.splice(
          filteredItems.findIndex(
            (item) => item.value === this.labels.hairColorTab
          ),
          1
        );
      }
      if (!this.hasGlasses) {
        filteredItems.splice(
          filteredItems.findIndex(
            (item) => item.value === this.labels.glassesTab
          ),
          1
        );
      }
      if (!this.hasFacialHair) {
        filteredItems.splice(
          filteredItems.findIndex(
            (item) => item.value === this.labels.facialHairTab
          ),
          1
        );
      }

      return filteredItems;
    },
  },
  methods: {
    checkIsMobile() {
      // Implement your logic to determine if it's a mobile device
      // You can use media queries or any other method you prefer
      // For the sake of example, let's assume a screen width threshold
      return window.innerWidth < 768;
    },
    handleWindowResize() {
      // Update isMobile value on window resize
      this.isMobile = this.checkIsMobile();
    },
    handleSelectItemClick() {
      // Handle select item click event
      // You can access the selected item value through this.selectedItem
    },

    handleSelectItemClick() {
      if (this.selectedItem == this.labels.skinColorTab) {
        this.openTab("skinColorTab", "skinColorSelect");
      }
      if (this.selectedItem == this.labels.hairColorTab) {
        this.openTab("hairColorTab", "hairColorSelect");
      }
      if (this.selectedItem == this.labels.glassesTab) {
        this.openTab("glassesTab", "glassesSelect");
      }
      if (this.selectedItem == this.labels.facialHairTab) {
        this.openTab("facialHairTab", "facialHairSelect");
      }
    },
    handleColorChange() {
      // Log the color value
      console.log(this.$refs.character);
      console.log("Color changed:", this.currentColorFace);
    },
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

    getImageUrl(name) {
      return new URL(`../assets/characters/${name}`, import.meta.url).href;
    },
    /**
     * ---> change avatar ( Mask old avatar and close Modal)
     * @param none
     * @return none
     */
    changeAvatar() {
      this.isActive = false;
      this.replaceCharacterMode = true;
      this.characterIndexSave = this.characterIndex;
      this.characterId = this.currentCharacterObject.id;
      this.characterType = this.getCurrentCharacterType(
        this.characterIndexSave
      );
      this.setReplaceCharacterMode(false);
      this.editCharacter(
        this.currentCharacterObject,
        this.$refs.character.getSvgColorForChangeAvatar()
      );
      this.closeModal();
    },

    /**
     * ---> get the current character type
     * @param none
     * @return none
     */
    getCurrentCharacterType(position) {
      if (position < charactersJson.nbAvatar) {
        return "avatar";
      } else if (
        position <
        charactersJson.nbAvatar + charactersJson.nbVulnerable
      ) {
        return "vulnerable";
      } else if (
        position <
        charactersJson.nbAvatar +
          charactersJson.nbVulnerable +
          charactersJson.nbCommunity
      ) {
        return "comm";
      }
    },

    /**
     * ---> Close the spectrum color canvas
     * @param none
     * @return none
     */
    closeSpectrumColorCanvas() {
      this.isVueColorActive = false;
      this.currentColorHair = this.colorToShow;
      this.$refs.character.changeHairColor(this.currentColorHair);
    },

    /**
     * ---> add the new color in color tile
     * @param none
     * @return none
     */
    addColorToSpectrum() {
      let isColorPresent = false;
      this.hairColors.forEach((color) => {
        if (this.currentColorHair === color) {
          isColorPresent = true;
        }
      });
      if (
        !isColorPresent &&
        this.ColorNumberCreateWithSpectrum < this.maxColorTile
      ) {
        this.hairColors.push(this.currentColorHair);
        this.ColorNumberCreateWithSpectrum++;
      }
      if (this.ColorNumberCreateWithSpectrum === this.maxColorTile) {
        this.showMoreColor = true;
      }
      this.$refs.character.changeHairColor(this.currentColorHair);
      this.isVueColorActive = false;
    },

    /**
     * ---> show the spectrum color when we press on more colors
     * @param none
     * @return none
     */
    showSpectrum() {
      this.colorToShow = this.currentColorHair;
      this.isVueColorActive = true;
    },

    /**
     * ---> reset vulnerable option
     * @param  none
     * @return none
     */
    resetVulnerableOption() {
      this.options = [];
      this.labels.vulnerableOptions.forEach(() => {
        this.options.push({ id: -1 });
      });
    },
    /**
     * ---> Show create or edit modal and adapt the different tabs
     * @param {Number} index
     * @param {Object} character
     * @param {Number} totalCreated
     * @param {Boolean} isEdit
     * @param {String} label
     * @return none
     */
    openModal(index, character, totalCreated, isEdit, label) {
      this.startCharacterTime = Date.now();

      if (!this.replaceCharacterMode) this.characterIndex = index;
      else this.characterIndex = this.characterIndexSave;

      this.characterType = this.getCurrentCharacterType(this.characterIndex);

      this.modalTitle = this.getModalTitle(label);
      this.currentCharacter = this.svgFiles[character.file];
      this.currentCharacterObject = character;
      this.isActive = true;
      this.isEdit = isEdit;

      this.currentCharacterNumber = totalCreated;
      this.resetVulnerableOption();
      this.setCharacterColors(isEdit, character, this.characterType);

      // Display the skin tab content when opening modal window
      this.openTab("skinColorTab", "skinColorSelect");
    },

    /**
     * ---> Apply character attributes when edit or default attributes when create
     * @param {Boolean} isEdit
     * @param {Object} character
     * @param {string} characterType
     * @return none
     */
    setCharacterColors(isEdit, character, characterType) {
      if (isEdit) {
        this.currentColorFace = character.colors.face;
        this.currentColorHair = character.colors.hairFront;
        this.currentGlasses = character.colors.glasses;
        this.currentBeard = character.colors.beards;
        this.currentShirt = character.colors.shirt;
        this.characterName = character.colors.name;
        this.characterTimeEdition = character.colors.characterTimeEdition;
        this.numberOfEdition = character.colors.numberOfEdition;
        this.characterTimeCreation = character.colors.characterTimeCreation;
        this.setVulnerableOption(character.colors.options);
      } else {
        // Avatar gets a special shirt
        if (characterType === "avatar") {
          this.currentAccessories =
            this.defaultCharacterColors.ShirtColorAvatar;
          this.currentShirt = this.defaultCharacterColors.ShirtColorAvatar;
        } else {
          this.currentShirt = this.defaultCharacterColors.ShirtColorCharacters;
          this.currentAccessories =
            this.defaultCharacterColors.AccessoriesColor;
        }
        this.currentColorFace = this.defaultCharacterColors.SkinColor;
        this.currentColorHair = this.defaultCharacterColors.HairColor;
        this.currentGlasses = -1;
        this.currentBeard = -1;
      }
    },

    /***
     * --> Set character option
     * @param {String} option
     * @param {Number} index
     * @return none
     */
    setCharacterOption(option, index) {
      if (this.options[index].id === -1) this.options[index] = option;
      else {
        this.options[index] = { id: -1 };
      }
    },

    /**
     * ---> Close the modal and reset default parameter
     * @param none
     * @return none
     */
    closeModal() {
      this.isActive = false;
      this.isDropdownActive = false;
      this.isHairColorButtonEnable = false;
      this.isFaceColorButtonEnable = false;
      this.isVueColorActive = false;
      this.characterName = "";
      this.selectedItem = null;
    },

    /**
     * ---> Manage character name if user type a name or not and save the character in the group list
     * @param none
     * @return none
     */
    saveCharacter() {
      if (this.characterType === "vulnerable") {
        this.$refs.character.setCharacterOption(this.options);
      }
      this.endCharacterTime = Date.now();

      if (this.replaceCharacterMode) {
        this.saveCharacterAfterReplace(
          this.currentCharacterObject,
          this.$refs.character.getSvgColor(),
          this.characterType,
          this.characterId
        );
        this.replaceCharacterMode = false;
        this.setReplaceCharacterMode(true);
        this.characterId = "";
        this.characterIndexSave = "";
      } else {
        this.saveCharacterInfo(
          this.currentCharacterObject,
          this.$refs.character.getSvgColor()
        );
      }
      this.closeModal();
    },

    /**
     * ---> Save the edited character in the group list
     * @param none
     * @return none
     */
    saveEditCharacter() {
      //modification time for a character
      this.endCharacterTime = Date.now();
      this.editCharacter(
        this.currentCharacterObject,
        this.$refs.character.getSvgColor()
      );
      this.closeModal();
    },

    /**
     * ---> Set accessories tabs
     * @param {Boolean} hasGlasses
     * @param {Boolean} hasBeard
     * @param {Boolean} hasHair
     * @param {Array} glassesList
     * @return none
     */
    setAccessories(hasGlasses, hasBeard, hasHair, glassesList) {
      this.hasGlasses = hasGlasses;
      this.hasFacialHair = hasBeard;
      this.hasHair = hasHair;
      this.glassesList = glassesList;
    },

    /**
     * ---> Apply the glasses at the given position to the character
     * @param {Number} pos
     * @return none
     */
    selectGlasses(pos) {
      this.$refs.character.changeGlasses(pos);
      this.isGlassesButtonEnable = false;
    },

    /**
     * ---> Apply the beards at the given position to the character
     * @param {Number} pos
     * @return none
     */
    selectBeards(pos) {
      this.$refs.character.changeBeard(pos);
      this.isBeardsButtonEnable = false;
    },

    /***
     * --> set checked button based on the option name
     * @param {String} options
     * @return none
     **/
    setVulnerableOption(options) {
      this.options = options;
    },

    /**
     * ---> Open tab based on the content and the name
     * @param {String} target
     * @param {String} tabName
     * @return none
     */
    openTab(target, tabName) {
      document
        .querySelectorAll(".content-tab")
        .forEach((e) => (e.style.display = "none"));
      document
        .querySelectorAll(".tab")
        .forEach((e) => e.classList.remove("is-active"));

      document.getElementById(tabName).style.display = "inline-block";
      document.getElementById(target).classList.add("is-active");

      if (tabName === "glassesSelect")
        this.setAccessoriesPosition("100px", "-30px");
      // Works for now, but a bit too arbitrary to be shared
      else if (tabName === "facialHairSelect") {
        this.setAccessoriesPosition("90px", "-43px"); // Works for now, but a bit too arbitrary to be shared
      }
    },

    /**
     * ---> May need some refactor or find another solution
     * ---> Apply specific position to glasses and beards buttons
     * @param {String} height
     * @param {String} marginTop
     * @return none
     */
    setAccessoriesPosition(height, marginTop) {
      let accessories = document.getElementsByClassName("accessoriesList");
      for (let i = 0; i < accessories.length; i++) {
        if (accessories[i].innerHTML !== this.labels.None) {
          let item = accessories[i].children[0];
          item.setAttribute("height", height);
          if (item.id !== "glasses4" && item.id !== "glasses5") {
            item.setAttribute("style", `margin-top: ${marginTop};`);
          }
        }
      }
    },

    /**
     * ---> Apply the chosen color on the current character skin
     * @param {String} color
     * @return none
     */
    changeFaceColor() {
      if (this.$refs.character) {
        this.$refs.character.changeFaceColor(this.currentColorFace);
      }
    },

    /**
     * ---> Apply the chosen color on the current character hair
     * @param {Object} color
     * @return none
     */
    changeHairColorBySpectrum(color) {
      this.currentColorHair = color;
      if (this.$refs.character) {
        this.$refs.character.changeHairColor(this.currentColorHair);
      }
    },

    /**
     * ---> Apply the chosen color on the current character hair
     * @param {Object} color
     * @return none
     */
    changeHairColorByTile() {
      if (this.$refs.character) {
        this.$refs.character.changeHairColor(this.currentColorHair);
      }
    },

    /**
     * ---> Get modal title based on the position of the character to create/edit
     * @param {String} verb
     * @return {String} modal Title
     */
    getModalTitle(verb) {
      if (!this.replaceCharacterMode) {
        if (this.characterType === "avatar") {
          return `${verb} ${this.labels.avatar}`;
        } else if (this.characterType === "vulnerable") {
          return `${verb} ${this.labels.vulnerable}`;
        } else {
          return `${verb} ${this.labels.otherPeople}`;
        }
      } else {
        if (this.characterType === "avatar") {
          return this.labels.replaceYourAvatar;
        } else if (this.characterType === "vulnerable") {
          return this.labels.replaceYourVulnerable;
        } else {
          return this.labels.replaceYourComm;
        }
      }
    },
  },
  beforeUnmount() {
    // Clean up window resize event listener
    window.removeEventListener("resize", this.handleWindowResize);
  },
  mounted() {
    this.isMobile = this.checkIsMobile();
    window.addEventListener("resize", this.handleWindowResize);
    this.loadSvgFile();
    document.body.addEventListener("keyup", (e) => {
      // Escape key to close the modal window (customizer)
      if (e.keyCode === 27 && this.isActive) {
        this.closeModal();
        // Enter key to add a new character to the group (and close the customizer)
      } else if (e.keyCode === 13 && this.isActive && !this.isEdit) {
        this.saveCharacter();
        // Enter key to save edits to a group member (and close the customizer)
      } else if (e.keyCode === 13 && this.isActive && this.isEdit) {
        this.saveEditCharacter();
      }
    });
    this.defaultColorForAllAvatarElements = charactersJson.defaultColors;
  },
};
</script>

<style scoped>
#vulnerableDescription {
  font-weight: bold;
  margin: 1rem 0;
}
header.modal-card-head {
  padding: 10px;
}
.content-tab {
  display: none;
  margin: 0 0 1rem 0;
}
li.accessoriesList {
  display: inline-block;
  min-width: auto;
  margin: 0 auto 10px;
  padding: 0 10px;
  cursor: pointer;
}

.mobile-modal {
  margin-top: calc(20vh - 40px);
}

ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  padding-left: 0;
}

li.tab {
  display: inline-block;
  text-align: center;
}

@media only screen and (max-width: 768px) {
  .mobile-modal {
    margin-top: calc(20vh - 40px);
    width: auto;
    height: 85%;
  }
  header.modal-card-head {
    padding: 5px;
  }
  .content-tab {
    display: none;
    margin: 0 0 1rem 0;
    width: 100%;
  }
  li.accessoriesList {
    display: inline-block;
    width: 80%;
    margin: 0 auto 10px;
    padding: 0 10px;
    cursor: pointer;
  }
}
</style>
