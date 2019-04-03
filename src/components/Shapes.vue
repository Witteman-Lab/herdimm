<template>
    <!-- <v-stage ref="stage" :config="configStage"> -->
        <!-- <v-layer ref="grid"> -->
            <div class="hexagon-container">
                <div v-for="character in this.characterList" class="hexagon">
                  <Character :class="" :size="{ width: '35px', height: '47px'}" ref="character" :edit="false" :customised="true" :colors="character.colors" :id="character.id" :svgFile="require(`../assets/characters/${character.file}`)" />
                </div>
                <!-- <div v-for="shape in rows[index]" class="hexagon">{{shape}}</div> -->

                <!-- These will probably be added dynamically using v-for -->
    			<!--<div class="hexagon color-vaccinated"></div>
    			<div class="hexagon"></div>
    			<div class="hexagon color-infected"></div>
    			<div class="hexagon"></div>
    			<div class="hexagon color-vaccinated"></div>
    			<div class="hexagon color-vulnerable"></div>
    			<div class="hexagon color-vulnerable"></div>
                <div class="no-hexagon"></div>
                <div class="no-hexagon"></div>
                <div class="no-hexagon"></div>
                <div class="no-hexagon"></div> -->

                <!-- Example with the SVG content copy-pasted from a file -->
                <!-- The SVG content should added based on the properties passed after the creation of the group -->

    			<!-- <div class="hexagon color-vaccinated"></div>
                <div class="no-hexagon"></div>
                <div class="no-hexagon"></div>
    			<div class="hexagon"></div>
                <div class="no-hexagon"></div>
    			<div class="hexagon color-infected"></div>
                <div class="no-hexagon"></div>
    			<div class="hexagon color-vaccinated"></div>
                <div class="no-hexagon"></div>
    			<div class="hexagon"></div> -->
    		</div>
        <!-- </v-layer> -->
    <!-- </v-stage> -->
</template>

<script>
    import Character from './Character.vue'
    import GroupCharacter from "./GroupCharacter";
    import json from '../assets/characters.json';
    import shapesJson from '../assets/shapes.json';
    import svgFile from '../assets/characters/adult01.svg';

    export default {
        name: "Shapes",
        components: {
            GroupCharacter,
            Character
        },
        data() {
            return {
                characterList: [],
                characterSize: {
                    width: "35px",
                    height: "47px"
                },
                /* This array sould be stored outside for users to change easily */
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
        			[0,4,0,4,0,2,0,4,0,4,0,4,0,0], //6
        			[0,0,0,0,4,0,3,0,2,0,0,0,4,0], //4
        			[0,0,0,4,0,3,0,3,0,4,0,0,0,4], //5
        			[0,0,4,0,4,0,3,0,3,0,0,0,4,0], //5
        			[0,0,0,4,0,4,0,1,0,4,0,4,0,4], //6
        			[0,0,4,0,4,0,3,0,4,0,4,0,4,0], //6
        			[0,0,0,4,0,0,0,4,0,4,0,4,0,4], //5
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
                gridIds: []
            }
        },
        props: {
            group: {
                type: Array
            }
        },
        methods: {
            buildGridIds() {
                let numId = 0;

                // For every row
                for (let i = 0; i < this.shapesArray.length; i++) {
                    let shapeLine = new Array();

                    // For every element in each row
                    for (let j = 0; j < this.shapesArray[i].length; j++) {
                        let shapeValue = this.shapesArray[i][j];
                        let shapeObj = new Object();

                        // Give the object a className
                        switch(shapeValue) {
                            case 0:
                                shapeObj.className = "no-hexagon";
                                break;
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
                                // code block
                        }

                        // Give the object an id
                        if (shapeValue !== 0) {
                            shapeObj.id = "shape_" + (++numId);
                        }

                        shapeLine.push(shapeObj);
                    }
                    this.gridIds.push(shapeLine);
                }
            }
        },
        created() {
            //this.characterList = json.characters;
        },
        mounted() {
            if (localStorage.getItem("group"))
                this.characterList = JSON.parse(localStorage.getItem("group"));
            this.buildGridIds();
        }
    }
</script>

<style scoped>

</style>
