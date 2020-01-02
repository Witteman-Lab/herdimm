<template>
    <div id="mainApp">
        <div class="landing-page">
            <div ref="landingImage" v-html="require(`../assets/images/Illustration.svg`)"></div>
            <div id="container-landing-page-text">
                <div class="title-landing-page">{{this.labels.homeTitle}}</div>
                <div class="subtitle-landing-page">{{this.labels.homeSubTitle}}</div>
                <div class="interactions-landing-page" >
                    <button id="continue" class="continue button is-primary is-medium has-text-centered" style="float: left;  color: black" v-on:click="loadHome()">
                        <span style="margin-left: 30px">{{this.labels.homeBtnContinue.toUpperCase()}}</span>
                        <a><font-awesome-icon style="margin-left: 10px; color: black" icon="play" /></a>
                    </button>
                    <button id="selectLanguage" class="button"  v-on:click="this.changeLanguage">{{this.labels.language}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import textsEng from "../assets/json/textsEng.json";
    import textsFr from "../assets/json/textsFr.json";

    export default {
        name: "Home",
        data() {
            return {
                isLanguageChanged: true,
                returnUrl: "",
                uid: 0,
                maxUid : 999999,
                diseaseHome: "",
                gender: ""
            }
        },
        methods: {
            loadHome() {
                localStorage.setItem("disease", this.diseaseHome);
                localStorage.setItem("voice", this.gender);
                localStorage.setItem("returnUrl", this.returnUrl);
                localStorage.setItem("uid", this.uid);
                localStorage.setItem("language", this.labels.currentLanguage);
                window.removeEventListener('resize', this.manageLandingPageImage, true);

                this.$router.push({name: 'Avatars'});
            },
            changeLanguage() {
                if (this.isLanguageChanged)
                    this.labels = textsEng;
                else
                    this.labels = textsFr;
                this.isLanguageChanged = !this.isLanguageChanged;
                this.$forceUpdate();
            },

            manageLandingPageImage() {
                const characterImgSVG = this.$refs.landingImage.children[0];

                if (window.innerWidth > 768) {
                    characterImgSVG.style = "";
                } else {
                    characterImgSVG.style = "width: 300px;height: 300px;";
                }
            },
            /**
             * ---> This function randomly returns between [0-2]
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
        }
    }

</script>

<style scoped>


    div#mainApp {
        background-color: #CED9DB;
        height: 100vh;
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
        margin-left: 10px;
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
            margin-left: 5%;
        }

        #container-landing-page-text  {
            margin: 100px auto 0 0;
        }
    }

    /*on small devices such as phone and tablet(smartphone)*/
    @media screen and (min-width: 320px)  {
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
            margin-left: 5%;
        }

        .interactions-landing-page {
            margin-left: 5%;
        }

        #selectLanguage {
        }

        button#continue {
            margin-bottom: 36px;
        }
    }

</style>

<style>
    /*html {*/
    /*    background-color: #CED9DB !important;*/
    /*}*/
</style>
