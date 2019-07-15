<template>
    <div class="container">
        <meta name="viewport" content="width=device-width, user-scalable=no">
        <!-- Audio player for audio files -->
        <AudioPlayer :current-language="currentLanguage" ref="audioPlayer"></AudioPlayer>
        <!-- <div id="captions">
            <p id="caption"></p>
        </div> -->

        <!-- Where to draw the lines for infection spreading  -->
        <div class="draw" id="draw">
            <svg class="connections" ref="connections" id="connections"></svg>
        </div>

        <!-- Container for the shapes (hexagons) -->
        <div style="display: flex; justify-content: center;">
            <div class="hexagon-container" id="main-container">
                <!-- Grid creation -->
                <div class="shape" v-for="shape in this.gridIds">
                    <div :class="shape.className" :id="shape.id">
                        <!-- Where the group members are being placed -->
                        <div :style="{height: characterSize, marginBottom: characterBottomMargin}" v-if="shape.isCharacter">
                            <Character :characterType="shape.character.characterType" v-bind:ref="shape.id" :size="{ width: characterSize }"  :edit="false" :customised="true" :colors="shape.character.colors" :id="shape.character.id" :svgFile="require(`../assets/characters/${shape.character.file}`)" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="startAnimationBox" v-if="!this.isAnimationStarted">
            <button class="button is-primary is-success" style="justify-self: center;" v-on:click="startAnimation">{{textButtonAnimation}}</button>
            <br />
            <input type="checkbox" id="showCaptions" name="showCaptions" value="">
            <label for="showCaptions">{{this.labels.displayCaptions}}</label>
        </div>
        <div id="commandAnimationBox" style="display: flex; justify-content: space-between" v-if="this.isAnimationStarted">
            <a v-if=""><font-awesome-icon style="margin: 10px;" icon="fast-backward" size="lg" v-on:click="manageAudioPlayer('begin')"/></a>
            <a><font-awesome-icon style="margin: 10px;" icon="step-backward" size="lg" v-on:click="manageAudioPlayer('before')"/></a>
            <a v-if="!isAudioPlaying"><font-awesome-icon style="margin: 10px;" icon="play" size="lg" v-on:click="manageAudioPlayer('restart')"/></a>
            <a v-if="isAudioPlaying"><font-awesome-icon style="margin: 10px;" icon="pause" size="lg" v-on:click="manageAudioPlayer('pause')"/></a>
            <a><font-awesome-icon style="margin: 10px;" icon="step-forward" size="lg" v-on:click="manageAudioPlayer('next')"/></a>
            <a><font-awesome-icon style="margin: 10px;" icon="fast-forward" size="lg" v-on:click="manageAudioPlayer('end')"/></a>
        </div>
    </div>
</template>

