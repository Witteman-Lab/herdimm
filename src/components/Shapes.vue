<template>
    <v-stage :config="configStage">
        <v-layer>

            <v-regular-polygon :config="configHexagon"></v-regular-polygon>

        </v-layer>
    </v-stage>
</template>

<script>


    const width = window.innerWidth;
    const height = window.innerHeight;
    let vm = {};
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
                    stroke: "black"
                },

            }

        }
    }
</script>

<style scoped>

</style>
