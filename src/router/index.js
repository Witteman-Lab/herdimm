import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Avatars from '../components/Avatars'
import Animation from '../components/Animation'

Vue.use(Router);


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
        }
    ]

})
