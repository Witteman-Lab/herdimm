/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import VSwatches from 'vue3-swatches'
import 'vue3-swatches/dist/style.css'
library.add(fas);
import { createVuetify } from 'vuetify'
import 'vuetify/dist/vuetify.css'
import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
const app = createApp(App)
const vuetify = createVuetify()
registerPlugins(app)
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(vuetify)
app.use(VSwatches)
app.use(Vue3ColorPicker)
app.mount('#app')