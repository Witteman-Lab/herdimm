<template>
    <v-app id="main_container">
        <v-container id="myContainer" style="width: 100%; height: 100%; display: flex; flex-direction: row; justify-content: start; align-items: start;">
            <div class="container" style="width: 100%; height: 100%;">
                <!-- MODAL WINDOW -->
                <Modal ref="modal"
                       :setReplaceCharacterMode="setReplaceCharacterMode"
                       :edit-character="editCharacter"
                       :saveCharacterAfterReplace="saveCharacterAfterReplace"
                       :saveCharacterInfo="saveCharacter"
                       :total-created="totalCreated"
                       :is-group-complete="isGroupComplete"
                       :max-characters-in-group="maxCharactersInGroup"
                       :defaultCharacterColors="defaultCharacterColors"
                       :skin-colors="skinColors" :hair-colors="hairColors" :total-characters-count="maxCharactersInGroup"
                       :facial-hair-list-json="facialHairList" :max-color-tile="maxColorTile" :labels="labels"/>

                <div class="is-centered is-half-desktop is-half-mobile">
                    <div class="instructions-block">
                        <h1 v-if="!replaceCharacterMode" class="page-instruction">{{this.labels.stepsMakingAvatar[step].title}}</h1>
                        <h1 v-if="replaceCharacterMode" class="page-instruction">{{this.labels.selectAvatar}}</h1>
                        <p v-if="!isGroupComplete & !replaceCharacterMode" id="contextualInfo"  style="font-size: medium">{{ this.labels.stepsMakingAvatar[step].description }}</p>
                        <v-btn :disabled="replaceCharacterMode" color="#05CDC1" class="continue" v-if="isGroupComplete && !isMobile" v-on:click="loadAnimationView()">
                            <span>{{this.labels.continueBtn.toUpperCase()}}</span>
                            <font-awesome-icon style="margin-left: 10px;" icon="play" size="lg"/>
                        </v-btn>
                    </div>
                    <button id="selectLanguage" :style="{'z-index': languageButtonIndex}" style="z-index: 20" class="button" v-on:click="this.changeLanguage">{{this.labels.language}}</button>

                  <v-btn
                      v-show="this.showRandomBtn"
                      id="showRandomBtnId"
                      color="#212121"
                      class="ma-2 white--text"
                      @click="automaticAvatarsGeneration()"
                  >
                    {{this.labels.random}}
                    <v-icon
                        right
                        dark
                    >
                      mdi-shuffle-variant
                    </v-icon>
                  </v-btn>

                    <!-- List of all the characters -->
                    <div class="tool">
                        <div style="width: 100%; margin: 5px;">
                            <div style="width: 100%">
                                <CharacterList :defaultCharacterColors="defaultCharacterColors" ref="listAvailable" :characters="this.characterList" :launch="launch"></CharacterList>
                            </div>
                        </div>
                    </div>

                    <div v-if="debugMode">
                        <v-btn v-on:click="regenerateCharacters('all')">{{this.labels.differentCharacters}}</v-btn>
                        <v-btn v-on:click="regenerateCharacters()">{{this.labels.sameCharacters}}</v-btn>
                    </div>


                    <v-btn :disabled="replaceCharacterMode" color="#05CDC1" class="continue" v-if="isGroupComplete && isMobile" v-on:click="loadAnimationView()">
                        <span>{{this.labels.continueBtn.toUpperCase()}}</span>
                        <font-awesome-icon style="margin-left: 10px;" icon="play" size="lg"/>
                    </v-btn>

                    <!-- List of the group member -->
                    <div class="tool">
                        <GroupCharacter :nbAvatar="nbAvatar"
                                        :nbVulnerable="nbrVulnerable"
                                        :nbCommnunity="nbrCommunity" :labels='labels' id="groupCharacter" ref="listToFill" :launch-edit-modal="launchEditModal"></GroupCharacter>
                    </div>

                </div>
            </div>
        </v-container>
    </v-app>
</template>



