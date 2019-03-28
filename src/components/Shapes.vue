<template>
    <v-stage ref="stage" :config="configStage">
        <v-layer ref="grid">
            <div>
                <v-regular-polygon class="" ref="hexagon" :config="configHexagon" v-on:click="changeColor"></v-regular-polygon>
            </div>
        </v-layer>
    </v-stage>
</template>

<script>
    import GroupCharacter from "./GroupCharacter";

    const width = window.innerWidth;
    const height = window.innerHeight;

    export default {
        name: "Shapes",
        components: {GroupCharacter},
        data() {
            return {
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
                    fill: "grey",
                    rotation: 90
                }
            }
        },
        props: {},
        methods: {
            changeColor(evt) {
                var r = evt.currentTarget.x() % 255;
                var g = evt.currentTarget.y() % 255;

                evt.currentTarget.x(evt.currentTarget.x() + 5);
                evt.currentTarget.y(evt.currentTarget.y() + 5);

                evt.currentTarget.fill("rgb(" + r + ", " + g + ", 100)");
                evt.currentTarget.strokeWidth(evt.currentTarget.strokeWidth() + 1);
                evt.currentTarget.stroke("#FF0000");

                // Required to apply the change
                this.$refs.grid.getStage().draw();
            }
        },
        created() {

        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
