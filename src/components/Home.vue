<template>
    <v-app style=" display: flex; flex-direction: column; justify-content: center; align-items: center">

        <v-row justify="center" v-show="dialogState">
            <v-dialog v-model="dialogState" max-width="290" persistent>
                <v-card>
                    <v-card-title class="headline" style="color: #ff1744;">{{this.languageEN.dialogTitle}} / {{this.languageFR.dialogTitle}}</v-card-title>
                    <v-card-text style="font-weight: bold; font-size: medium ">
                        {{this.languageEN.dialogTexte}}
                    </v-card-text>
                    <v-spacer></v-spacer>
                    <v-card-text style="font-weight: bold; font-size: medium ">
                        {{this.languageFR.dialogTexte}}
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn style="border-style: solid; border-color: #ff1744; color: #ff1744" text @click="dialogState = false">
                            OK
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>

        <v-container  style="display: flex; flex-direction: column; justify-content: center; align-items: center;" v-show="!dialogState" >
            <!---------------------------------------------------------------------------------------------->
            <!---------------------------------------------------------------------------------------------->
            <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between; width: 100%">
                <v-tooltip bottom v-if="!isLanguageChanged">
                    <template v-slot:activator="{ on }">
                        <v-btn  x-large style="background-color: #CED9DB; color: #FF0000" elevation="0" dark v-on="on" v-on:click="loadTranscript()">Transcript</v-btn>
                    </template>
                    <span>{{this.labels.TranscriptTextBtnHover}}</span>
                </v-tooltip>


                <v-tooltip bottom v-if="isLanguageChanged">
                    <template v-slot:activator="{ on }">
                        <v-btn x-large style="background-color: #CED9DB; color: #FF0000"  elevation="0" dark v-on="on" v-on:click="loadTranscript()">Transcrit</v-btn>
                    </template>
                    <span>{{this.labels.TranscriptTextBtnHover}}</span>
                </v-tooltip>

                <button id="selectLanguage" class="button"  v-on:click="this.changeLanguage">{{this.labels.language}}</button>
            </div>



                <!---------------------------------------------------------------------------------------------->
                <div class="landing-page" >
                    <div ref="landingImage" v-html="require(`../assets/images/Illustration.svg`)"></div>
                    <div id="container-landing-page-text">
                        <div class="title-landing-page" style="text-align: left">{{this.labels.homeTitle}}</div>
                        <div class="subtitle-landing-page" >{{this.labels.homeSubTitle}}</div>

                        <div class="interactions-landing-page">
                            <button id="continue" class="continue button is-primary is-medium has-text-centered" style="float: left;  color: black" v-on:click="loadHome()">
                                <span style="margin-left: 30px">{{this.labels.homeBtnContinue.toUpperCase()}}</span>
                                <a><font-awesome-icon style="margin-left: 10px; color: black" icon="play" /></a>
                            </button>
                        </div>
                    </div>
                </div>

        </v-container>

    </v-app>
</template>