<script>

    import CharacterList from "./CharacterList";
    import GroupCharacter from "./GroupCharacter";
    import Modal from "./Modal";

    import charactersJson from "../assets/json/characters.json";
    import textsEng from "../assets/json/textsEng.json";
    import textsFr from "../assets/json/textsFr.json";
    import facialHairJson from "../assets/json/facialHair.json";
   // import glassesJson from "../assets/json/glasses.json";


    export default {
        name: "home",
        components: {
            Modal,
            GroupCharacter,
            CharacterList,
        },
        data() {
            return {
                isLanguageChanged: true,
                isGroupComplete: false,
                characterList: [],
                isCharactersListLoaded: false,
                contextualInfo: "",
                finalInfo: "",
                totalCreated: 0,
                maxCharactersInGroup: 0,
                maxColorTile: 0,
                facialHairList: [],
                texts: '',
                skinColors: [],
                hairColors: [],
                defaultCharacterColors: {},
                languageButtonIndex: 20,
                nbAvatar: 0,
                nbrVulnerable: 0,
                nbrCommunity: 0,
                characterTypeToGenerate: false,
                debugMode: false,
                totalTime: 0,
                startTime: Date.now(),
                step: 0,
                replaceCharacterMode: false,
                isMobile: false,
                showRandomBtn: true
            };
        },
        props: {
            characterTime: Number,
        },
        methods: {
            track () {
                this.$ga.page(
                {
                    page: '/Avatars',
                    title: 'Avatars',
                    location: window.location.href
                })

            },
          disableRandomBtn(){
            document.getElementById("showRandomBtnId").disabled = true;
            document.getElementById("showRandomBtnId").style.opacity = 0.19;
          },
          enabledRandomBtn(){
            document.getElementById("showRandomBtnId").disabled = false;
            document.getElementById("showRandomBtnId").style.opacity = 1;
          },
          /**
           * ---> Generate random avatars
           * @param none
           * @return none
           */
          random(min, max){
            return Math.round(Math.random()*(max - min) + min);
          },
          /**
           * ---> Generate random avatars
           * @param none
           * @return none
           */
          arrayShuffle(item){
              let l = item.length;
              let t, r;
            while (0 !== l) {
              r = Math.floor(Math.random() * l);
              l -= 1;
              t = item[l];
              item[l] = item[r];
              item[r] = t;
            }
            return item;
          },
          /**
           * ---> Generate random avatars
           * @param none
           * @return none
           */
            automaticAvatarsGeneration(){
            if (this.isGroupComplete) {
              this.$refs.listToFill.removeAllCharacters();
              this.totalCreated = 0;
              this.step = 0;
            }
            // let  glassesValue;
            //let beardsValue = null;


              let character;
            //let babyMimNumber = 0;
            let babyMaxNumber = 1;
            let childMinNumber = 1;
            let childMaxNumber = 2;
            let numberOfBaby = ( Math.floor(Math.random() * (babyMaxNumber + 1)));
            let numberOfChild = ( Math.floor(Math.random() * childMaxNumber) + childMinNumber);
            //console.log("Nombre de Bebe ->", numberOfBaby, "Nombre D'enfant ->" , numberOfChild);
            let decrementBabyValue = numberOfBaby;
            let decrementChildValue = numberOfChild;
            /////////////////////////////////////////////////////////////////////////////////////////////////
            //let ListOfSkinColorNumber = [3, 4, 5];
            //let SkinColorRandomNumber = ListOfSkinColorNumber[Math.floor(Math.random()*ListOfSkinColorNumber.length)];
            let SkinColorRandomNumber = this.random(3, 5);
            console.log("magniol", SkinColorRandomNumber);

            let RadomSkinColors = this.arrayShuffle(charactersJson.skinColors);
            //console.log("RadomSkinColors", RadomSkinColors);
            let firstSkinColorslist = [];

            for ( let i=0; i< SkinColorRandomNumber; i++){
              firstSkinColorslist.push(RadomSkinColors[i]);
            }

            //console.log("firstskinColorslist", firstSkinColorslist);
            let value = 0;
            if ((this.maxCharactersInGroup - this.totalCreated) > SkinColorRandomNumber)
              value = (this.maxCharactersInGroup - this.totalCreated)-SkinColorRandomNumber;
            else
              value = 0;

            //let value = (this.maxCharactersInGroup - this.totalCreated)-SkinColorRandomNumber;
            let secondtSkinColorslist = [];
            for(let i=0; i<value; i++){
              secondtSkinColorslist.push(firstSkinColorslist[Math.floor(Math.random()*firstSkinColorslist.length)]);
            }

            let finalSkinColorsList = this.arrayShuffle(firstSkinColorslist).concat(this.arrayShuffle(secondtSkinColorslist));
            //console.log("la nouvelle liste est", finalSkinColorsList);

            //---------------------------------------------------------------------------------------------

            //generate four random hair colors
            let fourRandomColors = this.getFourRandomHairColor(charactersJson.hairColors, 4);
            let generatedList =  [];

            let totalCreatedCopy = this.totalCreated;

              for (let i = this.totalCreated; i < this.maxCharactersInGroup; i++) {
              setTimeout(() => {
                if(numberOfBaby === 1 && decrementBabyValue !== 0) {
                  character = charactersJson.characters[charactersJson.babyListIndex[Math.floor(Math.random() * (charactersJson.babyListIndex.length))]];
                  --decrementBabyValue
                }
                else if(numberOfChild <= 2 && decrementChildValue !== 0 && decrementBabyValue === 0 ){
                 character = charactersJson.characters[charactersJson.childListIndex[Math.floor(Math.random() * (charactersJson.childListIndex.length))]];
                  --decrementChildValue;
                }
                else if(decrementChildValue === 0 && decrementBabyValue === 0){
                  character = charactersJson.characters[charactersJson.adultListIndex[Math.floor(Math.random() * (charactersJson.adultListIndex.length))]];
                }

                generatedList.push(character);

                  //avatar hair shuffled
                let shuffled = fourRandomColors.sort(function(){return .5 - Math.random()});

                // //beardsValue = this.manageBeardsAvatar(character);
                // // console.log(beardsValue);
                // console.log("character", this.manageBeardsAvatar(character));

                let shirt = "#BFBABE";
                let shirtShadow = "#999598";
                let accessoriesColor = this.defaultCharacterColors.AccessoriesColor;
                //accessoriesColor = "#318ce7"
                if (i === 0) {
                  shirt = "#F67844";
                  shirtShadow = "#c56036";
                  accessoriesColor = shirt;
                }
                //console.log("la nouvelle liste est", finalSkinColorsList[i]);
                let svgColor = {
                  beards: "",
                  glasses: "",
                  face: finalSkinColorsList[i-(totalCreatedCopy)],
                  faceShadow: "#b98f71",
                  hairBack: shuffled[0],
                  hairFront: shuffled[0],
                  idCharacter: "",
                  options: ['', '', ''],
                  shirt,
                  shirtShadow,
                  name,
                  accessoriesColor
                };
                this.saveCharacter(character, svgColor);
              }, 100);
              }

            },
            getFourRandomHairColor(list, numberOfColor) {
                let result = new Array(numberOfColor),
                    len = list.length,
                    chosenList = new Array(len);
                if (numberOfColor > len)
                    throw new RangeError("getRandom: more elements taken than available");
                while (numberOfColor--) {
                    let x = Math.floor(Math.random() * len);
                    result[numberOfColor] = list[x in chosenList ? chosenList[x] : x];
                    chosenList[x] = --len in chosenList ? chosenList[len] : len;
                }
                return result;
            },
        //a modifier on obitiens encore lles grouoe d'avatar  avec juste une de lunette
          //permet de counter le nombre de character dans liste pour attribuer les lunette à un nombre restreint
          manageCharacterGlasses(generatedList,character){
            let counter = 0;
            let element;
            let glassesValue;
            for(element of generatedList) {
              if (element.id.startsWith("baby") || element.id.startsWith("child") || element.id.startsWith("adult")) {
                //console.log("counteur rebot commence\n",+counter)
                glassesValue = Math.floor(Math.random() * 3);
                counter++;
                //console.log("glassesValue", counter);
              }
            }
            if(counter > 3 && (character.id.startsWith("baby") || character.id.startsWith("child") ||character.id.startsWith("adult") )) {
              glassesValue = "";
            }
              return glassesValue;
            },


          //permet de counter le nombre de character dans liste pour attribuer la barbe à un nombre restreint( ne fonctionne pas bien)
          // manageBeardsAvatar(character){
            // let element;
            // let beardsValue;
            // let counter = 0;
            // // let bool = false;
            // for(element of generatedList) {
            //   if (element.id.startsWith("baby") || element.id.startsWith("child") || element.id === "adult19") {
            //      beardsValue = "";
            //     counter++
            //     console.l
            //
            //   }
            // }
            //   if(counter < 2 && character.id.startsWith("adult") ){
            //     beardsValue = Math.floor(Math.random() * 3);                // bool = true;
            //   }
            // return beardsValue;
          // },

            /**
             * ---> Generate all types characters to form a group of a group
             * @param characterType
             * @return none
             */
            generateAllCharacters(characterType) {
                let character;

                if (characterType !== "all") {
                    character = charactersJson.characters[Math.floor(Math.random() * charactersJson.characters.length)];
                }
                for (let i = this.totalCreated; i < this.maxCharactersInGroup; i++) {
                    setTimeout(() => {
                        if (characterType === "all") {
                            character = charactersJson.characters[Math.floor(Math.random() * charactersJson.characters.length)];
                        }
                        let shirt = "#BFBABE";
                        let shirtShadow = "#999598";
                        let accessoriesColor = this.defaultCharacterColors.AccessoriesColor;
                        if (i === 0) {
                            shirt = "#F67844";
                            shirtShadow = "#c56036";
                            accessoriesColor = shirt;
                        }
                        let svgColor = {
                            beards: "",
                            face: "#E7B38D",
                            faceShadow: "#b98f71",
                            glasses: "",
                            hairBack: "#553e35",
                            hairFront: "#6A4E42",
                            idCharacter: "",
                            options: ['', '', ''],
                            shirt,
                            shirtShadow,
                            name,
                            accessoriesColor
                        };
                        this.saveCharacter(character, svgColor);
                    }, 100);
                }
            },

            regenerateCharacters(characterType) {
                if (this.isGroupComplete) {
                    this.$refs.listToFill.removeAllCharacters();
                    this.totalCreated = 0;
                    this.step = 0;
                }
                this.generateAllCharacters(characterType);
            },
            /**
             * ---> ---------  completed soon -------
             * @param {string} action
             * @return none
             */
            changeLanguageButtonIndex(action) {
                if (action === "open")
                    this.languageButtonIndex = 40;
                else if (action === "close")
                    this.languageButtonIndex = 20;
            },

            /**
             * ---> calculate total time spend for a user to create his list of characters
             * @param  none
             * @return none
             */
            calculateTotalTime() {
                let endTime = Date.now();
                let spendTime = Math.round((endTime - this.startTime));
                this.totalTime = spendTime;
            },

            /**
             * ---> Launch modal with the given character object
             * @param {Object} character
             * @return none
             */
            launch(character) {
                if (this.$refs.listToFill.getCharacterListSize() < this.maxCharactersInGroup || this.replaceCharacterMode) {
                    this.$refs.modal.openModal(this.totalCreated, character, this.totalCreated, false, this.labels.createAvatar);

                }
            },


            /**
             * ---> Launch edit modal with the given character object (might need refactoring)
             * @param {Object} character
             * @param {Number} index
             * @return none
             */
            launchEditModal(character, index) {
                this.$refs.modal.openModal(index, character, this.totalCreated, true, this.labels.editAvatar);
            },
            /**
             * --->  Update Home information and add the character to the groupList
             * @param {Object} character
             * @param {Object} colors
             * @return none
             */
            saveCharacter(character, colors) {
                this.totalCreated++;
                this.manageCharacterCount();
                this.$refs.listToFill.addCharacterToGroup(character,
                    colors, this.getCurrentCharacterType(this.totalCreated));
                this.isMobile = this.$refs.listToFill.isScreenMobile();
                if(this.totalCreated >= 1){
                  this.enabledRandomBtn();
                }
                if (this.$refs.listToFill.getCharacterListSize() === this.maxCharactersInGroup) {
                    this.isGroupComplete = true;
                    this.disableRandomBtn();
                    window.scrollTo(0, document.body.scrollHeight);
                }

                if (this.totalCreated < this.maxCharactersInGroup && window.innerWidth < 420) {
                    window.scrollTo(0, document.body.scrollHeight);
                    setTimeout(() => {
                        window.scrollTo({top: 0, behavior: 'smooth', x: 0})
                    }, parseInt(charactersJson.scrollingTimeControl));
                } else if (this.totalCreated < this.maxCharactersInGroup && window.innerWidth < 420) {
                    setTimeout(() => {
                        window.scrollTo({top: -100, behavior: 'smooth', x: 0})
                    }, 100);
                }
            },

            /**
             * ---> Update Home information and replace the character groupList
             * @param {Object} character
             * @param {Object} colors
             * @param type
             * @param id
             * @return none
             */
            saveCharacterAfterReplace(character, colors, type, id) {
                this.$refs.listToFill.replaceCharacterInGroup(character,
                    colors, type, id);
                window.scrollTo(0, document.body.scrollHeight);
                this.enabledRandomBtn();
                if (this.totalCreated < this.maxCharactersInGroup && window.innerWidth < 420) {
                    setTimeout(() => {
                            window.scrollTo({top: 0, behavior: 'smooth', x: 0})
                        },
                        parseInt(charactersJson.scrollingTimeControl));
                }
            },


            /**
             * ---> Edit groupList character
             * @param {Object} character
             * @param {Object} colors
             * @return none
             */
            editCharacter(character, colors) {
              //console.log("Edit");
              this.disableRandomBtn();
                this.$refs.listToFill.editCharacter(character,
                    colors, character.characterType);
            },

            /**
             * ---> Return current Character type based on the position in the groupList
             * @param {Number} position
             * @return {String} character Type
             */
            getCurrentCharacterType(position) {
                if (position <= charactersJson.nbAvatar) {
                    return "avatar";
                } else if (position <= charactersJson.nbAvatar + charactersJson.nbVulnerable) {
                    return "vulnerable"
                } else if (position <= charactersJson.nbAvatar + charactersJson.nbVulnerable + charactersJson.nbCommunity) {
                    return "comm";
                }
            },


            /**
             * ---> Go to the animation Page. Send the current language and the character groupList
             * @param none
             * @return none
             */
            loadAnimationView() {
                let groupCharacter = this.$refs.listToFill.getCharacterList();
                this.calculateTotalTime();
                this.$router.push({
                    name: 'Animation',
                    params: {
                        group: groupCharacter,
                        totalTime: [this.totalTime],
                    }
                });
                localStorage.setItem("language", this.labels.currentLanguage);
            },

            /**
             * ---> Manage messages on the Home page based on the character group number created
             * @param none
             * @return none
             */
            manageCharacterCount() {
                if (this.totalCreated < charactersJson.nbAvatar + charactersJson.nbVulnerable) {
                    this.step++;
                } else if (this.totalCreated < charactersJson.nbAvatar + charactersJson.nbVulnerable + charactersJson.nbCommunity && this.step < this.labels.stepsMakingAvatar.length - 1) {
                    this.step++;
                }
            },


            /**
             * ---> Change the language of the Application
             * @param none
             * @return none
             */
            changeLanguage() {
                if (this.isLanguageChanged)
                    this.labels = textsEng;
                else
                    this.labels = textsFr;
                this.isLanguageChanged = !this.isLanguageChanged;
                this.$forceUpdate();
            },

            /**
             * ---> ---------  completed soon -------
             * @param none
             * @return none
             */
            setDebugMode() {
                if (this.$route.query.debug === "true") {
                    this.debugMode = true;
                }
            },

            /**
             * ---> Check if the language in query is en and change the language to english it's that the case
             * @return none
             */
            setLanguage() {
                if (localStorage.getItem("language") === "en") {
                    this.changeLanguage()
                }
            },

            /**
             * ---> Check if the language in query is en and change the language to english it's that the case
             * @return none
             */
            setReplaceCharacterMode(mode) {
                this.replaceCharacterMode = !mode;
                this.$refs.listToFill.changeCharacterReplaceMode(mode);
            },

        },


            /**
             * ---> Load json data and labels
             * @param none
             * @return none
             */
            created() {
                this.characterList = charactersJson.characters;
                this.labels = textsFr;
                this.maxCharactersInGroup = charactersJson.nbAvatar + charactersJson.nbVulnerable + charactersJson.nbCommunity;
                this.contextualInfo = this.labels.contextualInfoAvatar;
                this.facialHairList = facialHairJson.beards;
                this.skinColors = charactersJson.skinColors;
                this.hairColors = charactersJson.hairColors;
                this.defaultCharacterColors = charactersJson.defaultColors;
                this.nbAvatar = charactersJson.nbAvatar;
                this.nbrVulnerable = charactersJson.nbVulnerable;
                this.nbrCommunity = charactersJson.nbCommunity;
                this.maxColorTile =  charactersJson.maxColorTile;
            },

            mounted() {
                let html = document.querySelector("html");
                html.style = "background-color: #FFFFFF !important";
                this.setDebugMode();
                this.setLanguage();
                this.track();
                window.scrollTo({top: 0, x: 0})
                this.disableRandomBtn();

            }
        }
