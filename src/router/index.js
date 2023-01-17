import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Avatars from '../components/Avatars'
import Animation from '../components/Animation'
import Transcript from '../components/Transcript'
import VueMeta from 'vue-meta'

Vue.use(Router);
Vue.use(VueMeta);


export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/Avatars',
            name: 'Avatars',
            component: Avatars,
            props: true
        },
        {
            path: '/Animation',
            name: 'Animation',
            component: Animation,
            props: true
        },
        {
            path: '/Transcript',
            name: 'Transcript',
            component: Transcript,
            props: true
        }
    ]

})
