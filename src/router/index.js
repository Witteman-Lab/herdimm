import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Avartars'
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
            path: '/Animation',
            name: 'Animation',
            component: Animation,
            props: true
        }
    ]

})
