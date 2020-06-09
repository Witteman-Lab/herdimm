<template>
    <div class="container" v-recognizer:pinch.cancel="">
        <!-- Audio player for audio files -->
        <AudioPlayer :current-language="currentLanguage" :voice="voiceToPlayAtAnimation" :checkbox-state-audio-player="checkboxState" ref="audioPlayer"></AudioPlayer>

        <div id="captions" class="captions" v-if="this.checkboxState" style="display: flex;justify-content: space-between;">
            <p id="paragraph" class="paragraph"></p>
            <button style="margin: auto 10px;" class="delete" aria-label="close modal" v-on:click="this.disableCaptions"></button>
        </div>
        <!-- Where to draw the lines for infection spreading  -->
        <div class="draw" id="draw">
            <svg class="connections" ref="connections" id="connections"></svg>
        </div>

        <!-- Container for the shapes (hexagons) -->
        <div id="shapes-container" style="display: flex; justify-content: center;">
            <div class="hexagon-container" id="main-container">
                <!-- Grid creation -->
                <div class="shape" v-for="(shape, index) in this.gridIds" :key="index">
                    <div :class="shape.className" :id="shape.id">
                        <!-- Where the group members are being placed -->
                        <div v-if="shape.isCharacter">
                            <Character :characterType="shape.character.characterType" v-bind:ref="shape.id" :size="{ width: characterSize }"  :edit="false" :customised="true" :colors="shape.character.colors" :id="shape.character.id" :svgFile="require(`../assets/characters/${shape.character.file}`)" />
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <!---------------------------------------------------------------------------------------------->
        <v-row justify="center">
            <v-dialog
                    v-model="dialogAnimation"
                    max-width="290"
                    persistent
            >
                <v-card>
                    <div id="startAnimationBox" v-if="!this.isAnimationStarted">
                        <div v-if="!this.reloadAnimationPage">
                            <v-btn color="#05CDC1" style="height: 50px;" class="continue" v-on:click="startAnimation()">
                                <span>{{textButtonAnimation.toUpperCase()}}</span>
                                <font-awesome-icon style="margin-left: 10px;" icon="play" size="lg"/>
                            </v-btn>
                            <div style="display: flex">
                                <input type="checkbox" id="showCaptions" name="showCaptions">
                                <label class="choose-subtitles" for="showCaptions">{{this.labels.displayCaptions}}</label>
                            </div>
                        </div>
                        <div v-if="this.reloadAnimationPage" style="display: grid">
                            <v-btn color="#05CDC1" style="height: 50px;" class="continue" v-on:click="reloadAnimationComp()">
                                <span>{{this.labels.restartAnimation.toUpperCase()}}</span>
                                <font-awesome-icon style="margin-left: 10px;" icon="redo" size="lg"/>

                            </v-btn>
                            <v-btn v-if="this.returnUrl !== '' && this.returnUrl !== undefined" color="#05CDC1" style="height: 50px;" class="continue" v-on:click="loadQualtrics()">
                                <span>{{this.labels.redirectSurvey.toUpperCase()}}</span>
                                <font-awesome-icon style="margin-left: 10px;" icon="external-link-alt" size="lg"/>
                            </v-btn>
                        </div>
                    </div>
                </v-card>
            </v-dialog>
        </v-row>
        <!---------------------------------------------------------------------------------------------->

<!--        <div id="commandAnimationBox" style="display: none; justify-content: space-between" v-if="this.isAnimationStarted">-->
<!--            <a><font-awesome-icon style="margin: 10px;" icon="fast-backward" size="lg" v-on:click="manageAudioPlayer('begin')"/></a>-->
<!--            <a><font-awesome-icon style="margin: 10px;" icon="step-backward" size="lg" v-on:click="manageAudioPlayer('before')"/></a>-->
<!--            <a v-if="!isAudioPlaying"><font-awesome-icon style="margin: 10px;" icon="play" size="lg" v-on:click="manageAudioPlayer('restart')"/></a>-->
<!--            <a v-if="isAudioPlaying"><font-awesome-icon style="margin: 10px;" icon="pause" size="lg" v-on:click="manageAudioPlayer('pause')"/></a>-->
<!--            <a><font-awesome-icon style="margin: 10px;" icon="step-forward" size="lg" v-on:click="manageAudioPlayer('next')"/></a>-->
<!--            <a><font-awesome-icon style="margin: 10px;" icon="fast-forward" size="lg" v-on:click="manageAudioPlayer('end')"/></a>-->
<!--        </div>-->
    </div>
</template>

