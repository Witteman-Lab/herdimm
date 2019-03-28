<template>
    <div>
        <h1>Animation</h1>
        <div class="container" style="display: flex;justify-content: center;">
            <div class="column is-four-fifths" >
                <div>
                    <GroupCharacter ref="group"></GroupCharacter>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import GroupCharacter from "./GroupCharacter";
    const width = window.innerWidth;
    const height = window.innerHeight;
    export default {
        name: 'Animations',
        components: {GroupCharacter},
        props: {
            group: {
                type: Array
            }
        },
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
                    fillPatternImage: "http://agasaro.com/IMG/jpg/pommmmme.jpg"
                },

            }

        },


        mounted() {
            if (this.group) {
                console.log(this.group);
                localStorage.setItem("group", JSON.stringify(this.group));
                this.$refs.group.addGroup(this.group);
            } else {
                if (localStorage.getItem("group"))
                    this.$refs.group.addGroup(JSON.parse(localStorage.getItem("group")));
            }
        }
    }
</script>

<style scoped>

</style>
