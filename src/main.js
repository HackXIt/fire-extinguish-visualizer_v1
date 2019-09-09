import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import VueAwesomeCountdown from "vue-awesome-countdown";
import VueStatusIndicator from "vue-status-indicator";
import VueDraggableResizable from "vue-draggable-resizable";
import VuePolling from "vue-polling";

Vue.use(VueAwesomeCountdown);
Vue.use(VueStatusIndicator);
Vue.use(VuePolling);
Vue.component("vue-draggable-resizable", VueDraggableResizable);
Vue.config.productionTip = false;

export const eventBus = new Vue();

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

// runtime-compiler version:
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })
