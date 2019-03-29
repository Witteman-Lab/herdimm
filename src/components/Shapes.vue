<template>
    <v-stage ref="stage" :config="configStage">
        <!-- <v-layer ref="group"> -->
            <!-- <img src="http://www.w3.org/TR/SVG11/images/painting/fillrule-evenodd.svg" /> -->
            <!-- <object type="image/svg+xml" data="../assets/characters/adult01.svg" /> -->
        <!-- </v-layer> -->

        <v-layer ref="grid">
            <div>
                <v-regular-polygon name="shape1" class="" ref="hexagon" :config="configHexagon" v-on:click="changeColor"></v-regular-polygon>
            </div>
            <div>
                <GroupCharacter ref="group"></GroupCharacter>
            </div>
        </v-layer>

    </v-stage>
</template>

<script>
    import GroupCharacter from "./GroupCharacter";
    import json from '../assets/characters.json';
    import VueKonva from 'vue-konva';
    import svgFile from '../assets/characters/adult01.svg';

    const width = window.innerWidth;
    const height = window.innerHeight;

    export default {
        name: "Shapes",
        components: {
            GroupCharacter
        },
        props: {
            group: {
                type: Array
            }
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
                    strokeWidth: 5,
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
                var b = evt.currentTarget.x() * evt.currentTarget.y() % 255;

                evt.currentTarget.x(evt.currentTarget.x() + 5);
                evt.currentTarget.y(evt.currentTarget.y() + 5);

                //evt.currentTarget.fill(svgFile);
                evt.currentTarget.fill("rgb(" + r + ", " + g + ", " + b + ", 100)");
                evt.currentTarget.stroke("#FF0000");

                // Required to apply the change
                this.$refs.grid.getStage().draw();
            }
        },
        created() {
            this.characterList = json.characters;
        },
        mounted() {
            // if (this.group) {
            //     //console.log(this.group);
            //     localStorage.setItem("group", JSON.stringify(this.group));
            //     this.$refs.group.addGroup(this.group);
            // } else {
            //     if (localStorage.getItem("group"))
            //         this.$refs.group.addGroup(JSON.parse(localStorage.getItem("group")));
            // }

            let grid = this.$refs.grid;
            let hexagon = this.$refs.hexagon;
            let stage = this.$refs.stage;
            // let group = this.$refs.group;

            //console.log(svgFile);

            // Konva.Image.fromURL("http://www.w3.org/TR/SVG11/images/painting/fillrule-evenodd.svg", function(image){
            Konva.Image.fromURL(svgFile, function(image){
               // image is Konva.Image instance
               console.log("image", image);
               grid.getStage().add(image);
               grid.getStage().draw();
            });
        }
    }
</script>

<style scoped>

</style>
