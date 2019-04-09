<template>
    <div class="hexagon-container">
        <AudioPlayer ref="audioPlayer"></AudioPlayer>
        <div v-for="shape in this.gridIds">
            <div :class="shape.className" :id="shape.id">
                <div v-if="shape.isCharacter">
                    <!-- <Character ref="character" :edit="false" :customised="true" :colors="shape.character.colors" :id="shape.character.id" :svgFile="require(`../assets/characters/${shape.character.file}`)" /> -->
                    <Character :size="{ width: '25px', height: '37px'}" ref="character" :edit="false" :customised="true" :colors="shape.character.colors" :id="shape.character.id" :svgFile="require(`../assets/characters/${shape.character.file}`)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Character from "./Character";
    import GroupCharacter from "./GroupCharacter";
    import AudioPlayer from "./AudioPlayer.vue";

    export default {
        name: "Shapes",
        components: {
            GroupCharacter,
            Character,
            AudioPlayer
        },
        data() {
            return {
                characterList: [],
                // characterSize: {
                //     width: "35px",
                //     height: "47px"
                // },
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
                        }
                        this.getCharacterFromList(shapeObj);

                        // Give the object an id and/or a class name
                        // Give the object an id and/or a class name
                        if (shapeValue !== 0) {
                            shapeObj.id = "shape_" + (++numId);
                            shapeObj.className += " hexagon";
                        } else {
                            shapeObj.className = "no-hexagon";
                        }

                        this.gridIds.push(shapeObj);
                    }
                }
            },
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
            }
        },
        created() {

        },
        mounted() {
            // if (localStorage.getItem("group"))
            //     this.characterList = JSON.parse(localStorage.getItem("group"));

            if (this.group) {
                localStorage.setItem("group", JSON.stringify(this.group));
            } else {
                if (localStorage.getItem("group"))
                    this.characterList = JSON.parse(localStorage.getItem("group"));
            }
            this.buildGridIds();

        }
    }
</script>

<style scoped>
    .hexagon-container {
        margin: 0 10px;
        width: auto;
    }
</style>
