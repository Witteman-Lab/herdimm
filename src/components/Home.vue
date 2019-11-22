<template>
    <div class="container">
        <div class="column">
            <button id="continue" class="continue button is-primary is-success"  v-on:click="loadHome()">Next</button>

        </div>

    </div>
</template>

<script>
    export default {
        name: "Home",
        methods: {
            loadHome(){
                this.$router.push({name: 'Avatars',});
            }
        }
    }

</script>

<style scoped>

</style>