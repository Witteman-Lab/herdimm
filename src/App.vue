<template>
  <v-app>
    <v-content>

        <div class="container" id="app">
          <div class="columns">
            <router-view class="column"/>
          </div>
        </div>

    </v-content>
  </v-app>
</template>

<script>
import Home from './components/Home';

export default {
  name: 'App',
  components: {
    // Home,
  },
  data: () => ({
    //
  }),
};
</script>


<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 10px auto;
  }
</style>