import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueAxios from "vue-axios";
import VueCookies from "vue-cookies";
import vuetify from "./plugins/vuetify";
import VueApollo from "vue-apollo";
import "./plugins/vee-validate";
import "./plugins/event-bus";

Vue.config.productionTip = false;
Vue.use(VueCookies);
Vue.use(VueApollo);

new Vue({
  VueAxios,
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
