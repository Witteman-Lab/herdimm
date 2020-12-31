import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faPause, faStepForward, faStepBackward, faFastBackward, faFastForward, faAngleDown,faPlayCircle, faRedo, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vuetify from './plugins/vuetify';
import VueRecognizer from 'vue-recognizer';
import VueAnalytics from 'vue-analytics';
import VueTippy, { TippyComponent } from "vue-tippy";

Vue.use(VueRecognizer);
library.add(faPlay, faPause, faStepForward, faStepBackward, faFastBackward, faFastForward, faAngleDown,faPlayCircle, faRedo, faExternalLinkAlt);

require("./scss/main.scss");
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VueAnalytics, {
    id: 'UA-170491516-1',
    router
});

Vue.use(VueTippy, {
    directive: "tippy", // => v-tippy
    flipDuration: 0,
    popperOptions: {
        modifiers: {
            preventOverflow: {
                enabled: false
            }
        }
    }
});

Vue.component("tippy", TippyComponent);

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app');
