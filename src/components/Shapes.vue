<template>
    <div class="hexagon-container">
        <div v-for="shape in this.gridIds">
            <div :class="shape.className" :id="shape.id">
                <!-- {{shape.className.split(" ")[0]}} -->

                <!-- <div v-if="shape.className.indexOf('gen') == -1"> -->
                <!-- Object.entries(obj).find(i => i[1] === val)
                Object.keys(object).find(key => object[key] === value)
                Object.keys(obj).find(key => obj[key] === value)
                arr.find(o => o.name === 'string 1') -->
                <div v-if="shape.className.indexOf('gen') == -1">
                    {{shape.className.split(" ")[0]}}
                    <!-- <Character :size="{ width: '35px', height: '47px'}" ref="character" :edit="false" :customised="true" :colors="character.colors" :id="character.id" :svgFile="require(`../assets/characters/${character.file}`)" /> -->
                </div>

                <!-- <Character v-if:"shape.className==character.characterType" :class="" :size="{ width: '35px', height: '47px'}" ref="character" :edit="false" :customised="true" :colors="character.colors" :id="character.id" :svgFile="require(`../assets/characters/${character.file}`)" /> -->
                <!-- <GroupCharacter ref="group"></GroupCharacter> -->

                <!-- <div v-for="character in characterList">
                    <Character v-if:"compare(shape.className, character.characterType)" :class="" :size="{ width: '35px', height: '47px'}" ref="character" :edit="false" :customised="true" :colors="character.colors" :id="character.id" :svgFile="require(`../assets/characters/${character.file}`)" />
                </div> -->

                <!-- <Character :size="{ width: '35px', height: '47px'}" ref="character" :edit="false" :customised="true" :colors="character.colors" :id="character.id" :svgFile="require(`../assets/characters/${character.file}`)" /> -->
                <!-- <Character v-if:"shape.className==${character.type}" ref="character" :edit="false" :customised="true" :colors="character.colors" :id="character.id" :svgFile="require(`../assets/characters/${character.file}`)" /> -->
            </div>
        </div>
    </div>
</template>

<script>
    import Character from './Character'
    import GroupCharacter from "./GroupCharacter";

    export default {
        name: "Shapes",
        components: {
            GroupCharacter,
            Character
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
            }
        },
        created() {

        },
        mounted() {
            // if (localStorage.getItem("group"))
            //     this.characterList = JSON.parse(localStorage.getItem("group"));

            if (this.group) {
                console.log(this.group);
                localStorage.setItem("group", JSON.stringify(this.group));
                // this.$refs.group.addGroup(this.group);
            } else {
                if (localStorage.getItem("group"))
                    // this.$refs.group.addGroup(JSON.parse(localStorage.getItem("group")));
                    this.characterList = JSON.parse(localStorage.getItem("group"));
            }

            console.log("this.characterList", this.characterList);
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
