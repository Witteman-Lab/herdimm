<template>
    <v-app>
        <v-container style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <div style="text-align: left; font-size: smaller"  id="content">
                <h6>{{this.labels.transcriptInfos1}}</h6>
                <h6>{{this.labels.transcriptInfos2}}</h6>
                <h6>{{this.labels.transcriptInfos3}}</h6>
                <h6>{{this.labels.transcriptInfos4}}</h6>
                <h6>{{this.labels.transcriptInfos5}}</h6>
                <h6>{{this.labels.transcriptInfos6}}</h6>
                <h6>{{this.labels.transcriptInfos7}}</h6>
                <h6>{{this.labels.transcriptInfos8}}</h6>
                <h6>{{this.labels.transcriptInfos9}}</h6>
                <h6>{{this.labels.transcriptInfos10}}</h6>
                <h6>{{this.labels.transcriptInfos11}}</h6>
                <h6>{{this.labels.transcriptInfos12}}</h6>
                <h6>{{this.labels.transcriptInfos13}}</h6>
                <h6>{{this.labels.transcriptInfos14}}</h6>
                <h6>{{this.labels.transcriptInfos15}}</h6>
                <h6>{{this.labels.transcriptInfos16}}</h6>
                <h6>{{this.labels.transcriptInfos17}}</h6>
                <h6>{{this.labels.transcriptInfos18}}</h6>
                <h6>{{this.labels.transcriptInfos19}}</h6>
                <h6>{{this.labels.transcriptInfos20}}</h6>
                <h6>{{this.labels.transcriptInfos21}}</h6>
                <h6>{{this.labels.transcriptInfos22}}</h6>
                <h6>{{this.labels.transcriptInfos23}}</h6>
                <h6>{{this.labels.transcriptInfos24}}</h6>
                <h6>{{this.labels.transcriptInfos25}}</h6>
                <h6>{{this.labels.transcriptInfos26}}</h6>
                <h6>{{this.labels.transcriptInfos27}}</h6>
                <h6>{{this.labels.transcriptInfos28}}</h6>
                <h6>{{this.labels.transcriptInfos29}}</h6>
                <h6>{{this.labels.transcriptInfos30}}</h6>
                <h6>{{this.labels.transcriptInfos31}}</h6>
                <h6>{{this.labels.transcriptInfos32}}</h6>
                <h6>{{this.labels.transcriptInfos33}}</h6>
                <h6>{{this.labels.transcriptInfos34}}</h6>
            </div>
        </v-container>
    </v-app>
</template>


<script>
    import textsFr from "../assets/json/textsFr";
    import textsEng from "../assets/json/textsEng";

    export default {
        name: "Transcript",
        components: {},

        data() {
            return {
                labelSelected: String,
                labels : '',
                currentLanguage : ''
            };
        },

        methods: {
            /**
             * ---> Track function to send information to google analytics
             * @param none
             * @return none
             */
            track () {
                this.$ga.page({
                    page: '/Transcript',
                    title: 'Transcript page',
                    location: window.location.href
                })
            },
            /**
             * ---> Change the language of the interface
             * @param {String} language
             * @return none
             */
            selectCurrentLanguage(language) {
                if (language === "fr")
                    this.labels = textsFr;
                else
                    this.labels = textsEng;
                this.currentLanguage = this.labels.currentLanguage;
            }
        },
        mounted() {
            this.labelSelected = localStorage.getItem("language");
            this.selectCurrentLanguage(this.labelSelected);
            console.log(this.labelSelected);
            this.track();
        }
    }
</script>

<style scoped>

</style>
