<template>
    <div class="modal-background" v-if="isActive">
        <div>
            <v-stepper v-model="e1" class="stepper" :vertical="false" :alt-labels="true">
                <div style="display: flex;justify-content: flex-end;">
                    <button id="btnCloseOnBoarding" class="delete" aria-label="close modal" v-on:click="this.closeOnBoarding"></button>
                </div>
                <v-stepper-header>
                    <div style="display: contents;" v-for="(step, index) in this.labels.stepsTitle">
                        <v-stepper-step class="stepper-step" @click="e1 = index + 1" :complete="e1 > index" :step="index + 1">{{step.stepText}}</v-stepper-step>
                        <v-divider v-if="index < 8"></v-divider>
                        <!-- need to change value -->
                    </div>
                </v-stepper-header>



                <v-stepper-items>
                    <div v-for="(step, index) in this.labels.stepsDescription">
                        <v-stepper-content :step="index + 1">
                                    <img v-if="index > 0" style="max-width: 80%" :src="require(`../assets/Image/En/${step.image}`)"
                                         :alt="'Reload your browser'">
                                    <v-card color="#2196F3">
                                        <p v-if="index === 0" class="text-presentation" :style="index === 0 ? 'height: 32vh;' : ''">{{step.description}}</p>
                                        <p v-if="index > 0" class="text-presentation" :style="index === 5 ? 'font-size: 1rem;' : ''">{{step.description}}</p>
                                    </v-card>
                                    <div class="btn-group" style="padding: 0">
                                        <v-btn color="secondary" @click="changeCurrentView(index)">{{step.prevButton}}</v-btn>
                                        <v-btn color="primary" @click="changeCurrentView(index + 2)">{{step.nextButton}}</v-btn>
                                    </div>
                        </v-stepper-content>
                    </div>
                </v-stepper-items>
            </v-stepper>

        </div>
    </div>
</template>


<script>
    export default {
        name: "Carousel",
        data () {
            return {
                isActive : true,
                e1: 1,
                nbrOfView: 9
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
                this.e1 = 1;
            },

            changeCurrentView(index) {
                if (index <= 0 || index >= this.labels.stepsDescription.length + 1) {
                    this.closeOnBoarding();
                } else {
                    this.e1 = index;
                }
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

    .text-presentation {
        text-align: center;
        color: white ;
        font-size: 1.2rem;
        vertical-align: middle;
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
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
