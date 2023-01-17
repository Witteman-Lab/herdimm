<template>
  <v-app>
    <v-content>
        <div class="container" id="ourApp">
          <div class="columns">
            <router-view class="column"/>
          </div>
        </div>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  metaInfo: {
    title: 'Herdimm',
    meta:[
      {name: 'description', content: "An interactive visualization of each one's role in protecting our community"}
    ]
  },
  data: () => ({
    //
  }),
};
</script>

<style scoped>
  #ourApp {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 10px auto;
    padding: 0;
  }
</style>
