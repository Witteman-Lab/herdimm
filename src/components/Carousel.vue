<template>
    <div class="modal-background" v-if="isActive">
        <div>
            <v-stepper v-model="e1" class="stepper" :vertical="false" :alt-labels="true">
                <div style="display: flex;justify-content: flex-end;">
                    <button id="btnCloseOnBoarding" class="delete" aria-label="close modal" v-on:click="this.closeOnBoarding"></button>
                </div>
                <v-stepper-header>

                    <!-- TODO: This could probably be optimized using v-for and configuration parameters (e.g. number of steps, etc.) -->

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
                    <!-- TODO: This could probably be optimized using v-for and configuration parameters (e.g. number of steps, etc.) -->

                    <!-- stepper-content 1 -->
                    <v-stepper-content step="1">
                        <v-card class="mb-12" color="#2196F3" >
                            <p class="text-presentation" id="text-presentation_intro">{{this.labels.step1}}</p>
                        </v-card>
                        <div class="btn-group">
                            <v-btn color="secondary" v-on:click="this.closeOnBoarding">{{this.labels.cancelBtn}}</v-btn>
                            <v-btn color="primary" @click="e1 = 2">{{this.labels.continueBtn}}</v-btn>
                        </div>
                    </v-stepper-content>

                    <!-- stepper-content 2 -->
                    <v-stepper-content step="2">
                        <v-card color="#2196F3">
                            <img src="../assets/Image/Fr/image1.png" :alt="this.labels.step2">
                            <p class="text-presentation">{{this.labels.step2}}</p>
                        </v-card>
                        <div class="btn-group">
                            <v-btn color="secondary" @click="e1 = 1" >{{this.labels.backBtn}}</v-btn>
                            <v-btn color="primary" @click="e1 = 3">{{this.labels.continueBtn}}</v-btn>
                        </div>
                    </v-stepper-content>

                    <!-- stepper-content 3 -->
                    <v-stepper-content step="3">
                        <v-card color="#2196F3" >
                            <img src="../assets/Image/Fr/image2.png" :alt="this.labels.step3">
                            <p class="text-presentation">{{this.labels.step3}}</p>
                        </v-card>
                        <div class="btn-group">
                        <v-btn color="secondary" @click="e1 = 2" >{{this.labels.backBtn}}</v-btn>
                        <v-btn color="primary" @click="e1 = 4">{{this.labels.continueBtn}}</v-btn>
                        </div>
                    </v-stepper-content>

                    <!-- stepper-content 4 -->
                    <v-stepper-content step="4">
                        <v-card color="#2196F3" >
                            <img src="../assets/Image/Fr/image3.png" :alt="this.labels.step4">
                            <p class="text-presentation">{{this.labels.step4}}</p>
                        </v-card>
                        <div class="btn-group">
                        <v-btn color="secondary" @click="e1 = 3" >{{this.labels.backBtn}}</v-btn>
                        <v-btn color="primary" @click="e1 = 5">{{this.labels.continueBtn}}</v-btn>
                        </div>
                    </v-stepper-content>

                    <!-- stepper-content 5 -->
                    <v-stepper-content step="5">
                        <v-card color="#2196F3">
                            <img src="../assets/Image/Fr/image4.png" :alt="this.labels.step5">
                            <p class="text-presentation">{{this.labels.step5}}</p>
                        </v-card>
                        <div class="btn-group">
                        <v-btn color="secondary" @click="e1 = 4" >{{this.labels.backBtn}}</v-btn>
                        <v-btn color="primary" @click="e1 = 6">{{this.labels.continueBtn}}</v-btn>
                        </div>
                    </v-stepper-content>

                    <!-- stepper-content 6 -->
                    <v-stepper-content step="6">
                        <v-card color="#2196F3" >
                            <img src="../assets/Image/Fr/image5.png" :alt="this.labels.step6">
                            <p class="text-presentation">{{this.labels.step6}}</p>
                        </v-card>
                        <div class="btn-group">
                        <v-btn color="secondary" @click="e1 = 5" >{{this.labels.backBtn}}</v-btn>
                        <v-btn color="primary" @click="e1 = 7">{{this.labels.continueBtn}}</v-btn>
                        </div>
                    </v-stepper-content>

                    <!-- stepper-content 7 -->
                    <v-stepper-content step="7">
                        <v-card color="#2196F3">
                            <img src="../assets/Image/Fr/image6.png" :alt="this.labels.step7">
                            <p class="text-presentation">{{this.labels.step7}}</p>
                        </v-card>
                        <div class="btn-group">
                        <v-btn color="secondary" @click="e1 = 6" >{{this.labels.backBtn}}</v-btn>
                        <v-btn color="primary" @click="e1 = 8">{{this.labels.continueBtn}}</v-btn>
                        </div>
                    </v-stepper-content>

                    <!-- stepper-content 8 -->
                    <v-stepper-content step="8">
                        <v-card color="#2196F3" >
                            <img src="../assets/Image/Fr/image7.png" :alt="this.labels.step8">
                            <p class="text-presentation">{{this.labels.step8}}</p>
                        </v-card>
                        <div class="btn-group">
                        <v-btn color="secondary" @click="e1 = 7" >{{this.labels.backBtn}}</v-btn>
                        <v-btn color="primary" @click="e1 = 9">{{this.labels.continueBtn}}</v-btn>
                        </div>
                    </v-stepper-content>

                    <!-- stepper-content 9 -->
                    <v-stepper-content step="9">
                        <v-card color="#2196F3" >
                            <img src="../assets/Image/Fr/image8.png" :alt="this.labels.step9">
                            <p class="text-presentation">{{this.labels.step9}}</p>
                        </v-card>
                        <div class="btn-group">
                        <v-btn color="secondary" @click="e1 = 8" >{{this.labels.backBtn}}</v-btn>
                        <v-btn color="primary" v-on:click="this.closeOnBoarding" >{{this.labels.letsGetStart}}</v-btn>
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

        props: {
            labels: Object,
            lang: String
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
            closeOnBoarding() {
                this.isActive = false;
                this.e1 = 0;
            }
        },
        created(){},
        mounted(){
            document.body.addEventListener('keyup', e => {
                // Escape key to close the modal window (customizer)
                if (e.keyCode === 27 && this.isActive) {
                    this.closeOnBoarding();
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
        font-size: 1.2rem;
        vertical-align: middle;
        padding: 5px;
    }

    #text-presentation_intro {
        font-size: xx-large;
        padding: 10%;
        text-align: center;
        vertical-align: middle;
    }


    .btn-group{
        display: grid;
        grid-gap: 50px;
        grid-template-columns: auto auto;
        /*background-color: #2196F3;*/
        padding: 1vh;
    }

    #btnCloseOnBoarding {
        margin: 5px 10px 5px 5px;
        background-color: red;
    }
</style>
