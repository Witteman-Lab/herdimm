<template>
    <div class="modal" v-bind:class="{'is-active': isActive }">
        <div class="modal-background">
            <div>
                <v-stepper v-model="e1" class="stepper" :vertical="false" :alt-labels="true">

                    <!-- Button to close the modal window (stepper) -->
                    <div style="display: flex;justify-content: flex-end;">
                        <button id="btnCloseOnBoarding" class="delete" aria-label="close modal" v-on:click="this.closeOnBoarding" :title="this.labels.closeBtnTitle"></button>
                    </div>

                    <!-- Stepper headers -->
                    <v-stepper-header>
                        <div style="display: contents;" v-for="(step, index) in this.labels.stepsTitle" :key="index">
                            <v-stepper-step :editable="true" edit-icon="mdi-check" class="stepper-step" @click="e1 = index + 1" :complete="e1 > index+1" :step="index + 1">{{step.stepText}}</v-stepper-step>
                            <!-- Add n number of dividers based on the number of steps involved in the tutorial (minus 1) -->
                            <v-divider style="margin: 35px -30px 0px -30px" v-if="index < numberOfSteps - 1"></v-divider>
                        </div>
                    </v-stepper-header>

                    <!-- Stepper items -->
                    <v-stepper-items>
                        <div  v-for="(step, index) in this.labels.stepsDescription" :key="index">
                            <v-stepper-content v-recognizer:swipe.left="swipeLeft" v-recognizer:swipe.right="swipeRight" :step="index + 1">
                                <img v-if="index > 0" style="max-width: 80%" :src="require(`../assets/images/${labels.currentLanguage}/${step.image}`)"
                                     :alt="step.description">
                                <v-card  color="#2196F3">
                                    <p v-if="index === 0" class="text-presentation" :style="index === 0 ? 'height: 32vh;' : ''">{{adaptNumberOfCharacter(index, step.description)}}</p>
                                    <p v-if="index > 0" class="text-presentation" :style="index === 5 ? 'font-size: 1rem;' : ''">{{adaptNumberOfCharacter(index, step.description)}}</p>
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
    </div>
</template>


<script>
    export default {
        name: "Carousel",
        data () {
            return {
                isActive : true,
                e1 : 1,
                // Number of steps involved in the tutorial (length of the array of description)
                numberOfSteps : Number
            }
        },

        props: {
            labels: Object,
            lang: String,
            changeLanguageButtonIndex: Function,
            nbrAvatar: Number,
            nbrVulnerable: Number,
            nbrCommunity: Number
        },

        methods: {
            swipeLeft() {
               this.changeCurrentView(this.e1 + 1);
            },
            swipeRight() {
                this.changeCurrentView(this.e1 - 1)
            },
            /**
             * ---> --------- to complete -------
             * @param index
             * @param description
             * @return descriptionToShow
             */
            adaptNumberOfCharacter(index, description) {
                let descriptionToShow = '';
                if (index === 5) {
                    descriptionToShow = description.replace("###", this.nbrVulnerable);
                } else if (index === 6) {
                    descriptionToShow = description.replace("###", this.nbrCommunity);
                } else if (index === 7) {
                    descriptionToShow = description.replace("###", this.nbrAvatar + this.nbrVulnerable + this.nbrCommunity);
                } else {
                    descriptionToShow = description;
                }
                return descriptionToShow;
            },

            /**
             * ---> --------- to complete -------
             * @param none
             * @return none
             */
            openOnBoarding(){
                this.isActive = true;
                this.changeLanguageButtonIndex("open");
                //:src="require(`../assets/images/${labels.currentLanguage}/${step.image}`
            },

            /**
             * ---> Close the modal and reset default parameter
             * @param none
             * @return none
             */
            closeOnBoarding() {
                this.isActive = false;
                this.changeLanguageButtonIndex("close");
                this.e1 = 1;
            },

            /* ---> --------- to complete -------
             * @param none
             * @return none
             */
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
                if(this.isActive){
                    switch (e.keyCode) {
                        // Escape key to close the modal window (customizer)
                        case 27:
                            this.closeOnBoarding();
                            break;
                        //Press "ArrowLeft" key to ga at the next step
                        case 37:
                            this.swipeRight();
                            break;
                        //Press "ArrowRight" key to go at previous step
                        case 39:
                            this.swipeLeft();
                            break;
                        //press "Digit1" key  to go at step 1
                        case 49:
                            this.e1 = 1;
                            this.changeCurrentView(this.e1);
                            break;
                        //press "Digit2" key  to go at step 2
                        case 50:
                            this.e1 = 1;
                            this.changeCurrentView(this.e1 + 1);
                            break;
                        //press "Digit3" key  to go at step 3
                        case 51:
                            this.e1 = 1;
                            this.changeCurrentView(this.e1 + 2);
                            break;
                        //press "Digit4" key  to go at step 4
                        case 52:
                            this.e1 = 1;
                            this.changeCurrentView(this.e1 + 3);
                            break;
                        //press "Digit5" key  to go at step 5
                        case 53:
                            this.e1 = 1;
                            this.changeCurrentView(this.e1 + 4);
                            break;
                        //press "Digit6" key  to go at step 6
                        case 54:
                            this.e1 = 1;
                            this.changeCurrentView(this.e1 + 5);
                            break;
                        //press "Digit7" key  to go at step 7
                        case 55:
                            this.e1 = 1;
                            this.changeCurrentView(this.e1 + 6);
                            break;
                        //press "Digit8" key  to go at step 8
                        case 56:
                            this.e1 = 1;
                            this.changeCurrentView(this.e1 + 7);
                            break;
                        //press "Digit9" key  to go at step 9
                        case 57:
                            this.e1 = 1;
                            this.changeCurrentView(this.e1 + 8);
                            break;
                    }
                }
            });

            // Get the number of steps involved in the tutorial (length of the array of description)
            this.numberOfSteps = this.labels.stepsDescription.length;
        }
    }
</script>

<style scoped>
    .modal-background {
        height: 100%;
    }

    .stepper {
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

    .stepper-step:hover {
        cursor: pointer;
        /*background: lightgrey;*/
        background: lightblue;
    }

    .stepper-step {
        flex-basis: auto !important;
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
        padding: 1vh;
    }

    #btnCloseOnBoarding {
        margin: 5px 10px 5px 5px;
        background-color: red;
    }
</style>
