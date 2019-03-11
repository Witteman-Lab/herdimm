<template>
    <div>
        <h1>Animation</h1>
        <div class="container" style="display: flex;justify-content: center;">
            <div class="column is-four-fifths" >
                <div>
                    <GroupCharacter ref="group"></GroupCharacter>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import GroupCharacter from "./GroupCharacter";
    export default {
        name: 'Animations',
        components: {GroupCharacter},
        props: {
            group: {
                type: Array
            }
        },
        mounted() {
            this.$refs.group.addGroup(this.group);
        }
    }
</script>

<style scoped>

</style>