<script>
    import Character from "./Character";
    import AudioPlayer from "./AudioPlayer";
    // The scenario might need to be imported in AudioPlayer instead of here, I'm not sure at the moment
    import shapesArray from "../assets/json/shapesArray";
    import textsEng from "../assets/json/textsEng.json";
    import textsFr from "../assets/json/textsFr.json";
    import connections from "../assets/json/connections.json";
    import config from "../../api/config/configMongoDB";


    export default {
        name: "Animation",
        components: {
            Character,
            AudioPlayer
        },
        data() {
            return {
                characterList: [],
                labels: {},
                gridIds: [],
                diseaseArray : ["flu", "measles", "pertussis"],
                characterSize: 0,
                characterBottomMargin: 0,
                currentLanguage: "",
                textButtonAnimation: '',
                reloadAnimationPage: false,
                isAnimationStarted: false,
                isAudioPlaying: false,
                checkboxState: false,
                dialogAnimation : true,
                voiceToPlayAtAnimation : '',
                counter: 0,
                state: "",

                diseaseToPlay: String,
                voiceToPlay: String,
                returnUrl: String,
                uid: String,
                labelSelected: String
            }
        },
        props: {
            group: {
                type: Array
            },
            totalTime: Array,
        },
        methods: {
            /**
             * ---> TO DO
             * @param TO DO
             * @return TO DO
             */
            sendCharactersToApi(chosenDB) {

                const url =`http://${config.API_URL_PROD}/api/${chosenDB}/herdimm`;
                let dataSent = {
                    group: JSON.parse(localStorage.getItem("group")),
                    totalTime: JSON.parse(localStorage.getItem("totalTime")),
                    checkedCaption: this.checkboxState,
                    uid: this.uid
                };
                fetch(url, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(dataSent)
                });
            },
            /**
             * ---> TO DO
             * @param TO DO
             * @return TO DO
             */
            generateUrlQualtrics() {
                this.state = "completed";
                let finalUrl = this.returnUrl;
                const group = localStorage.getItem("group");
                const myg = localStorage.getItem("totalTime");
                window.location.replace(`${finalUrl}&uid=${this.uid}&state=${this.state}&group=${group}&myg=${myg}`);
            },

            /**
             * ---> Start the animation when user is ready, clicks on the Start button
             * @param none
             * @return none
             */
            startAnimation() {
                // might need to change this function name or the way it handles operation
                // if (this.reloadAnimationPage) {
                //     if (this.returnUrl !== "" && this.returnUrl !== undefined) {
                //     } else {
                //     }
                // } else {
                    this.checkboxState = document.getElementById("showCaptions").checked;
                    this.isAnimationStarted = true;
                    this.$refs.audioPlayer.playAudio();
                    this.isAnimationPlaying();
                    this.sendCharactersToApi('mongodb');
                    this.dialogAnimation = false;

                // }
            },

            reloadAnimationComp() {
                window.location.reload();
                this.dialogAnimation = true;
            },

            loadQualtrics() {
                this.generateUrlQualtrics();
            },

            /**
             * ---> Manage actions on the audio player (play, pause, first audio, end audio, previous, next)
             * @param {String} action
             * @return none
             */
            manageAudioPlayer(action) {
                if (action === "begin")
                    this.$refs.audioPlayer.firstAudio();
                else if (action === "end")
                    this.$refs.audioPlayer.lastAudio();
                else if (action ===  "before")
                    this.$refs.audioPlayer.previousAudio();
                else if (action === "next")
                    this.$refs.audioPlayer.nextAudio();
                else if (action === "pause")
                    this.$refs.audioPlayer.stopAudio();
                else if (action === "restart")
                    this.$refs.audioPlayer.restartAudio();
                this.isAnimationPlaying();
            },


            disableCaptions() {
                this.checkboxState = false;
            },

            /**
             * ---> Update audio status to show or hide play or pause button
             * @param none
             * @return none
             */
            isAnimationPlaying() {
                this.isAudioPlaying = this.$refs.audioPlayer.getAudioStatus();
            },

            /**
             * ---> Initialize variables to reload the animation
             * @param none
             * @return none
             */
            reloadAnimation() {
                this.isAnimationStarted = false;
                this.reloadAnimationPage = true;

                if (this.returnUrl !== "" && this.returnUrl !== undefined) {
                    this.textButtonAnimation = this.labels.redirectSurvey;
                } else {
                    this.textButtonAnimation = this.labels.restartAnimation ;
                }
            },

            /**
             * ---> Build the hexagon grid based on an array
             * @param none
             * @return none
             */
            buildGridIds() {
                let numId = 0;

                // For every row
                for (let i = 0; i < shapesArray.ShapesArrayList.length; i++) {

                    // For every element in each row
                    for (let j = 0; j < shapesArray.ShapesArrayList[i].length; j++) {
                        let shapeValue = shapesArray.ShapesArrayList[i][j];
                        let shapeObj = {};

                        // Get the integer part of the shape value (when shape value is floating)
                        let integr = Math.trunc(shapeValue);
                        let decimal;

                        // Give the object a className
                        switch(integr) {
                            case 1:
                                shapeObj.className = "avatar";
                                break;
                            case 2:
                                shapeObj.className = "vulnerable";
                                break;
                            case 3:
                                // Get the decimal part (and make it integer) of the shape value so we can get the ordering
                                decimal = Math.round((shapeValue - integr) * 10, 0);
                                shapeObj.className = "comm";
                                // Indicate its position (-1 because o-based array)
                                shapeObj.position = decimal + integr - 1;
                                break;
                            case 4:
                                shapeObj.className = "gen";
                                break;
                            default:
                                shapeObj.className = "no-hexagon";
                        }

                        this.getCharacterFromList(shapeObj);

                        // Give the object an id and/or a class name
                        if (shapeValue !== 0) {
                            shapeObj.id = "shape_" + (++numId);
                            // shapeObj.classList.add("hexagon");
                            shapeObj.className += " hexagon";
                        }

                        this.gridIds.push(shapeObj);
                    }
                }
            },

            /**
             * ---> To place the right group member in the right shape
             * @param {Object} shapeObj
             * @return none
             */
            getCharacterFromList(shapeObj) {
                let isCharacter = false;

                // For each character in the characterList
                this.characterList.map((character, index) => {
                    // If the character's type corresponds to the shape's class name (e.g. avatar/vulnerable/comm)
                    // AND if isCharacter is false (not sure of the usefulness of this check)
                    // AND if character is not already positioned in a shape (shapeObj)
                    if (character.characterType === shapeObj.className && !isCharacter && !character.isPositioned) {
                        let char;

                        isCharacter = true;
                        shapeObj.isCharacter = isCharacter;

                        // Check if character is of type "comm" (special treatment for positioning them in a certain order)
                        // NOTE: Using slice() instead of splice() allows to maintain characters' position in the characterList
                        // splice() removes the item from the characterList while slice() keeps it there
                        if (character.characterType === "comm") {
                            char = this.characterList.slice(shapeObj.position, shapeObj.position + 1);
                        } else {
                            char = this.characterList.slice(index, index + 1);
                        }

                        // Indicate that the character has been positioned in it's shape so we don't try to position it once again
                        character.isPositioned = true;
                        // Assign the appropriate character to its shape
                        shapeObj.character = char[0];
                    }
                });
            },


            /**
             * ---> Change the language of the interface
             * @param {String} language
             * @return none
             */
            selectCurrentLanguage(language) {
                if (language === "fr")
                    this.labels = textsFr;
                else
                    this.labels = textsEng;
                this.currentLanguage = this.labels.currentLanguage;
            },

            /**
             * ---> Set the character's t-shirt color
             * @param {String} shapeId
             * @param {String} color
             * @return none
             */
            ChangeTShirtColor(shapeId, color, proportion) {
                // TO-DO: try different proportion
                let darkerColor = this.$refs[shapeId][0].getDarkerShade(color, proportion);
                this.$refs[shapeId][0].changeAccessoriesColor(darkerColor, proportion);
                this.$refs[shapeId][0].changeShirtColor(darkerColor, proportion);
            },

            /**
             * ---> Duplicate the hexagon grid n time (nbOfCopy) to make some animations easier
             * @param {Number} nbOfCopy
             * @return none
             */
            duplicateGrid(nbOfCopy) {
                const sourceElement = document.querySelector('.hexagon-container');
                const destination = sourceElement.parentNode;
                let copy;

                for (let i = 1; i <= nbOfCopy; i++) {
                    copy = sourceElement.cloneNode(true);
                    copy.classList.add("copy");
                    copy.id = "copy" + i;
                    copy.querySelectorAll('.character-position').forEach(e => e.parentNode.removeChild(e));
                    destination.appendChild(copy);
                }
            },

            /**
             * ---> Parse the scenario to find sequences for the animation
             * ---> This method might not be here (maybe in AudioPlayer, maybe not)
             * @param {Object} sequence
             * @return none
             */
            launchSequence(sequence) {
                if (sequence.action !== null && sequence.action !== "") {
                    this.executeFunctionByName(sequence.action, this, sequence.props);
                }
            },

            /**
             * ---> Execute the appropriate function by its name received as a string as well as with arguments
             * @param {String} functionName
             * @param {Object} context
             * @param {Array} args
             * @return none
             */
            executeFunctionByName(functionName, context, args) {
                // why use argument instead of the parameter args ??
                // just disable the warning but it needs to be discuss
                let newArgs = Array.prototype.slice.call(arguments, 2);
                console.log(args);
                return context[functionName].apply(context, newArgs);
            },

            /**
             * ---> Zoom in or out depending on the parameters (props) received
             * @param {Object} props
             * @return none
             */
            zoom(props) {
               const targets = document.querySelectorAll('.hexagon-container');
               //const targets = document.querySelectorAll('.hexagon-container, #draw');
                setTimeout(() => {
                    targets.forEach((e) => {
                        e.style.transform = "scale("+props.scale.toString()+","+props.scale.toString()+")";
                        e.style.transitionDuration = props.duration.toString()+"ms";
                        e.style.transitionTimingFunction = props.timingFunction;
                        e.style.transformOrigin = props.transformOrigin_X.toString()+"%"+" "+props.transformOrigin_Y.toString()+"%"; //"30% 30%"
                        e.style.transitionDelay = props.startTime.toString()+"ms";
                        e.style.transitionProperty = "transform";
                    });
                });
            },

            /**
             * ---> A way to "draw" the contour of the shapes without using borders
             * ---> Borders are not rendering well the way shapes (hexagons in this case) are being created
             * @param {Object} props
             * @return none
             */
            makeContour(props) {
                let shapeTargets = "";
                if (props.class === "contour") {
                    shapeTargets = document.querySelectorAll('#copy2 ' + props.target);
                } else if (props.class === "vulnerableContour") {
                    shapeTargets = document.querySelectorAll('.copy ' + props.target);
                }
                setTimeout(() => {
                    if (props.add) {
                        shapeTargets.forEach(e => {
                            e.style.zIndex = "3000";
                            e.classList.add(props.class);
                        });
                    } else {
                        shapeTargets.forEach(e => {
                            this.counter++;
                            e.style.zIndex = "0";
                            e.classList.remove(props.class);
                            //e.style.zIndex = "999";
                            if(this.counter <= 1)
                                e.style.zIndex = "10";
                            else{
                                e.style.zIndex = "999";
                            }
                        });
                    }
                }, parseInt(props.startTime));
            },

            /**
             * ---> Transition used between 2 sequences (fade to white and back)
             * @param {Number} startTime
             * @param {Number} duration
             * @return none
             */
            fadeInOut(props) {
                // Fade-in transition
                setTimeout(() => {
                    document.getElementById('shapes-container').classList.remove('fade-in');
                    document.getElementById('shapes-container').classList.add('fade-out');
                }, parseInt(props.startTime));

                // Fade-out transition (back to normal)
                setTimeout(() => {
                    document.getElementById('shapes-container').classList.add('fade-in');
                    document.getElementById('shapes-container').classList.remove('fade-out');
                }, (parseInt(props.startTime) + parseInt(props.duration)));
            },


            /**--->  ---------------------------------- It's will be completed later ------------------------------
             * @param {Number} delay
             * @return
             */
            makeTransformer(startTime) {
                setTimeout(() => {
                    const shapeTargets = document.querySelectorAll('.hexagon');
                    const shapeTargetsVaccinated = document.querySelectorAll('.vaccinated');
                    shapeTargets.forEach((e) => {
                        if (e.classList.value.indexOf("vulnerable") === -1) { // <-- For testing purpose
                            shapeTargetsVaccinated.forEach((b) => {
                                if (e.id === b.id) {
                                    e.classList.add("barrier");
                                }
                            });
                        }
                    });
                }, parseInt(startTime));
            },



            /**--->  ---------------------------------- It's will be completed later ------------------------------
             * @param {Number} delay
             * @return
             */
            removeBarrier(props){
                setTimeout(() => {
                    const shapeTargets = document.querySelectorAll('.hexagon');
                    const shapeTargetsVaccinated = document.querySelectorAll('.vaccinated');
                    shapeTargets.forEach((e) => {
                        if (e.classList.value.indexOf("vulnerable") === -1) { // <-- For testing purpose
                            shapeTargetsVaccinated.forEach((b) => {
                                if (e.id === b.id) {
                                    e.classList.remove("barrier");
                                }
                            });
                        }
                    });
                }, parseInt(props.startTime));
            },


            /**--->  ---------------------------------- It's will be completed later ------------------------------
             * @param {Number} delay
             * @return
             */
            removeInfection(props) {
                setTimeout(() => {
                    const shapeTargets = document.querySelectorAll('.infected');
                    shapeTargets.forEach((e) => {
                        e.classList.remove("infected");
                        if (this.characterChecking(e.id)) {
                            let characterType = e.children[0].children[0].getAttribute('characterType');
                            if (characterType === "avatar") {
                                this.ChangeTShirtColor(e.id, connections.secondDefaultShirtColor, connections.proportion);
                            } else if (characterType === "vulnerable") {
                                this.ChangeTShirtColor(e.id, connections.vulnerableShirtColor, connections.proportion);
                            } else {
                                this.ChangeTShirtColor(e.id, connections.defaultShirtColor, connections.proportion);
                            }
                        }
                    });
                }, parseInt(props.startTime));
            },

            /**
             * ---> This function randomly returns between [0-2]
             *  @param {number} value
             *  @return {number}
             */
            getRandomInt(value){
              return Math.floor(Math.random()*Math.floor(value));
            },


            /**
             * --->  ---------------------------------- It's will be completed later ------------------------------
             * @param {Array} props
             * @return none
             */
            parseSpreadInfection(props){
                let durationLine = (parseInt(props.durationLine)/1000).toString();
                let durationLineBouncingOff = (parseInt(props.durationLineBouncingOff)/1000).toString();
                let path="";
                let linewidth = 0;
                //const linewidth = props.linewidth;
                if (window.innerWidth <= 768){
                    linewidth = props.linewidthMobile;
                }
                else{
                    linewidth = props.linewidthWeb;
                }
                if (typeof(props.file) === "object") {
                    if (localStorage.getItem("disease") === this.diseaseArray[0] || localStorage.getItem("disease") === this.diseaseArray[1] || localStorage.getItem("disease") === this.diseaseArray[2])
                    {

                        path = require("../assets/json/" + localStorage.getItem("disease")+".json");
                        setTimeout(() => {
                            this.spreadInfection(path.connections, durationLine, durationLineBouncingOff, linewidth);
                        }, props.startTime);
                    } else {
                        if (props.file.length !== 0) {
                            let value;
                            if (props.file.length === 1) {
                                value = 0;
                            } else {
                                value = this.getRandomInt(props.file.length);
                            }

                            path = require("../assets/json/" + props.file[value]);
                            setTimeout(() => {
                                this.spreadInfection(path.connections, durationLine, durationLineBouncingOff, linewidth);
                            }, props.startTime);
                        } else {
                            alert("Add the name of json file in array to have infection sequences");
                        }
                    }
                } else {
                    path = require("../assets/json/" + props.file);

                    setTimeout(() => {
                        this.spreadInfection(path.connections, durationLine, durationLineBouncingOff, linewidth);
                    }, parseInt(props.startTime));
                }
            },


            /**
             * --->  this method allows the gradual disappearance of lines and its removal
             * @param {Object} props
             * @return none
             */
            removeLine() {
                setTimeout(() => {
                    let nodeListLine = document.querySelectorAll("line");
                    let delay = parseInt(connections.removelineDuration);
                    let duration = (delay/1000).toString()+"s";
                    nodeListLine.forEach(e => {
                        e.style.strokeOpacity = "0";
                        e.style.transition = "opacity";
                        e.style.transitionDuration = duration;
                        e.style.transitionProperty = "all";
                        setTimeout(()=> {
                            e.parentNode.removeChild(e);
                        }, delay)
                    });

                }, parseInt(connections.delayCallRemoveline));
            },

            /**
             * --->  this method checks if the shape contains avatar
             * @param {string} shape_id
             * @return {Boolean}
             */
            characterChecking(shape_id) {
                let value = false;
                let variable = document.querySelectorAll("#main-container #"+shape_id);
                variable.forEach(e => {
                    let array = (e.getAttribute("class")).split(" ");
                    if (array[0] === "comm" || array[0] === "avatar" || array[0] === "vulnerable"){
                        value = true;
                    }
                });
                return value;
            },

            /**
             * ---> Parse the pattern (JSON pattern) to draw lines between various shapes during infection
             * @param {Object} pattern
             * @return none
             */
            spreadInfection(pattern, durationLine, durationLineBouncingOff, linewidth) {
                const drawingBoard = document.querySelector("#connections");
                const selector = '#main-container #';
                const state = "infected";
                let endOfTheSequence;
                for (let i = 0; i < pattern.length; i++) {
                    let source = pattern[i].source;
                    let target = pattern[i].target;
                    endOfTheSequence = pattern[0].endOfTheSequence;
                    let targetGetsInfected = pattern[i].targetGetsInfected;
                    let infectionIsBouncing = pattern[i].infectionIsBouncing;
                    let nextTarget 	= pattern[i].nextTarget;
                    let id = pattern[i].id;
                    let line = connections.linewidth;
                    if (linewidth)
                        line = linewidth;
                    let lineObj = this.drawLine(source, target, id, line);
                    let lineLength = this.getLineLength(lineObj);

                    lineObj.setAttributeNS(null, "stroke-dasharray", lineLength + " " + lineLength);
                    lineObj.setAttributeNS(null, "stroke-dashoffset", lineLength);
                    // lineObj.style.webkitAnimation = "dash "+duration+"s"+" linear 0s forwards";
                    // lineObj.style.animation = "dash "+duration+"s"+" linear 0s forwards";
                    // Check if the target gets infected to add the proper class (CSS animation)
                    if (targetGetsInfected) {
                        // Target might get infected, but we still want the infection lines to bounce, so we check if infectionIsBouncing is true
                        if (infectionIsBouncing) {
                            //lineObj.classList.add("lineBouncingOff");
                            lineObj.style.webkitAnimation = "dash "+durationLineBouncingOff+"s"+" linear 0s 6 alternate";
                            lineObj.style.animation = "dash "+durationLineBouncingOff+"s"+" linear 0s 6 alternate";

                        } else {
                            //lineObj.classList.add("line");
                            lineObj.style.webkitAnimation = "dash "+durationLine+"s"+" linear 0s forwards";
                            lineObj.style.animation = "dash "+durationLine+"s"+" linear 0s forwards";
                        }
                    } else {
                        //lineObj.classList.add("lineBouncingOff");
                        lineObj.style.webkitAnimation = "dash "+durationLineBouncingOff+"s"+" linear 0s 6 alternate";
                        lineObj.style.animation = "dash "+durationLineBouncingOff+"s"+" linear 0s 6 alternate";
                    }


                    // Add the line to the drawingboard (SVG element)
                    drawingBoard.appendChild(lineObj);


                    // When the animation starts, source gets infected, its color changes
                    lineObj.addEventListener("animationstart", () => { // webkitAnimationStart
                        this.hexColor(selector, source, state);
                        if (this.characterChecking(source) === true) {
                            this.ChangeTShirtColor(source, connections.infectedShirtColor, connections.proportion);
                        }
                    });
                    // When the animation ends, check if there is a next target
                    lineObj.addEventListener("animationend", () => { // webkitAnimationEnd
                        if (nextTarget !== "") {
                            this.spreadInfection(nextTarget, durationLine, durationLineBouncingOff, line);
                        }

                        // If target gets infected, its color changes
                        if (targetGetsInfected) {
                            this.hexColor(selector, target, state);
                            if (this.characterChecking(target) === true) {
                                this.ChangeTShirtColor(target, connections.infectedShirtColor, connections.proportion);
                            }
                        }
                    });
                }
                if (endOfTheSequence) {
                    this.removeLine();
                }
            },


            /**
             * ---> Compute and return the length of the line for its animation
             * @param {Object} line
             * @return number
             */
            getLineLength(line) {
                let x1 = line.x1.baseVal.value;
                let x2 = line.x2.baseVal.value;
                let y1 = line.y1.baseVal.value;
                let y2 = line.y2.baseVal.value;
                return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2);
            },

            burstscrollingTimeControlContour(props) {
                let selector = '#copy1 ';
                const shapeTargets = document.querySelectorAll(selector + props.target);

                this.hexColor(selector, props.target, props.state);

                setTimeout(() => {
                    selector += "#";
                    shapeTargets.forEach((e) => {
                        this.changeSize(selector, e.id, props.scale, props.timingFunction, props.duration);
                    });
                }, parseInt(props.startTime));
            },


            /**
             * ---> Compute and return the length of the line for its animation
             * @param {Object} props
             * @return none
             */
            burst(props) {
                const selector = '#main-container #';

                if (props.add) {
                    // this.hexColor(selector, props.target, props.state);
                    setTimeout(() => {
                        this.hexColor(selector, props.target, props.state);
                        this.changeSize(selector, props.target, props.scale, props.timingFunction, props.duration);
                        this.setCharacterTshirtColor(props.target, props.state);
                    }, parseInt(props.startTime));
                } else {
                    setTimeout(() => {
                        document.querySelector(selector + props.target).classList.remove(props.state);
                        if (this.characterChecking(props.target)) {
                            let characterType = document.querySelector(selector + props.target).children[0].children[0].getAttribute('characterType');
                            if (characterType === "avatar") {
                                this.ChangeTShirtColor(props.target, connections.secondDefaultShirtColor, connections.proportion);
                            } else if (characterType === "vulnerable") {
                                this.ChangeTShirtColor(props.target, connections.vulnerableShirtColor, connections.proportion);
                            } else {
                                this.ChangeTShirtColor(props.target, connections.defaultShirtColor, connections.proportion);
                            }
                        }

                    }, parseInt(props.startTime));
                }

            },


            /**
             * ---> ------------------ will be completed soon -------------------
             * @param {Object} props
             * @return none
             */
            changeShapeColor(props) {
                const selector = '#main-container ';
                setTimeout(() => {
                    const shapeTargets = document.querySelectorAll(selector + props.target);
                    shapeTargets.forEach((e) => {
                        e.classList.add(props.state);
                        this.setCharacterTshirtColor(e.id, props.state);
                    });

                }, parseInt(props.startTime));
            },

            /**
             * ---> ------------------ will be completed soon -------------------
             * @param {Object} props
             * @return none
             */
            setCharacterTshirtColor(target, state) {
                if (this.characterChecking(target)) {
                    if (state === connections.stateInfected) {
                        this.ChangeTShirtColor(target, connections.infectedShirtColor, connections.proportion);
                    } else if (state === connections.stateVaccinated) {
                        this.ChangeTShirtColor(target, connections.vaccinatedShirtColor, connections.proportion);
                    } else if (state === connections.stateVulnerable) {
                        this.ChangeTShirtColor(target, connections.vulnerableShirtColor, connections.proportion);
                    }
                }
            },

            /**
             * ---> Change the color of the shape (target) based on its status (vaccinated, infected)
             * @param {String} selector
             * @param {String} target
             * @param {String} state
             * @return none
             */
            hexColor(selector, target, state){
                document.querySelector(selector+target).classList.remove(connections.stateInfected);
                document.querySelector(selector+target).classList.remove(connections.stateVaccinated);
                if (state !== "") {
                    document.querySelector(selector+target).classList.add(state);
                }
            },

            /**
             * ---> Reset all the shapes (the grid) to their initial states
             * @param {Object} props
             * @return none
             */
            resetGrid(props) {
                let shapes =  document.querySelector("#main-container");
                setTimeout(() => {
                        (shapes.childNodes).forEach((value) => {
                            value.childNodes[0].classList.remove(connections.stateInfected);
                            value.childNodes[0].classList.remove(connections.stateVaccinated);
                            value.childNodes[0].classList.remove(connections.stateBarrier);
                            let id_shape = value.childNodes[0].id;
                            if (id_shape !== "") {
                                if (this.characterChecking(id_shape)) {
                                    let characterType = value.children[0].children[0].children[0].getAttribute('characterType');
                                    if (characterType === "avatar") {
                                        this.ChangeTShirtColor(id_shape, connections.secondDefaultShirtColor, connections.proportion);
                                    } else if (characterType === "vulnerable") {
                                        this.ChangeTShirtColor(id_shape, connections.vulnerableShirtColor, connections.proportion);
                                    } else {
                                        this.ChangeTShirtColor(id_shape, connections.defaultShirtColor, connections.proportion);
                                    }
                                }
                            }
                        });
                }, parseInt(props.startTime));
            },

            /**
             * ---> Change the size of the shape (target)
             * @param {String} selector
             * @param {String} target
             * @param {String} scale
             * @param {String} timingFunction
             * @param {String} duration
             * @return none
             */
            changeSize(selector, target, scale, timingFunction, duration){
                let shape = document.querySelector(selector+target);

                // Scaling up
                shape.style.transform = "scale("+scale.toString()+","+scale.toString()+")";
                shape.style.transitionDuration = duration.toString()+"ms";
                shape.style.transitionTimingFunction = timingFunction;
                shape.style.transitionProperty = "transform";
                // Scaling back after scaling up is done using scaleing up duration as delay
                setTimeout(() => {
                    shape.style.transform = "scale(1,1)";
                    shape.style.transitionDuration = duration.toString()+"ms";
                    shape.style.transitionTimingFunction = timingFunction;
                    shape.style.transitionProperty = "transform";
                }, parseInt(duration));
            },

            /**
             * ---> ------------------ will be completed soon -------------------
             * @param none
             * @return none
             */
            vaccination(props){
                const selector = '#main-container #';
                let value = 0;
                let file = require("../assets/json/" + props.file);
                let coverage = file.coverage;
                setTimeout(()=> {
                    let vaccineCoverage = setInterval(() => {
                        let target = coverage[value++];

                        if (props.add) {
                            // For now, if the shape already has the class vaccinated, it doesn't create any problem
                            // But if it does in some browsers, maybe we're going to want to check if the element already has the class
                            this.hexColor(selector, target, props.state);
                            if (this.characterChecking(target)) {
                                this.ChangeTShirtColor(target, connections.vaccinatedShirtColor, connections.proportion);
                            }
                        } else {
                            document.querySelector(selector + target).classList.remove(props.state);
                            let list = document.querySelector(selector + target).classList;
                            list.forEach((e) => {
                                if (e === "barrier") {
                                    document.querySelector("#copy2 #" + target).classList.remove(e);
                                    document.querySelector("#copy1 #" + target).classList.remove(e);
                                }
                            });
                            if (this.characterChecking(target)) {
                                let characterType = document.querySelector(selector + target).children[0].children[0].getAttribute('characterType');
                                if (characterType === "avatar") {
                                    this.ChangeTShirtColor(target, connections.secondDefaultShirtColor, connections.proportion);
                                } else if (characterType === "vulnerable") {
                                    this.ChangeTShirtColor(target, connections.vulnerableShirtColor, connections.proportion);
                                } else {
                                    this.ChangeTShirtColor(target, connections.defaultShirtColor, connections.proportion);
                                }
                            }
                        }
                        if (value === coverage.length) {
                            clearInterval(vaccineCoverage);
                        }
                        if (props.makeTransformer) {
                            this.makeTransformer(parseInt(props.duration) + parseInt(props.startTime) + parseInt(props.startTimeMakeTransformer));
                        }
                    }, props.duration);
                },parseInt(props.startTime));
            },

            /**
             * ---> Draw the lines of infections (when infection is spreading)
             * @param {String} source
             * @param {String} target
             * @param {String} id
             * @return {Object}
             */
            drawLine(source, target, id, linewidth) {

                // Parameters
                var radius = 10;
                var app = document.querySelector("#ourApp");

                var style = app.currentStyle || window.getComputedStyle(app);
                var str_marginLeft = style.marginLeft;
                var marginLeft = parseInt(str_marginLeft.split("px")[0]);
                var divider = Math.sqrt(3);
                var selector = ".hexagon-container #";

                var sourceBCR = document.querySelector(selector+source).getBoundingClientRect();
                var targetBCR = document.querySelector(selector+target).getBoundingClientRect();

                var width = linewidth;
                var colorStroke = connections.linecolor;

                //drawing line
                var lineObj = document.createElementNS("http://www.w3.org/2000/svg", 'line');
                lineObj.setAttributeNS(null, "id", id);
                lineObj.setAttributeNS(null, 'x1',sourceBCR.x - marginLeft + (sourceBCR.width/divider)  + radius);
                lineObj.setAttributeNS(null, 'y1',sourceBCR.y + sourceBCR.height/divider);
                lineObj.setAttributeNS(null, 'x2', targetBCR.x - marginLeft + (targetBCR.width/divider)  + radius);
                lineObj.setAttributeNS(null, 'y2',  targetBCR.y + targetBCR.height/divider);
                lineObj.setAttributeNS(null, "stroke", colorStroke);
                lineObj.setAttributeNS(null, "stroke-width", width);
                return lineObj;
            },

            /**
             * ---> TO DO
             * @param TO DO
             * @return TO DO
             */
            initialiseAnimation() {
                let styles = require('../scss/animation.scss');
                this.$refs.audioPlayer.loadAudioFiles(this.currentLanguage, this.voiceToPlay);
                this.voiceToPlayAtAnimation = localStorage.getItem("voice");
                this.textButtonAnimation = this.labels.startAnimation;

                // Fetch some styles from the SCSS file
                this.characterSize = styles["hexagon-height"];
                this.characterBottomMargin = styles["character-bottom-margin"];
                // Build the shapes grid
                this.buildGridIds();

                // When content is loaded, make copies of the grid to facilitate the animation
                if (document.readyState !== 'loading' ) {
                    setTimeout(() => {
                        this.duplicateGrid(2);
                    }, 500);
                } else {
                    document.addEventListener('DOMContentLoaded', () => {
                        this.duplicateGrid(2);
                    });
                }

                window.addEventListener('gesturestart', e => e.preventDefault());
                window.addEventListener('gesturechange', e => e.preventDefault());
                window.addEventListener('gestureend', e => e.preventDefault());

                const manageAudioPlayerEvent = this.manageAudioPlayer;
                // when the user changes tab or put the browser on background
                window.onblur = () => {
                    // Problem : there are some timing issues (for example when change tabs when the currentAudio is changing)
                    manageAudioPlayerEvent('pause');
                };
                // when the user go back to the animation
                window.onfocus = () => {
                    if (this.isAnimationStarted) {
                        manageAudioPlayerEvent('restart');
                    }
                };
                // this.sendCharactersToApi('mongodb');
            }
        },
        created() {},
        mounted() {
            window.scrollTo({ top: 0, behavior: 'smooth', x: 0});
            let initAnimation = false;

            // Fetch the group member if it exists
            this.diseaseToPlay = localStorage.getItem("disease");
            this.voiceToPlay = localStorage.getItem("voice");
            this.returnUrl = localStorage.getItem("returnUrl");
            this.uid = localStorage.getItem("uid");
            this.labelSelected = localStorage.getItem("language");
            this.selectCurrentLanguage(this.labelSelected);

            if (this.group) {
                localStorage.setItem("group", JSON.stringify(this.group));
                localStorage.setItem("totalTime", JSON.stringify(this.totalTime));

                this.characterList = this.group;
                initAnimation = true;
            } else {
                if (localStorage.getItem("group")) {
                    this.characterList = JSON.parse(localStorage.getItem("group")); // <====== A demander à @Martin
                    initAnimation = true;
                } else {
                    this.$router.push({name: 'Home'});
                }
            }

            if (initAnimation) {
                this.initialiseAnimation();
            }
        },

        /**
         * ---> To perform, otherwise, artefacts from the animation might subsist if we go back to the make your gang tool
         * @param none
         * @return none
         */
        beforeDestroy() {
            // Get all the grid copies
            const shapeTargets = document.querySelectorAll('.copy');

            // If any, remove them
            if (shapeTargets) {
                shapeTargets.forEach(e => e.parentNode.removeChild(e));
            }

            // Stop the audio player from playing when going back to the make your gang tool
            this.$refs.audioPlayer.stopAudio();
        }
    }
