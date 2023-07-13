<template>
  <v-container fluid class="fill-height">
    <v-container class="d-flex justify-center">
      <div class="landing-page" style=" width: fit-content;">
        <div ref="landingImage" class="image" v-html="svg"></div>
        <div id="container-landing-page-text">
          <div class="title-landing-page" style="text-align: left">
            Quel est le rôle de chacun dans la protection de la communauté ?
          </div>
          <div class="subtitle-landing-page">Une visualisation interactive</div>

          <div class="interactions-landing-page">
            <button
              id="continue"
              class="continue button is-primary is-medium has-text-centered"
              style="float: left; color: black"
              @click="goToAvatars()"
            >
              <span style="margin-left: 30px">COMMENCER</span>
              <a
                ><font-awesome-icon
                  style="margin-left: 10px; color: black"
                  icon="play"
              /></a>
            </button>
          </div>
        </div>
      </div>
    </v-container>
  </v-container>
</template>

<script setup>
import { useWindowSize } from "@vueuse/core";
import { useRouter } from "vue-router";
import SVG from "../assets/images/Illustration.svg";
import { ref, onMounted } from "vue";


const { width } = useWindowSize();
const router = useRouter();
const svg = ref("");
const svgFiles = {
  landingImage: SVG,
};


async function loadSvgFile() {
  for (const key in svgFiles) {
    try {
      const response = await fetch(svgFiles[key]);
      svg.value = await response.text();
    } catch (error) {
      console.error("Error loading SVG file:", error);
    }
  }
}


onMounted(() => {
  loadSvgFile();
});

const goToAvatars = () => {
  router.push("/Avatars");
};
</script>

<style lang="scss" scoped>
div#mainApp {
  background-color: #ced9db;
}

#selectLanguage {
  width: 133px;
  height: 34px;
  background: #0000ee;
  border-radius: 15px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
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
  background-color: #05cdc1;
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

button.continue:focus {
  outline: 0;
}

.interactions-landing-page {
  display: grid;
}

/*for larger and medium devices (desktop)*/
@media screen and (min-width: 812px) {
  .landing-page {
    display: flex;
  }

  #container-landing-page-text {
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

  #container-landing-page-text {
    margin: 0 auto;
    width: 50%;
  }
  
  div#mainApp {
    height: auto;
  }
  .landing-page {
    margin-left: 10px
  }

  .title-landing-page {
    width: auto;
    height: auto;
    line-height: 39px;
    margin-left: 20px;
    font-size: 18px;
    margin-right: 20px;
  }

  .subtitle-landing-page {
    margin-left: 20px;
  }

  .interactions-landing-page  button{
    width: auto;
    
  }

  #selectLanguage {
  }

  button#continue {
    margin-bottom: 36px;
  }
}
</style>
