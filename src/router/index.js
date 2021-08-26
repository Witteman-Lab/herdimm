import Vue from 'vue'
import Router from 'vue-router'
import Avatars from '../components/Avatars'
import Animation from '../components/Animation'
import Transcript from '../components/Transcript'

Vue.use(Router);


export default new Router({
    routes: [
        {
            path: '/',
            name: 'Avatars',
            component: Avatars
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
