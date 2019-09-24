<template>
    <div class="modal-background" v-if="this.test">
        <div  >
            <v-stepper v-model="e1" class="stepper">
                <v-stepper-header>
                    <v-stepper-step :complete="e1 > 1" step="1">Name of step 1</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="e1 > 2" step="2">Name of step 2</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="3">Name of step 3</v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>

                    <!-- stepper-content 1 -->
                    <v-stepper-content step="1">
                        <v-card class="mb-12" color="grey lighten-1" height="500px"></v-card>
                        <v-btn color="primary" @click="e1 = 2">Continue</v-btn>
                        <v-btn  v-on:click="this.closeModal" text>Cancel</v-btn>
                    </v-stepper-content>

                    <!-- stepper-content 2 -->
                    <v-stepper-content step="2">
                        <v-card class="mb-12" color="grey lighten-1" height="500px"></v-card>
                        <v-btn color="primary" @click="e1 = 3">Continue</v-btn>
                        <v-btn  v-on:click="this.closeModal" text>Cancel</v-btn>
                    </v-stepper-content>

                    <!-- stepper-content 3 -->
                    <v-stepper-content step="3">
                        <v-card class="mb-12" color="grey lighten-1" height="500px"></v-card>
                        <v-btn color="primary" @click="e1 = 1">Continue</v-btn>
                        <v-btn  v-on:click="this.closeModal" text>Cancel</v-btn>
                    </v-stepper-content>

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
                e1: 0,
                test: true
            }
        },

        methods: {
            /**
             * ---> Close the modal and reset default parameter
             * @param none
             * @return none
             */
            closeModal() {
                this.test = false;

            }
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


</style>