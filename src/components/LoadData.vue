<template>
    <div>
        <div v-for="data in myJson">{{data}}</div>
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
