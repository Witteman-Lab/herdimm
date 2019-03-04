import Vue from 'vue'
import router from 'vue-router'
import Animations from '@/components/Animations'

Vue.use(router);
export default new router({
    routes: [
        {
            path: '/Animations',
            name: 'Animations',
            component: Animations
        }
    ]

})
