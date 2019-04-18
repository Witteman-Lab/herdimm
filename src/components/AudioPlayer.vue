<template>
    <div id="audioPlayer">
         <audio :src="this.current" muted="muted" ref="audio" @ended="nextAudioFile()" preload="auto"></audio>
    </div>
</template>

<script>
    import audio from "../assets/audio.json";

    export default {
        name: "AudioPlayer",
        components: {},
        data() {
            return {
                language: "en",
                playlist: [],
                current: '',
                onplay: false
            }
        },
        props: {},
        methods: {
            playAudio() {
                console.log(this.current);
                let ref = this.$refs.audio;
                let playPromise;

                setTimeout(function() {
                    playPromise = ref.play();
                    if (playPromise !== undefined) {
                        playPromise.then(()=> {
                            // lancer les futures animations ici
                        }).catch((error) => {
                            console.log(error);
                            this.onplay = false;
                            // error au niveau de l'audio
                        });
                    }
                }, 1);
            },
            loadAudioFiles(type) {
                this.language = type;
                const jsonPlaylist = audio[type].sequences;
                const folder = audio.folder;
                for (let i = 0; i < jsonPlaylist.length; i++) {
                    this.playlist.push(require(`../assets/${folder}/${type}/${jsonPlaylist[i].file}`));
                }
            },
            nextAudioFile() {
                this.onplay = true;
                if (this.playlist.length > 0) {
                    this.current = this.playlist.shift();
                    this.playAudio();
                } else {
                    this.current = "";
                    this.onplay = false;
                }
            },
        },
        created() {},
        mounted() {
            this.loadAudioFiles(audio.en.folder);
            this.nextAudioFile();
        }
    }
</script>

<style scoped>
    #audioPlayer {
        display: none;
    }
</style>