</script>
<style>
    /* To change the visual for the color picker */
    div.vc-compact {
        width: 100%;
    }
    li.vc-compact-color-item {
        width: 45px;
        height: 45px;
    }
    div.vc-compact-dot {
        width: 50%;
        height: 50%;
        top: 25%;
        bottom: 25%;
        left: 25%;
        right: 25%;
    }

</style>
<style scoped>
    html {
        overflow-y: hidden !important;
    }
    .container {
        margin-top: 50px;
    }

    .instructions-block {
        margin: 15px 0px;
    }

    @media screen and (min-width:300px) {
        .instructions-block {
            margin: auto;

        }
    }

    @media screen and (min-width:697px) {
        .instructions-block {
            margin: auto 200px;
        }
    }
    @media screen and (min-width:420px) {
        .page-instruction {
            margin-top: 0.5%;
            font-family: Roboto;
            font-weight: bold;
            /*font-size: 20px;*/
            font-size: 20px;
        }
        #selectLanguage {
            position: absolute;
            right: 0px;
            top: 0px;
            margin-top: 20px;
            margin-right: 20px;
        }
    }

    h1 {
        font-weight: bold;
    }
    h2 {
        font-size: 1.3rem;
        font-weight: bold;
        margin: 2rem 0 1rem;
    }
    p {
        margin: 1px 0;
    }
    .tool {
        margin: 1px;
        display: flex;
        justify-content: center;
    }

    p#contextualInfo {
        margin: 0.2rem;
        font-size: 1rem;

    }

    .continue {
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        line-height: 28px;
        text-align: center;
        color: #043213;
        width: 289px;
        height: 61px !important;
        box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        font-size: 15px;
        position: relative;
        margin: 16px auto;
    }

    .continue:active {
        top: 4px;
        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.25);
    }

    .continue:focus {outline:0;}


    #selectLanguage {
        color: #0000EE;
        background-color: #FFF;
        border: 1px solid #0000EE;
        font-family: Roboto;
        font-weight: bold;
        font-size: 14px;
        width: 120px;
        height: 34px;
        border-radius: 15px;
    }
</style>
