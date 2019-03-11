import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Animations from '../components/Animations'

Vue.use(Router);


export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/Animations',
            name: 'Animations',
            component: Animations
        }

    ]

})
