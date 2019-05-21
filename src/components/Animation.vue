<template>
    <div class="container">

        <!-- Where to draw the lines for infection spreading  -->
        <div class="draw" id="draw">
            <svg class="connections" ref="connections" id="connections"></svg>
        </div>

        <!-- Container for the shapes (hexagons) -->
        <div style="display: flex; justify-content: center;">
            <div class="hexagon-container">
                <!-- Grid creation -->
                <div class="shape" v-for="shape in this.gridIds">
                    <div :class="shape.className" :id="shape.id">
                        <!-- Where the group members are being placed -->
                        <div :style="{height: characterSize, marginBottom: characterBottomMargin}" v-if="shape.isCharacter">
                            <Character v-bind:ref="shape.id" :size="{ width: characterSize }"  :edit="false" :customised="true" :colors="shape.character.colors" :id="shape.character.id" :svgFile="require(`../assets/characters/${shape.character.file}`)" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Audio player for audio files -->
        <AudioPlayer :current-language="currentLanguage" ref="audioPlayer"></AudioPlayer>
        <!-- <div id="captions">
            <p id="caption"></p>
        </div> -->
        <button class="button is-primary is-success" style="justify-self: center;" v-on:click="startAnimation">{{this.labels.startAnimation}}</button>
    </div>
</template>

