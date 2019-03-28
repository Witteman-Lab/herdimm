<template>
    <v-stage :config="configStage">
        <v-layer>
            <div class="rotate">
                <v-regular-polygon  ref="hexagon":config="configHexagon"></v-regular-polygon>
            </div>


        </v-layer>
    </v-stage>
</template>

<script>


    const width = window.innerWidth;
    const height = window.innerHeight;

    export default {
        name: "Shapes",

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
                    fill: "grey"
                }
            }
        },
        methods: {

        }
    }
</script>

<style scoped>
    .rotate {
        -webkit-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -o-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        transform: rotate(90deg);
        background-color: pink;
    }

</style>
