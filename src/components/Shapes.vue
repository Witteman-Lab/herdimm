<template>
    <v-stage ref="stage" :config="configStage">
        <v-layer ref="group">
            <!-- <img src="http://www.w3.org/TR/SVG11/images/painting/fillrule-evenodd.svg" /> -->
            <!-- <object type="image/svg+xml" data="../assets/characters/adult01.svg" /> -->
        </v-layer>

        <v-layer ref="grid">
            <div>
                <v-regular-polygon class="" ref="hexagon" :config="configHexagon" v-on:click="changeColor"></v-regular-polygon>
            </div>
        </v-layer>

    </v-stage>
</template>

<script>
    //import Character from "./Character";
    import json from '../assets/characters.json';

    const width = window.innerWidth;
    const height = window.innerHeight;

    export default {
        name: "Shapes",
        components: {
            //Character,
        },
        data() {
            return {
                characterList: [],
                configStage: {
                    width: width,
                    height: height

                },
                configHexagon: {
                    x: 350,
                    y: 120,
                    sides: 6,
                    radius: 80,
                    stroke: "black",
                    // fill: "grey",
                    rotation: 90
                }
            }
        },
        props: {
            group: {
                type: Array
            }
        },
        methods: {
            changeColor(evt) {
                var r = evt.currentTarget.x() % 255;
                var g = evt.currentTarget.y() % 255;

                evt.currentTarget.x(evt.currentTarget.x() + 5);
                evt.currentTarget.y(evt.currentTarget.y() + 5);

                //evt.currentTarget.fill(this.characterList[0].file);
                // evt.currentTarget.fill("rgb(" + r + ", " + g + ", 100)");
                //evt.currentTarget.strokeWidth(evt.currentTarget.strokeWidth() + 1);
                evt.currentTarget.stroke("#FF0000");

                // Required to apply the change
                this.$refs.grid.getStage().draw();
            }
        },
        created() {
            this.characterList = json.characters;
        },
        mounted() {
            let grid = this.$refs.grid;
            let hexagon = this.$refs.hexagon;
            let stage = this.$refs.stage;
            let group = this.$refs.group;
            var img = new Image();

            img.onload = function () {
                console.log("loaded");
                console.log("grid", grid);
                console.log("grid.getStage()", grid.getStage());
                console.log("hexagon", hexagon);
                console.log("hexagon.getStage()", hexagon.getStage());
                console.log("stage", stage);
                console.log("stage.getStage()", stage.getStage());

                //grid.getStage().drawImage(img,0,0);
                //hexagon.fill(img);
                //grid.getStage().draw();
            };
            // img.src = "../assets/characters/" + this.characterList[0].file;
            img.src = "http://www.w3.org/TR/SVG11/images/painting/fillrule-evenodd.svg";
        }
    }
</script>

<style scoped>

</style>
