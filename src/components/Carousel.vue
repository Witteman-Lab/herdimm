<template>
    <div class="modal-background" v-if="this.test">
        <div >
            <v-stepper v-model="e1" class="stepper" :vertical="false" :alt-labels="true">
                <v-stepper-header>
                    <v-stepper-step class="stepper-step" @click="e1 = 1" :complete="e1 > 1" step="1">step 1</v-stepper-step>
                    <v-divider ></v-divider>

                    <v-stepper-step class="stepper-step" @click="e1 = 2" :complete="e1 > 2" step="2">step 2</v-stepper-step>
                    <v-divider></v-divider>


                    <v-stepper-step class="stepper-step" @click="e1 = 3" :complete="e1 > 3" step="3">step 3</v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step class="stepper-step" @click="e1 = 4" :complete="e1 > 4" step="4">step 4</v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step class="stepper-step" @click="e1 = 5" :complete="e1 > 5" step="5">step 5</v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step class="stepper-step" @click="e1 = 6" :complete="e1 > 6" step="6">step 6</v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step class="stepper-step" @click="e1 = 7" :complete="e1 > 7" step="7">step 7</v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step class="stepper-step" @click="e1 = 8" :complete="e1 > 8" step="8">step 8</v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step class="stepper-step" @click="e1 = 9" step="9">step 9 </v-stepper-step>
                    </v-stepper-header>



                <v-stepper-items>
                    <!-- stepper-content 1 -->
                    <v-stepper-content step="1">
                        <v-card class="mb-12" color="grey lighten-1" height="500px">
                            <a class="text-presentation">welcome to Herdimm project </a>
                        </v-card>
                        <div class="btn-group">
                            <v-btn  color="secondary" v-on:click="this.closeModal" >Cancel</v-btn>
                            <v-btn  color="primary" @click="e1 = 2">Continue</v-btn>
                        </div>
                    </v-stepper-content>

                    <!-- stepper-content 2 -->
                    <v-stepper-content step="2">
                        <v-card class="mb-12" color="grey lighten-1" height="500px">
                            <img src="../assets/Image/Image1.jpg" alt="My Picture" >
                        </v-card>
                        <div class="btn-group">
                            <v-btn  color="secondary" @click="e1 = 1" >back</v-btn>
                            <v-btn color="primary" @click="e1 = 3">Continue</v-btn>
                        </div>
                    </v-stepper-content>


                    <!-- stepper-content 3 -->
                    <v-stepper-content step="3">
                        <v-card class="mb-12" color="grey lighten-1" height="500px">
                            <img src="../assets/Image/Image2.jpg" alt="My Picture" >
                        </v-card>
                        <div class="btn-group">
                        <v-btn  color="secondary" @click="e1 = 2" >back</v-btn>
                        <v-btn color="primary" @click="e1 = 4">Continue</v-btn>
                        </div>
                    </v-stepper-content>



                    <!-- stepper-content 3 -->
                    <v-stepper-content step="4">
                        <v-card class="mb-12" color="grey lighten-1" height="500px">
                            <img src="../assets/Image/Image3.jpg" alt="My Picture" >
                        </v-card>
                        <div class="btn-group">
                        <v-btn  color="secondary" @click="e1 = 3" >back</v-btn>
                        <v-btn color="primary" @click="e1 = 5">Continue</v-btn>
                        </div>
                    </v-stepper-content>


                    <!-- stepper-content 3 -->
                    <v-stepper-content step="5">
                        <v-card class="mb-12" color="grey lighten-1" height="500px">
                            <img src="../assets/Image/Image4.jpg" alt="My Picture" >
                        </v-card>
                        <div class="btn-group">
                        <v-btn  color="secondary" @click="e1 = 4" >back</v-btn>
                        <v-btn color="primary" @click="e1 = 6">Continue</v-btn>
                        </div>
                    </v-stepper-content>



                    <!-- stepper-content 3 -->
                    <v-stepper-content step="6">
                        <v-card class="mb-12" color="grey lighten-1" height="500px">
                            <img src="../assets/Image/Image5.jpg" alt="My Picture" >
                        </v-card>
                        <div class="btn-group">
                        <v-btn  color="secondary" @click="e1 = 5" >back</v-btn>
                        <v-btn color="primary" @click="e1 = 7">Continue</v-btn>
                        </div>
                    </v-stepper-content>

                    <!-- stepper-content 3 -->
                    <v-stepper-content step="7">
                        <v-card class="mb-12" color="grey lighten-1" height="500px">
                            <img src="../assets/Image/Image6.jpg" alt="My Picture" >
                        </v-card>
                        <div class="btn-group">
                        <v-btn  color="secondary" @click="e1 = 6" >back</v-btn>
                        <v-btn color="primary" @click="e1 = 8">Continue</v-btn>
                        </div>
                    </v-stepper-content>


                    <!-- stepper-content 3 -->
                    <v-stepper-content step="8">
                        <v-card class="mb-12" color="grey lighten-1" height="500px">
                            <img src="../assets/Image/Image7.jpg" alt="My Picture" >
                        </v-card>
                        <div class="btn-group">
                        <v-btn  color="secondary" @click="e1 = 7" >back</v-btn>
                        <v-btn color="primary" @click="e1 = 9">Continue</v-btn>
                        </div>
                    </v-stepper-content>

                    <!-- stepper-content 3 -->
                    <v-stepper-content step="9">
                        <v-card class="mb-12" color="grey lighten-1" height="500px">
                            <img src="../assets/Image/Image8.jpg" alt="My Picture" >
                        </v-card>
                        <div class="btn-group">
                        <v-btn  color="secondary" @click="e1 = 8" >back</v-btn>
                        <v-btn color="primary" v-on:click="this.closeModal">Let's get started</v-btn>
                        </div>
                    </v-stepper-content>

                </v-stepper-items>
            </v-stepper>

        </div>
    </div>
</template>


<script>
    import textsEng from "../assets/json/textsEng.json";
    import textsFr from "../assets/json/textsFr.json";

    export default {
        name: "Carousel",
        data () {
            return {

                e1: 0,
                test: true
            }
        },

        methods: {

            testtest(){
              console.log("je suis la");
            },
            /**
             * ---> Close the modal and reset default parameter
             * @param none
             * @return none
             */
            closeModal() {
                this.test = false;

            }
        },
        created(){
            console.log("je suis la ", this.finalInfo);
        },
        mounted(){
            // this.resetVulnerableOption();
            document.body.addEventListener('keyup', e => {
                // Escape key to close the modal window (customizer)
                if (e.keyCode === 27 && this.isActive) {
                    this.closeModal();
                  }
            });



        }

    }
</script>

<style scoped>
    .modal-background{
        height: 100vh;
    }

    .stepper{
        background-color: red;
        justify-content: center;
        align-items: center;
        position: center;
        margin-top: 20vh;
    }

    .v-stepper {
        width: 80%;
        margin: 10% auto 0;
        z-index: 10;
    }

    .Image1{
    }

    .stepper-step:hover{
        cursor: pointer;
    }

    .text-presentation{
        text-align: center;
        color: black ;
        font-size: xx-large;
        vertical-align: middle;
    }

    .btn-group{
        display: grid;
        grid-gap: 50px;
        grid-template-columns: auto auto;
        /*background-color: #2196F3;*/
        padding: 1vh;
    }
</style>