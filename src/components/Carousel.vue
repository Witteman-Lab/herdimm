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
                            <v-divider v-if="index < numberOfSteps - 1"></v-divider>
                        </div>
                    </v-stepper-header>

                    <!-- Stepper items -->
                    <v-stepper-items>
                        <div v-for="(step, index) in this.labels.stepsDescription" :key="index">
                            <v-stepper-content :step="index + 1">
                                <img v-if="index > 0" style="max-width: 80%" :src="require(`../assets/images/${labels.currentLanguage}/${step.image}`)"
                                     :alt="step.description">
                                <v-card color="#2196F3">
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
                // Escape key to close the modal window (customizer)
                if (e.keyCode === 27 && this.isActive) {
                    this.closeOnBoarding();
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

    .stepper-step:hover{
        cursor: pointer;
        background: lightgrey;
        /*background: lightblue;*/
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
