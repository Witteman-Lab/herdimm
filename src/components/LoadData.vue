<template>
    <div>
        <diV v-for="data in myJson">{{data}}</diV>
    </div>
</template>

<script>
    import json  from './data/characters.json'
    export default {
        name: "LoadData",
        data(){
            return{
                myJson: json
            }
        }

    }
</script>

<style scoped>

</style>
