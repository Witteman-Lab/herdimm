<template>
    <div id="mainApp">
        <div class="columns is-centered">
            <div class="column is-one-third is-centered">
            <figure class="image">
               <img src="../assets/images/herdimm-landingPage-group.png">
            </figure>
            </div>
            <div class="column" style="padding: 20px;">
            <h1 class="title is-1 has-text-left is-spaced" style="font-weight: bolder">{{this.labels.homeTitle1}}
                <br/>{{this.labels.homeTitle2}}<br/>{{this.labels.homeTitle3}}</h1>
            
            <h6 class="subtitle is-6 has-text-left">{{this.labels.homeSubTitle1}}</h6><br/>
            
            <button id="continue" class="continue button is-primary is-medium has-text-centered" style="float: left;  color: black" v-on:click="loadHome()">{{this.labels.homeBtnContinue}}
                
                <a><font-awesome-icon style="margin-left: 10px; color: black" icon="play" size="small"/></a>
                
            </button>
            
            <br/><br/><br/><br/>
            <button id="selectLanguage"  class="button is-primary is-rounded is-link is-small"  style="float: left;" v-on:click="this.changeLanguage">{{this.labels.language}}</button>
            </div>
        </div>
    </div>
</template>

<script>

    import textsEng from "../assets/json/textsEng.json";
    import textsFr from "../assets/json/textsFr.json";

    export default {
        name: "Home",
        data(){
            return {
                myStyle:{
                    backgroundColor:"#16a085"
                }
            }
        },
        methods: {
            loadHome(){
                this.$router.push({name: 'Avatars',});
            },
            changeLanguage() {
                if (this.isLanguageChanged)
                    this.labels = textsEng;
                else
                    this.labels = textsFr;
                this.isLanguageChanged = !this.isLanguageChanged;
                this.$forceUpdate();
            },
        },
        created() {
            this.labels = textsFr;
        },
    }

</script>

<style scoped>
    /*for larger and medium devices (desktop)*/
    @media screen and (min-width: 812px){
        .columns{
            margin: 75px 75px 75px 250px;
        }
    }

    /*on small devices such as phone and tablet(smartphone)*/
    @media screen and (min-width: 320px)  and (max-width: 768px) {
        #mainApp {
            /*        to be done */
        }
    }

</style>