<script>
    import Character from "./Character";
    import AudioPlayer from "./AudioPlayer";
    // The scenario might need to be imported in AudioPlayer instead of here, I'm not sure at the moment
    // import scenario from "../assets/json/scenario_en.json";
    import shapesArray from "../assets/json/shapesArray";
    import textsEng from "../assets/json/textsEng.json";
    import textsFr from "../assets/json/textsFr.json";
    import connections from "../assets/json/connections.json";



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
                characterSize: 0,
                characterBottomMargin: 0,
                isAnimationStarted: false,
                currentLanguage: "",
                textButtonAnimation: '',
                isAudioPlaying: false
            }
        },
        props: {
            group: {
                type: Array
            },
            labelSelected: String
        },
        methods: {

            /**
             * ---> Start the animation when user is ready, clicks on the Start button
             * @param none
             * @return none
             */
            startAnimation() {
                this.isAnimationStarted = true;
                this.$refs.audioPlayer.playAudio();
                this.isAnimationPlaying();
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
                this.textButtonAnimation = this.labels.restartAnimation;
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
                        let shapeObj = new Object();

                        // Give the object a className
                        switch(shapeValue) {
                            case 1:
                                shapeObj.className = "avatar";
                                break;
                            case 2:
                                shapeObj.className = "vulnerable";
                                break;
                            case 3:
                                shapeObj.className = "comm";
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
                this.characterList.map((character, index) => {
                    if (character.characterType === shapeObj.className && !isCharacter) {
                        shapeObj.character = character;
                        shapeObj.isCharacter = true;
                        isCharacter = true;
                        this.characterList.splice(index, 1);
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
            setCharacterTShirtColor(shapeId, color, proportion) {
                // TO-DO: try different proportion
                // let darkerColor = this.$refs[shapeId][0].getDarkerShade(color, 0.8);
                // this.$refs[shapeId][0].changeShirtColor(darkerColor, 0.8);
                let darkerColor = this.$refs[shapeId][0].getDarkerShade(color, proportion);
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
                let newArgs = Array.prototype.slice.call(arguments, 2);
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
                        e.style.transformOrigin = props.transformOrigin_X.toString()+"%"+" "+props.transformOrigin_Y.toString()+"%";       //"30% 30%"
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
                } else if (props.class === "barrier") {
                    shapeTargets = document.querySelectorAll('.copy ' + props.target);
                }
                setTimeout(() => {
                    if (props.add) {
                        shapeTargets.forEach(e => e.classList.add(props.class));
                    } else {
                        shapeTargets.forEach(e => e.classList.remove(props.class));
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
                    document.body.classList.add('fade');
                }, parseInt(props.startTime));

                // Fade-out transition (back to normal)
                setTimeout(() => {
                    document.body.classList.remove('fade');
                }, (parseInt(props.startTime) + parseInt(props.duration)));
            },


            /**--->  ---------------------------------- It's will be completed later ------------------------------
             * @param {Number} delay
             * @return
             */
            makeTransformer(props) {
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
                }, parseInt(props.startTime));
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
                        if(e.classList.value.indexOf("vulnerable") === -1){ // <-- For testing purpose
                            shapeTargetsVaccinated.forEach((b) => {
                                if(e.id === b.id){
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
            remove(props) {
                setTimeout(() => {
                    const shapeTargets = document.querySelectorAll('.infected');
                    shapeTargets.forEach((e) => {
                        e.classList.remove("infected");
                        if (this.characterChecking(e.id)) {
                            let characterType = e.children[0].children[0].getAttribute('characterType');
                            if (characterType !== "avatar") {
                                this.setCharacterTShirtColor(e.id, connections.defaultShirtColor, connections.proportion);
                            } else {
                                this.setCharacterTShirtColor(e.id, connections.secondDefaultShirtColor, connections.proportion);
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
                if (typeof(props.file) === "object") {
                    if (props.file.length != 0) {
                        let value;
                        if (props.file.length === 1) {
                            value = 0;
                        } else {
                            value = this.getRandomInt(props.file.length);
                        }
                        let variable = require("../assets/json/" + props.file[value]);
                        setTimeout(() => {
                            this.spreadInfection(variable.connections);
                        }, props.startTime);
                    } else {
                        alert("Add the name of json file in array to have infection sequences");
                    }
                }
                else{
                    let variable = require("../assets/json/" + props.file);
                    setTimeout(() => {
                        this.spreadInfection(variable.connections);
                    }, parseInt(props.startTime));
                }
            },



            /**
             * --->  this method allows the gradual disappearance of lines and its removal
             * @param {Object} props
             * @return none
             */
            removeLine(){
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
            characterChecking(shape_id){
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

            test(props){

            },


            /**
             * ---> Parse the pattern (JSON pattern) to draw lines between various shapes during infection
             * @param {Object} pattern
             * @return none
             */
            spreadInfection(pattern){
                const drawingBoard = document.querySelector("#connections");
                const selector = '#main-container #';
                const state = "infected";
                let endOfTheSequence;
                for (let i = 0; i < pattern.length; i++){
                    let source = pattern[i].source;
                    let target = pattern[i].target;
                    endOfTheSequence = pattern[0].endOfTheSequence;
                    let targetGetsInfected = pattern[i].targetGetsInfected;
                    let infectionIsBouncing = pattern[i].infectionIsBouncing;
                    let nextTarget 	= pattern[i].nextTarget;
                    let id = pattern[i].id;
                    let lineObj = this.drawLine(source, target, id);
                    let lineLength = this.getLineLength(lineObj);

                    lineObj.setAttributeNS(null, "stroke-dasharray", lineLength + " " + lineLength);
                    lineObj.setAttributeNS(null, "stroke-dashoffset", lineLength);

                    // Check if the target gets infected to add the proper class (CSS animation)
                    if (targetGetsInfected) {
                        // Target might get infected, but we still want the infection lines to bounce, so we check if infectionIsBouncing is true
                        if (infectionIsBouncing) {
                            lineObj.classList.add("lineBouncingOff");
                        } else {
                            lineObj.classList.add("line");
                        }
                    } else {
                        lineObj.classList.add("lineBouncingOff");
                    }

                    // Add the line to the drawingboard (SVG element)
                    drawingBoard.appendChild(lineObj);


                    // When the animation starts, source gets infected, its color changes
                    lineObj.addEventListener("animationstart", () => { // webkitAnimationStart
                        this.hexColor(selector, source, state);
                        if (this.characterChecking(source) === true) {
                            this.setCharacterTShirtColor(source, connections.infectedShirtColor, connections.proportion);
                        }
                    });
                    // When the animation ends, check if there is a next target
                    lineObj.addEventListener("animationend", () => { // webkitAnimationEnd
                        if (nextTarget !== "") {
                            this.spreadInfection(nextTarget);
                        }

                        // If target gets infected, its color changes
                        if (targetGetsInfected) {
                            this.hexColor(selector, target, state);
                            if (this.characterChecking(target) === true) {
                                this.setCharacterTShirtColor(target, connections.infectedShirtColor, connections.proportion);
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
            getLineLength(line){
                let x1 = line.x1.baseVal.value;
                let x2 = line.x2.baseVal.value;
                let y1 = line.y1.baseVal.value;
                let y2 = line.y2.baseVal.value;
                return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2);
            },


            /**
             * ---> Compute and return the length of the line for its animation
             * @param {Object} props
             * @return none
             */
            burst(props){
                const selector = '#main-container #';

                if(props.add) {
                    setTimeout(() => {
                        this.hexColor(selector, props.target, props.state);
                        this.changeSize(selector, props.target, props.scale, props.timingFunction, props.duration);
                        if (this.characterChecking(props.target)) {
                            if (props.state === connections.stateInfected) {
                                this.setCharacterTShirtColor(props.target, connections.infectedShirtColor, connections.proportion);
                            } else if (props.state === connections.stateVaccinated) {
                                this.setCharacterTShirtColor(props.target, connections.vaccinatedShirtColor, connections.proportion);
                            }
                        }
                    }, parseInt(props.startTime));
                }
                else{
                    setTimeout(()=>{
                        document.querySelector(selector + props.target).classList.remove(props.state);
                        if (this.characterChecking(props.target)) {
                            let characterType = document.querySelector(selector + props.target).children[0].children[0].getAttribute('characterType');
                            if (characterType !== "avatar") {
                                this.setCharacterTShirtColor(props.target, connections.defaultShirtColor, connections.proportion);
                            } else {
                                this.setCharacterTShirtColor(props.target, connections.secondDefaultShirtColor, connections.proportion);
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
                    for (let i = 0; i < shapeTargets.length; i++) {
                        shapeTargets.item(i).classList.add(props.state);
                    }
                }, parseInt(props.startTime));
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
                document.querySelector(selector+target).classList.add(state);
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
                                    if (characterType !== "avatar") {
                                        this.setCharacterTShirtColor(id_shape, connections.defaultShirtColor, connections.proportion);
                                    } else {
                                        this.setCharacterTShirtColor(id_shape, connections.secondDefaultShirtColor, connections.proportion);
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
                        let incrementation = coverage[value++];

                        if (props.add) {
                            this.hexColor(selector, incrementation, props.state);
                            if (this.characterChecking(incrementation)) {
                                this.setCharacterTShirtColor(incrementation, connections.vaccinatedShirtColor, connections.proportion);
                            }
                        } else {
                            document.querySelector(selector + incrementation).classList.remove(props.state);
                            let list = document.querySelector(selector + incrementation).classList;
                            list.forEach((e) => {
                                if (e === "barrier") {
                                    document.querySelector("#copy2 #" + incrementation).classList.remove(e);
                                    document.querySelector("#copy1 #" + incrementation).classList.remove(e);
                                }
                            });
                            if (this.characterChecking(incrementation)) {
                                let characterType = document.querySelector(selector + incrementation).children[0].children[0].getAttribute('characterType');
                                if (characterType !== "avatar") {
                                    this.setCharacterTShirtColor(incrementation, connections.defaultShirtColor, connections.proportion);
                                } else {
                                    this.setCharacterTShirtColor(incrementation, connections.secondDefaultShirtColor, connections.proportion);
                                }
                            }
                        }
                        if (value === coverage.length) {
                            clearInterval(vaccineCoverage);
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
            drawLine(source, target, id) {

                // Parameters
                var radius = 10;
                var app = document.querySelector("#app");

                var style = app.currentStyle || window.getComputedStyle(app);
                var str_marginLeft = style.marginLeft;
                var marginLeft = parseInt(str_marginLeft.split("px")[0]);
                var divider = Math.sqrt(3);
                var selector = ".hexagon-container #";

                var sourceBCR = document.querySelector(selector+source).getBoundingClientRect();
                var targetBCR = document.querySelector(selector+target).getBoundingClientRect();

                var width = connections.linewidth;
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
            }
        },
        created() {},
        mounted() {
            window.scrollTo({ top: 0, behavior: 'smooth', x: 0});
            let styles = require('../scss/animation.scss');

            //this.vaccination();

            // Fetch the group member if it exists
            if (this.group) {
                localStorage.setItem("group", JSON.stringify(this.group));
                localStorage.setItem("language", this.labelSelected);
                this.characterList = this.group;
                this.selectCurrentLanguage(this.labelSelected);
            } else {
                if (localStorage.getItem("group")) {
                    this.characterList = JSON.parse(localStorage.getItem("group"));
                    this.selectCurrentLanguage(localStorage.getItem("language"));
                } else {
                    this.$router.push({name: 'Home'});
                }
            }

            this.$refs.audioPlayer.loadAudioFiles(this.currentLanguage);
            this.textButtonAnimation = this.labels.startAnimation;
            // Fetch some styles from the SCSS file
            this.characterSize = styles["hexagon-height"];
            this.characterBottomMargin = styles["character-bottom-margin"];

            // Build the shapes grid
            this.buildGridIds();

            // When content is loaded, make copies of the grid to facilitate the animation
            document.addEventListener('DOMContentLoaded', () => {
                this.duplicateGrid(2);
            });
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
            AudioPlayer.stopAudio();
        }
    }
</script>

<style scoped>
    .hexagon-container, #draw, #connections {
        margin: 0;
        width: 100%;
        height: 100vh;
    }

    div.column {
        display: grid;
        padding: 0;
        margin: 0;
    }

    div#startAnimationBox {
        text-align: center;
        position: fixed; /*absolute fixed*/
        top: 50%;
        left: 50%;
        z-index: 999;
        background-color: #DDD;
        border: 1px solid #999;
        padding: 10px;
        transform: translate(-50%);
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
        /* transform: translate(-50%); */
    }

</style>
