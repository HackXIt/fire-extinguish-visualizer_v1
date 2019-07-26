import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Setup from "./views/Setup.vue";
import Visualization from "./views/Visualization.vue";
import CircularCountDownTimer from "vue-circular-count-down-timer"

Vue.use(Router);
// Vue.use(CircularCountDownTimer)

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/setup",
      name: "setup",
      component: Setup
    },
    {
      path: "/visualization",
      name: "visualization",
      component: Visualization
    }
  ]
});
