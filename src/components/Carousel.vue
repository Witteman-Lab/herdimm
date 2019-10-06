<template>
    <div class="modal-background" v-if="isActive">
        <div>
            <v-stepper v-model="e1" class="stepper" :vertical="false" :alt-labels="true">
                <div style="display: flex;justify-content: flex-end;">
                    <button class="delete" style="margin: 5px 10px 5px 5px; background-color: red;" aria-label="close modal" v-on:click="this.onBoarding">
                    </button>
                </div>
                <v-stepper-header>
                    <v-stepper-step class="stepper-step" @click="e1 = 1" :complete="e1 > 1" step="1">{{this.labels.stepText1}}</v-stepper-step>
                    <v-divider ></v-divider>

                    <v-stepper-step class="stepper-step" @click="e1 = 2" :complete="e1 > 2" step="2">{{this.labels.stepText2}}</v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step class="stepper-step" @click="e1 = 3" :complete="e1 > 3" step="3">{{this.labels.stepText3}}</v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step class="stepper-step" @click="e1 = 4" :complete="e1 > 4" step="4">{{this.labels.stepText4}}</v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step class="stepper-step" @click="e1 = 5" :complete="e1 > 5" step="5">{{this.labels.stepText5}}</v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step class="stepper-step" @click="e1 = 6" :complete="e1 > 6" step="6">{{this.labels.stepText6}}</v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step class="stepper-step" @click="e1 = 7" :complete="e1 > 7" step="7">{{this.labels.stepText7}}</v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step class="stepper-step" @click="e1 = 8" :complete="e1 > 8" step="8">{{this.labels.stepText8}}</v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step class="stepper-step" @click="e1 = 9" step="9">{{this.labels.stepText9}}</v-stepper-step>
                    </v-stepper-header>



                <v-stepper-items>
                    <!-- stepper-content 1 -->
                    <v-stepper-content step="1">
                        <v-card class="mb-12" color="#2196F3" >
                            <p style="font-size: xx-large; padding: 10%; text-align: center; vertical-align: middle;" class="text-presentation">{{this.labels.step1}}</p>
                        </v-card>
                        <div class="btn-group">
                            <v-btn  color="secondary" v-on:click="this.onBoarding" >{{this.labels.cancelBtn}}</v-btn>
                            <v-btn  color="primary" @click="e1 = 2">{{this.labels.continueBtn}}</v-btn>
                        </div>
                    </v-stepper-content>
                    <!-- stepper-content 2 -->
                    <v-stepper-content step="2">
                        <v-card color="#2196F3">
                            <img src="../assets/Image/Image1.jpg" alt="My Picture">
                            <p class="text-presentation">{{this.labels.step2}}</p>
                        </v-card>
                        <div class="btn-group" style="padding: 0 0 0 0">
                            <v-btn  color="secondary" @click="e1 = 1" >{{this.labels.backBtn}}</v-btn>
                            <v-btn color="primary" @click="e1 = 3">{{this.labels.continueBtn}}</v-btn>
                        </div>
                    </v-stepper-content>


                    <!-- stepper-content 3 -->
                    <v-stepper-content step="3">
                        <v-card color="#2196F3" >
                            <img src="../assets/Image/Image2.jpg" alt="My Picture">
                            <p class="text-presentation">{{this.labels.step3}}</p>
                        </v-card>
                        <div class="btn-group" style="padding: 0 0 0 0">
                        <v-btn  color="secondary" @click="e1 = 2" >{{this.labels.backBtn}}</v-btn>
                        <v-btn color="primary" @click="e1 = 4">{{this.labels.continueBtn}}</v-btn>
                        </div>
                    </v-stepper-content>



                    <!-- stepper-content 3 -->
                    <v-stepper-content step="4">
                        <v-card color="#2196F3" >
                            <img src="../assets/Image/Image3.jpg" alt="My Picture">
                            <p class="text-presentation">{{this.labels.step4}}</p>
                        </v-card>
                        <div class="btn-group" style="padding: 0 0 0 0">
                        <v-btn  color="secondary" @click="e1 = 3" >{{this.labels.backBtn}}</v-btn>
                        <v-btn color="primary" @click="e1 = 5">{{this.labels.continueBtn}}</v-btn>
                        </div>
                    </v-stepper-content>


                    <!-- stepper-content 3 -->
                    <v-stepper-content step="5">
                        <v-card color="#2196F3">
                            <img src="../assets/Image/Image4.jpg" alt="My Picture">
                            <p style="font-size: 20px;margin: 1px;" class="text-presentation">{{this.labels.step5}}</p>
                        </v-card>
                        <div class="btn-group" style="padding: 20px 0 0 0">
                        <v-btn color="secondary" @click="e1 = 4" >{{this.labels.backBtn}}</v-btn>
                        <v-btn color="primary" @click="e1 = 6">{{this.labels.continueBtn}}</v-btn>
                        </div>
                    </v-stepper-content>



                    <!-- stepper-content 3 -->
                    <v-stepper-content step="6">
                        <v-card color="#2196F3" >
                            <img src="../assets/Image/Image5.jpg" alt="My Picture">
                            <p style="font-size: 16px;" class="text-presentation">{{this.labels.step6}}</p>
                        </v-card>
                        <div class="btn-group" style="padding: 10px 0 0 0">
                        <v-btn  color="secondary" @click="e1 = 5" >{{this.labels.backBtn}}</v-btn>
                        <v-btn color="primary" @click="e1 = 7">{{this.labels.continueBtn}}</v-btn>
                        </div>
                    </v-stepper-content>

                    <!-- stepper-content 3 -->
                    <v-stepper-content step="7">
                        <v-card color="#2196F3">
                            <img src="../assets/Image/Image6.jpg" alt="My Picture">
                            <p class="text-presentation">{{this.labels.step7}}</p>
                        </v-card>
                        <div class="btn-group" style="padding: 10px 0 0 0">
                        <v-btn  color="secondary" @click="e1 = 6" >{{this.labels.backBtn}}</v-btn>
                        <v-btn color="primary" @click="e1 = 8">{{this.labels.continueBtn}}</v-btn>
                        </div>
                    </v-stepper-content>


                    <!-- stepper-content 3 -->
                    <v-stepper-content step="8">
                        <v-card color="#2196F3" >
                            <img src="../assets/Image/Image7.jpg" alt="My Picture">
                            <p class="text-presentation">{{this.labels.step8}}</p>
                        </v-card>
                        <div class="btn-group" style="padding: 10px 0 0 0">
                        <v-btn  color="secondary" @click="e1 = 7" >{{this.labels.backBtn}}</v-btn>
                        <v-btn color="primary" @click="e1 = 9">{{this.labels.continueBtn}}</v-btn>
                        </div>
                    </v-stepper-content>

                    <!-- stepper-content 3 -->
                    <v-stepper-content step="9">
                        <v-card color="#2196F3" >
                            <img src="../assets/Image/Image8.jpg" alt="My Picture">
                            <p class="text-presentation">{{this.labels.step9}}</p>
                        </v-card>
                        <div class="btn-group" style="padding: 10px 0 0 0">
                        <v-btn  color="secondary" @click="e1 = 8" >{{this.labels.backBtn}}</v-btn>
                        <v-btn color="primary" v-on:click="this.onBoarding" >{{this.labels.letsGetStart}}</v-btn>
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
    import Home from "./Home";

    export default {
        name: "Carousel",
        data () {
            return {
                isActive : true,
                e1: 0
            }
        },
        props:{
            labels: Object
        },

        methods: {

            /**
             * ---> ---------  completed soon -------
             * @param none
             * @return none
             */
            openOnBoarding(){
                this.isActive = true;
            },
            /**
             * ---> Close the modal and reset default parameter
             * @param none
             * @return none
             */
            onBoarding() {
                this.isActive = false;
                this.e1 = 0;
            }
        },
        created(){

        },
        mounted(){
            // this.resetVulnerableOption();
            document.body.addEventListener('keyup', e => {
                // Escape key to close the modal window (customizer)
                if (e.keyCode === 27 && this.isActive) {
                    this.onBoarding();
                  }
            });
            console.log(this.labels.sourceImage);
        }

    }
</script>

<style scoped>
    .modal-background{
        height: 100vh;
    }

    .stepper{
        background-color: white;
        justify-content: center;
        align-items: center;
        position: center;
        margin-top: 20vh;
    }

    .v-stepper {
        width: 80%;
        margin: 135px auto 0;
        z-index: 10;
    }

    .Image1{
    }

    .stepper-step:hover{
        cursor: pointer;
    }

    .text-presentation{
        text-align: center;
        color: white ;
        font-size: x-large;
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