<script>

    import textsEng from "../assets/json/textsEng.json";
    import textsFr from "../assets/json/textsFr.json";
    import Bowser from "bowser";

    export default {
        name: "Home",
        data() {
            return {
                isLanguageChanged: true,
                returnUrl: "",
                uid: 0,
                maxUid : 999999,
                diseaseHome: "",
                gender: "",
                dialogState : true,
                languageFR: Object,
                languageEN: Object
            }
        },
        methods: {
            track () {
                this.$ga.page({
                    page: '/',
                    title: 'Home',
                    location: window.location.href
                })
            },

            loadTranscript(){
                this.$router.push({name: 'Transcript'});
                localStorage.setItem("language", this.labels.currentLanguage);
            },

            /**
             * ---> Load Home Page
             * @param none
             * @return none
             */
            loadHome() {
                localStorage.setItem("disease", this.diseaseHome);
                localStorage.setItem("voice", this.gender);
                localStorage.setItem("returnUrl", this.returnUrl);
                localStorage.setItem("uid", this.uid);
                localStorage.setItem("language", this.labels.currentLanguage);
                window.removeEventListener('resize', this.manageLandingPageImage, false);

                this.$router.push({name: 'Avatars'});
            },

            /**
             * ---> Change Language
             * @param none
             * @return none
             */
            changeLanguage() {
                if (this.isLanguageChanged)
                    this.labels = textsEng;
                else
                    this.labels = textsFr;
                this.isLanguageChanged = !this.isLanguageChanged;
                this.$forceUpdate();
            },

            /**
             * ---> Load Home Page
             * @param none
             * @return none
             */
            manageLandingPageImage() {
                const characterImgSVG = this.$refs.landingImage.children[0];

                if (window.innerWidth > 768) {
                    characterImgSVG.style = "";
                } else {
                    characterImgSVG.style = "width: 300px;height: 300px;";
                }
            },
            /**
             * ---> This function randomly returns a number between [0-2]
             *  @param {number} value
             *  @return {number}
             */
            getRandomInt(value) {
                return Math.floor(Math.random() * Math.floor(value));
            },
            /**
             * ---> Check if Uid exist. If not, randomly create a value between 0 and 999999
             * @param none
             * @return none
             */
            setUid() {
                if (this.$route.query.uid) {
                    this.uid = this.$route.query.uid;
                } else {
                    this.uid = Math.floor((Math.random() * (this.maxUid + 1))).toString();
                }
            },


            /**
             * ---> Check if a return url is in query
             * @param none
             * @return none
             */
            setReturnUrl() {
                if (this.$route.query.returnURL) {
                    this.returnUrl = this.$route.query.returnURL;
                }
            },

            /**
             * ---> Check if the language in query is en and change the language to english it's that the case
             * @return none
             */
            setLanguage() {
                if (this.$route.query.lang === "en") {
                    this.changeLanguage()
                }
            },

            /**
             * --->
             * @param none
             * @return none
             */
            setDiseaseToAnimate() {
                if (this.$route.query.d === "flu" || this.$route.query.d === "measles" || this.$route.query.d === "pertussis")
                    this.diseaseHome = this.$route.query.d;
            },

            /**
             * --->
             * @param none
             * @return none
             */
            setVoiceToPlay() {
                if (this.$route.query.v === "male" || this.$route.query.v === "female")
                    this.gender = this.$route.query.v;
                else if (this.$route.query.v === null)
                    this.gender = "male";
                else {
                    let voiceType = ["male", "female"];
                    this.gender = voiceType[this.getRandomInt(voiceType.length)];
                }
            },
        },
        created() {
            this.labels = textsFr;
        },
        mounted() {
            let html = document.querySelector("html");
            html.style = "background-color: #CED9DB !important;";
            window.addEventListener('resize', this.manageLandingPageImage);
            this.setDiseaseToAnimate();
            this.setVoiceToPlay();
            this.setLanguage();
            this.setReturnUrl();
            this.setUid();
            this.manageLandingPageImage();
            const browser = Bowser.getParser(window.navigator.userAgent);
            console.log("test de magniol", browser.getBrowserName());
            this.languageFR = textsFr;
            this.languageEN = textsEng;
            if(browser.getBrowserName() === "Microsoft Edge" || browser.getBrowserName() === "Chrome" || browser.getBrowserName() === "Safari" || browser.getBrowserName() === "Opera"){
                this.dialogState = false ;
            }
            this.track();
        }
    }

</script>

<style scoped>
    div#mainApp {
        background-color: #CED9DB;
    }

    #selectLanguage {
        width: 133px;
        height: 34px;
        background: #0000EE;
        border-radius: 15px;
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 16px;
        color: #FFFFFF;
    }

    .title-landing-page {
        width: 425px;
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 36px;
        line-height: 54px;
        color: #000000;
        text-align: justify;
    }

    .subtitle-landing-page {
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 72px;
        color: #000000;
        display: flex;
    }

    button.continue {
        background-color:  #05CDC1;
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        line-height: 28px;
        text-align: center;
        color: #043213;
        width: 289px;
        height: 61px;
        box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        font-size: 17px;
        margin-bottom: 80px;
    }

    button.continue:active {
        top: 4px;
        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.25);
    }

    button.continue:focus {outline:0;}

    .interactions-landing-page {
        display: grid;
    }

    /*for larger and medium devices (desktop)*/
    @media screen and (min-width: 812px) {
        .landing-page {
            display: flex;
        }

        #container-landing-page-text  {
            margin: 100px auto 0 0;
        }

        div#mainApp {
            position: fixed;
            transform: translate(-50%, -50%);
            top: 45%;
            left: 45%;
        }
    }

    /*on small devices such as phone and tablet(smartphone)*/
    @media screen and (min-width: 320px) and (max-width: 811px) {
        div#mainApp {
            height: auto;
        }
        .landing-page {
            margin-left: 0;
        }

        .title-landing-page {
            width: auto;
            height: auto;
            line-height: 39px;
            margin-left: 20px;
            font-size: 24px;
            margin-right: 20px;
        }

        .subtitle-landing-page {
            margin-left: 20px;
        }

        .interactions-landing-page {
            margin-left: 20px;
        }

        #selectLanguage {
        }

        button#continue {
            margin-bottom: 36px;
        }
    }

</style>

<style>

</style>
