import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../components/Home'
import Home from '../components/HomeTabs'
import Animations from '../components/Animations'
import Shapes from '../components/Shapes'

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
            component: Animations,
            props: true
        },
        {
            path: '/Shapes',
            name: 'Shapes',
            component: Shapes,
            props: true
        }


    ]

})
