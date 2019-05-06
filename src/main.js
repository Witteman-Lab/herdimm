import Vue from 'vue'
import App from './App.vue'
import router from './router'

//Vue.config.productionTip = false;
require("./scss/main.scss");
// require("./scss/animation.scss");

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
