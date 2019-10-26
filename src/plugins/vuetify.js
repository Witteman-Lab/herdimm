import Vue from 'vue';
import Vuetify, {
  VCarousel,
  VCarouselItem,
  VStepperHeader,
  VStepper,
  VStepperItems,
  VStepperContent,
  VStepperStep,
  VBtn
} from 'vuetify/lib'

Vue.use(Vuetify, {
  components: {
    VCarousel,
    VCarouselItem,
    VStepperHeader,
    VStepper,
    VStepperItems,
    VStepperContent,
    VStepperStep,
    VBtn
  }
});

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  }
});
