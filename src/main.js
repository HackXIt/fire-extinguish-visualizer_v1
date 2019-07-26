import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import VueAwesomeCountdown from "vue-awesome-countdown"

Vue.use(VueAwesomeCountdown);
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