<script>
    import Character from "./Character";
    import AudioPlayer from "./AudioPlayer";
    // The scenario might need to be imported in AudioPlayer instead of here, I'm not sure at the moment
    // import scenario from "../assets/json/scenario_en.json";
    import connections from "../assets/json/connections.json";
    import shapesArray from "../assets/json/shapesArray";
    // import animate from "animejs";
    import textsEng from "../assets/json/textsEng.json";
    import textsFr from "../assets/json/textsFr.json";

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
                currentLanguage: ""
            }
        },
        props: {
            group: {
                type: Array
            },
            labelSelected: String
        },
        methods: {
            // METHOD DESCRIPTION
            startAnimation() {
                // Starts true;
                this.isAnimationStarted = true;
                this.$refs.audioPlayer.playAudio();;
            },
            // METHOD DESCRIPTION
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

            // To place the right group member in the right shape
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

            selectCurrentLanguage(language) {
                if (language === "fr")
                    this.labels = textsFr;
                else
                    this.labels = textsEng;
                this.currentLanguage = this.labels.currentLanguage;
            },

            // set T-Shirt Color
            setCharacterTShirtColor(shapeId, color) {
                this.$refs[shapeId][0].changeShirtColor(color);
            },

            // METHOD DESCRIPTION
            duplicateGrid(nbOfCopy) {
                const sourceElement = document.querySelector('.hexagon-container');
                const destination = sourceElement.parentNode;
                let copy;

                for (let i = 1; i <= nbOfCopy; i++) {
                    copy = sourceElement.cloneNode(true);
                    // Remove first child (being the AudioPlayer element, which we don't need multiple times)
                    // There might be a better way of doing this, but this works for now
                    copy.removeChild(copy.childNodes[0]);
                    copy.classList.add("copy");
                    copy.id = "copy" + i;
                    copy.querySelectorAll('.character-position').forEach(e => e.parentNode.removeChild(e));
                    destination.appendChild(copy);
                }
            },

            // Parse the scenario to find sequences for the animation
            // This method might not be here (maybe in AudioPlayer, maybe not)
            launchSequence(sequence) {
                this.executeFunctionByName(sequence.action, this, sequence.props);
            },

            // Execute the appropriate function by its name received as a string as well as with arguments
            executeFunctionByName(functionName, context, args) {
                let newArgs = Array.prototype.slice.call(arguments, 2);
                return context[functionName].apply(context, newArgs);
            },

            // Zoom in or out depending on the parameters (props) received
            zoom(props) {
                const targets = document.querySelectorAll('.hexagon-container, #draw');
                setTimeout(function() {
                    //targets.forEach(e => e.classList.add("zoomIn"));    //tres important pour la suite
                    targets.forEach((e) => {
                        e.style.transform = "scale("+props.scale.toString()+","+props.scale.toString()+")";
                        e.style.transitionDuration = props.duration.toString()+"ms";
                        e.transitionTimingFunction = props.timingFunction;
                        e.style.transformOrigin = props.transformOrigin_X.toString()+"%"+" "+props.transformOrigin_Y.toString()+"%";       //"30% 30%"
                        e.style.transitionDelay = props.startTime.toString()+"ms";
                        e.style.transitionProperty = "transform";
                    });
                });
            },

            // A way to "draw" the contour of the shapes without using borders
            // Borders are not rendering well the way shapes (hexagons in this case) are being created
            // Zoom by adding class, but we don't have controls on the parameters, such as scale values, duration, etc.
            // Would be nice to do it with Javascript, so we can control these parameters
            // makeContour(target, delay, classToAdd) {
            makeContour(props) {
                const shapeTargets = document.querySelectorAll('#copy2 ' + props.target);
                setTimeout(function() {
                    shapeTargets.forEach(e => e.classList.add(props.class));
                }, props.startTime)
            },

            // METHOD DESCRIPTION
            fadeInOut(delay, duration) {
                // Fade-in transition
                setTimeout(function() {
                    document.body.classList.add('fade');
                }, delay)

                // Fade-out transition (back to normal)
                setTimeout(function() {
                    document.body.classList.remove('fade');
                }, delay + duration)
            },

            // METHOD DESCRIPTION
            makeTransformer(delay) {
                const shapeTargets = document.querySelectorAll('.hexagon');

                setTimeout(function() {
                    shapeTargets.forEach((e) => {
                        // Use this when animating for real (and remove this comment)
                        // if(e.classList.value.indexOf("vaccinated") !== -1) {
                        if(e.classList.value.indexOf("vulnerable") === -1) { // <-- For testing purpose
                            e.classList.add("barrier");
                        }
                    });
                }, delay)
            },

            // connections for each shape in connections json
            makeLink(connections){
                const drawingBoard = document.querySelector("#connections");
                const that = this;
                for (let i = 0; i < connections.length; i++){
                    //console.log("patate", test.connections[i].patate);
                    let source 	= connections[i].source;
                    let target 	= connections[i].target;
                    let nextTarget 	= connections[i].nextTarget;

                    let id = connections[i].id;

                    let lineObj = this.drawLine(source,target,id);

                    lineObj.classList.add("line");
                    drawingBoard.appendChild(lineObj);
                    lineObj.addEventListener("animationstart", function(){ // webkitAnimationStart
                        console.log("animationstart");
                        that.infectShape(source);
                    });
                    lineObj.addEventListener("animationend", function(){ // webkitAnimationEnd
                        console.log("animationend");
                        if(nextTarget != ""){
                            that.makeLink(nextTarget);
                        }
                        that.infectShape(target);
                    });
                }
            },

            infectShape(shape){
                shape =
                console.log("shape", shape)
            },

            // drawLine
            drawLine(source, target, id) {

                //parameters
                const radius = 10;
                const app = document.querySelector("#app");

                const style = app.currentStyle || window.getComputedStyle(app);
                const str_marginLeft = style.marginLeft;
                const marginLeft = parseInt(str_marginLeft.split("px")[0]);
                const divider = Math.sqrt(3);
                const selector = '.hexagon-container #'

                const sourceBCR = document.querySelector(selector+source).getBoundingClientRect();
                const targetBCR = document.querySelector(selector+target).getBoundingClientRect();

                const width = connections.linewidth;
                const colorStroke = connections.linecolor;

                //drawing line
                const lineObj = document.createElementNS("http://www.w3.org/2000/svg", 'line');
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
            let styles = require('../scss/animation.scss');

            // Fetch the group member if it exists
            if (this.group) {
                localStorage.setItem("group", JSON.stringify(this.group));
                localStorage.setItem("language", this.labelSelected);
                this.characterList = this.group;
                this.selectCurrentLanguage(this.labelSelected)
            } else {
                if (localStorage.getItem("group"))
                    this.characterList = JSON.parse(localStorage.getItem("group"));
                this.selectCurrentLanguage(localStorage.getItem("language"));
            }
            this.$refs.audioPlayer.loadAudioFiles(this.currentLanguage);

            // Fetch some styles from the SCSS file
            this.characterSize = styles["hexagon-height"];
            this.characterBottomMargin = styles["character-bottom-margin"];

            // Build the grid
            this.buildGridIds();

            // When content is loaded, make copies of the grid to facilitate the animation
            document.addEventListener('DOMContentLoaded', () => {
                this.duplicateGrid(2);
            });
        },

        // To perform, otherwise, artefacts from the animation might subsist if we go back to the make your gang tool
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
    .hexagon-container, .copy, #draw, #connections {
        margin: 0;
        width: 100%;
        height: 100vh;
    }

    /* TEMPORARY, just so it's being displayed on top of everything */
    #draw {
        /*z-index: 999;*/
    }

    div.column {
        display: grid;
        padding: 0;
        margin: 0;
    }

    @media screen and (max-width: 720px) and (orientation: landscape) {

        .hexagon-container {
            /*margin-top: 0;*/
            /*transform: translate(100%);*/
            /*width:100vw;*/
            height:auto;
            margin: 0 auto;
        }

    }

    /* #captions {

    }
    #caption {

    } */
</style>
<!-- @media screen and (orientation: portrait){
        .hexagon-container {
            margin: 0;
            width: auto;
            /* width: 100vw; */
            height: 100vh;
        }
    }

    @media screen and (orientation: landscape) {
        .hexagon-container {
            margin: 0;
            width: auto;
            /* width: 100vw; */
            height: 100vh;
        }
    }-->
