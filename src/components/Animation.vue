<template>
    <!-- Audio player to play the voice over -->
<!--    <div class="audioP">-->
<!--        <AudioPlayer ref="audioPlayer"></AudioPlayer>-->
<!--    </div>-->

    <!-- <div class="draw"> -->
        <!-- <svg id="connections"></svg> -->
    <!-- </div> -->

    <div class="hexagon-container">
         <AudioPlayer ref="audioPlayer"></AudioPlayer>
        <!-- Grid creation -->
        <div v-for="shape in this.gridIds" ref="grid">
            <div :class="shape.className" :id="shape.id">
                <!-- Where the group members are being placed -->
                <div :style="{height: characterSize, marginBottom: characterBottomMargin}" v-if="shape.isCharacter">
                    <Character :size="{ width: characterSize }" ref="character" :edit="false" :customised="true" :colors="shape.character.colors" :id="shape.character.id" :svgFile="require(`../assets/characters/${shape.character.file}`)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Character from "./Character";
    // import GroupCharacter from "./GroupCharacter";
    import AudioPlayer from "./AudioPlayer";
    // import animations from '../assets/animation.scss';

    export default {
        name: "Animation",
        components: {
            Character,
            AudioPlayer
        },
        data() {
            return {
                characterList: [],

                /* This array should be stored outside for users to change easily */
                // 0 = None
                // 1 = avatar
                // 2 = vulnerable
                // 3 = comm
                // 4 = gen
                shapesArray: [
                    [0,0,4,0,0,0,4,0,0,0,0,0,0,0], //2
                    [0,4,0,4,0,4,0,4,0,4,0,4,0,0], //6
                    [4,0,4,0,0,0,4,0,4,0,4,0,4,0], //6
                    [0,4,0,4,0,4,0,4,0,4,0,4,0,0], //6
                    [4,0,4,0,4,0,4,0,4,0,4,0,4,0], //7
                    [0,4,0,4,0,4,0,4,0,4,0,4,0,0], //6
                    [0,0,0,0,4,0,3,0,4,0,0,0,4,0], //4
                    [0,0,0,4,0,3,0,2,0,4,0,0,0,4], //5
                    [0,0,4,0,4,0,2,0,3,0,0,0,4,0], //5
                    [0,0,0,4,0,4,0,1,0,4,0,4,0,4], //6
                    [0,0,4,0,4,0,3,0,3,0,4,0,4,0], //6
                    [0,0,0,4,0,0,0,3,0,4,0,4,0,4], //5
                    [0,0,4,0,4,0,0,0,4,0,4,0,4,0], //5
                    [0,4,0,4,0,0,0,4,0,0,0,4,0,4], //5
                    [0,0,4,0,4,0,0,0,4,0,0,0,4,0], //4
                    [0,4,0,4,0,4,0,4,0,4,0,0,0,0], //5
                    [4,0,4,0,4,0,4,0,4,0,4,0,0,0], //6
                    [0,4,0,0,0,4,0,4,0,4,0,0,0,0], //4
                    [4,0,0,0,0,0,4,0,4,0,4,0,0,0], //4
                    [0,0,0,0,0,4,0,0,0,4,0,0,0,0], //2
                    [0,0,0,0,0,0,4,0,0,0,0,0,0,0]  //1
                ],
                gridIds: [],
                characterSize: 0,
                characterBottomMargin: 0
            }
        },
        props: {
            group: {
                type: Array
            }
        },
        methods: {
            //
            buildGridIds() {
                let numId = 0;

                // For every row
                for (let i = 0; i < this.shapesArray.length; i++) {

                    // For every element in each row
                    for (let j = 0; j < this.shapesArray[i].length; j++) {
                        let shapeValue = this.shapesArray[i][j];
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

            //
            // duplicateGrid(copyIndex) {
            duplicateGrid(nbOfCopy) {
                const sourceElement = document.querySelector('.hexagon-container');
                const destination = sourceElement.parentNode;
                let copy;

                for (let i = 1; i <= nbOfCopy; i++) {
                    copy = sourceElement.cloneNode(true);
                    //copy.className += " copy";
                    copy.classList.add("copy");
                    copy.id = "copy" + i;
                    copy.querySelectorAll('.character-position').forEach(e => e.parentNode.removeChild(e));
                    destination.appendChild(copy);
                }
            },

            // gettransitionend() {
            //     var root = document.documentElement;
            //     var transitions = {
            //         'transition':'transitionend',
            //         'OTransition':'oTransitionEnd',
            //         'MozTransition':'transitionend',
            //         'WebkitTransition':'webkitTransitionEnd'
            //     }
            //
            //     for (var t in transitions) {
            //         if (root.style[t] !== undefined ){
            //             return transitions[t];
            //         }
            //     }
            //     return undefined
            // },

            // Zoom by adding class, but we do't have controls on the parameters, such as sclae values, duration, etc.
            // Would be nice to do it with Javascript, so we can control these parameters
            zoomIn(delay) {
                //const that = this;
                const targets = document.querySelectorAll('.hexagon-container');
                //const animParams = "scale(3,3) 2s linear";
                //let transitionendevt = this.gettransitionend();

                setTimeout(function() {
                    targets.forEach(e => e.classList.add("zoomIn"));
                    // targets.forEach(e => e.className += " zoomIn");
                    // targets.forEach((e) => {
                    //     //e.style.webkitTransform = animParams;
                    //     // e.style.transition = animParams;
                    //     // e.style.OTransition = animParams;
                    //     // e.style.MozTransition = animParams;
                    //     // //e.style.msTransform = animParams;
                    //     // e.style.WebkitTransition = animParams;
                    //
                    //     // e.style["-webkit-transition"] = animParams;
                    //     // e.style["-moz-transition"] = animParams;
                    //     // e.style["-ms-transition"] = animParams;
                    //     // e.style["-o-transition"] = animParams;
                    //     // e.style["transition"] = animParams;
                    //     //console.log(e.style);
                    // });
                }, delay);
            },

            // Zoom by adding class, but we do't have controls on the parameters, such as sclae values, duration, etc.
            // Would be nice to do it with Javascript, so we can control these parameters
            zoomOut(delay) {
                const target = document.querySelectorAll('.hexagon-container');
                setTimeout(function() {
                    target.forEach(e => e.classList.add("zoomOut"));
                }, delay)
            },

            // A way to "draw" the contour of the shapes without using borders
            // Borders are not rendering well the way shapes (hexagons in this case) are being created
            // Zoom by adding class, but we do't have controls on the parameters, such as sclae values, duration, etc.
            // Would be nice to do it with Javascript, so we can control these parameters
            makeContour(target, delay) {
                const shapeTargets = document.querySelectorAll('#copy2 ' + target);
                setTimeout(function() {
                    shapeTargets.forEach(e => e.classList.add("contour"));
                }, delay)

            }
        },
        created() {

        },
        mounted() {
            let styles = require('../assets/animation.scss');

            // Fetch the group member if it exists
            if (this.group) {
                localStorage.setItem("group", JSON.stringify(this.group));
                this.characterList = this.group;
            } else {
                if (localStorage.getItem("group"))
                    this.characterList = JSON.parse(localStorage.getItem("group"));
            }

            // Fetch some styles from the SCSS file
            this.characterSize = styles["hexagon-height"];
            this.characterBottomMargin = styles["character-bottom-margin"];

            // Build the grid
            this.buildGridIds();

            // When content is loaded, make copies of the grid to facilitate the animation
            document.addEventListener('DOMContentLoaded', () => {
                this.duplicateGrid(2);

                // THIS PART IS USED ONLY FOR TESTING PURPOSE
                //this.zoomIn(2000);
                this.makeContour(".vulnerable", 5000);
                // this.zoomOut(10000);
            });
        },

        // To perform, otherwise, artefacts from the animation might subsist if we go back to the make your gang tool
        beforeDestroy() {
            // Get all the grid copies
            const shapeTargets = document.querySelectorAll('.copy');

            // If any, remove them
            if(shapeTargets) {
                shapeTargets.forEach(e => e.parentNode.removeChild(e));
            }
        }
    }
</script>

<style scoped>
    .hexagon-container {
        margin: 0;
        width: auto;
        /* width: 100vw; */
        height: 100vh;
    }
    #connections {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
    }
</style>