</script>

<style>
    div.hexagon div.character-position {
        cursor: default;
    }

    .theme--light.v-application {
        background:none;
    }
</style>

<style scoped>
    .hexagon-container, #draw, #connections {
        margin: 0;
        width: 100%;
        height: 100vh;
    }

    .paragraph{
        color: white;
        margin: 20px;
    }

    .container {
        overflow: hidden;
        padding: 0;
    }

    div.column {
        display: grid;
        padding: 0;
        margin: 0;
    }

    div#startAnimationBox {
        text-align: center;
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 999;
        background-color: #DDD;
        border: 1px solid #999;
        padding: 20px;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        border-radius: 10px;
    }



    div#commandAnimationBox {
        text-align: center;
        position: fixed; /*absolute fixed*/
        bottom: 0%;
        right: 0%;
        z-index: 999;
        background-color: #DDD;
        border: 1px solid #999;
        padding: 5px;
    }

    .captions {
        margin-bottom: 20px;
    }


    @media only screen and (max-width: 768px){
        .hexagon-container{
            margin-top: 10px;
        }
    }

    .captions {
        background: #666666;
        opacity: 0.8;
        border: 1px solid #666666;
        border-radius: 8px;
        filter: alpha(opacity=50);
        z-index: 999999;
        position: fixed;
        left: 10%;
        right: 10%;
        bottom: 0%;
    }

    .paragraph {
        color: white;
        margin: 10px;
        width: 100%;
    }

    .continue {
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        line-height: 28px;
        text-align: center;
        color: #043213;
        width: 250px;
        height: 50px;
        box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        font-size: 14px;
        position: relative;
        margin-bottom: 18px;
    }

    .continue:active {
        top: 4px;
        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.25);
    }

    .continue:focus {outline:0;}

    .choose-subtitles {
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 25px;

        letter-spacing: 0.02em;
        color: #000000;
        margin-left: 15px;
    }

    #showCaptions {
        width: 29px;
        height: 29px;
        background: #FFFFFF;
        border: 1px solid #000000;
        box-sizing: border-box;
        margin: auto 0;
    }
</style>
