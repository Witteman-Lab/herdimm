<template>
    <div class="container" id="app">
       <div class="columns">
           <router-view class="column"/>
       </div>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin: 10px auto;
        padding: 0;
    }
</style>
