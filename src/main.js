import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faPause, faStepForward, faStepBackward, faFastBackward, faFastForward, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vuetify from './plugins/vuetify';
import VueRecognizer from 'vue-recognizer';


Vue.use(VueRecognizer);
library.add(faPlay, faPause, faStepForward, faStepBackward, faFastBackward, faFastForward, faAngleDown);

//Vue.config.productionTip = false;
require("./scss/main.scss");
// require("./scss/animation.scss");
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app');
