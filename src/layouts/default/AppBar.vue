<template>
  <v-app-bar color="#E4EDEE" elevation="10" height="80" fixed>
    <v-tooltip>
      <template v-slot:activator="{ on }">
        <v-btn
          color="#05CDC1"
          size="large"
          variant="outlined"
          style="background-color: white"
          >Transcript</v-btn
        >
      </template>
      <span>Trasncript</span>
    </v-tooltip>
    <!-- <v-breadcrumbs id="breadcrums" class="w-50 mx-16" :items="items">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs> -->
    <v-spacer></v-spacer>
    <div class="mt-5 mr-5">
      <v-select
        class="text"
        variant="solo"
        flat
        :items="languageItems"
        v-model="language"
        bg-color="#05CDC1"
        density="compact"
      ></v-select>
    </div>
  </v-app-bar>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const languageItems = ["ENGLISH", "FRANCAIS"];
const language = ref("ENGLISH");
const items = ref([
  { title: "Home", disabled: false, href: "Home", to: "/" },
  {
    title: "Make your Avatars",
    disabled: false,
    href: "MakeAvatars",
    to: "/Avatars",
  },
  { title: "Choose", disabled: false, href: "Choose", to: "/Choose" },
  {
    title: "Compare the Evidence",
    disabled: false,
    href: "Compare",
    to: "/Compare",
  },
]);
const route = useRoute();

watch(
  () => route.path,
  (newPath) => {
    const currentIndex = items.value.findIndex((item) => item.to === newPath);
    items.value.forEach((item, index) => {
      item.disabled = index > currentIndex;
    });
  }
);

onMounted(() => {
  const currentIndex = items.value.findIndex((item) => item.to === route.path);
  items.value.forEach((item, index) => {
    item.disabled = index > currentIndex;
  });
});
</script>

<style lang="scss" scoped>
#title {
  color: white;
}
.orange {
  color: #ec8e11;
}
#breadcrums:deep() {
  color: white;
}
.inactive {
  position: relative;
  text-decoration: none;

  &:before {
    content: "";
    position: absolute;
    bottom: -40px;
    left: 0;
    width: 100%;
    height: 20px;
    background-color: #497a62;
    border-radius: 5px;
  }
}
.active:deep(a) {
  position: relative;
  text-decoration: none;

  &:before {
    content: "";
    position: absolute;
    bottom: -40px;
    left: 0;
    width: 100%;
    height: 20px;
    background-color: #ec8e11;
    border-radius: 5px;
  }
}
.text:deep(*) {
  color: white;
  font-weight: bold;
}
</style>
