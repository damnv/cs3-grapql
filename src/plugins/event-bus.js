import Vue from "vue";
const eventBus = new Vue();

const EventBus = {
  install(Vue) {
    Vue.prototype.$bus = eventBus;
  },
};
Vue.use(EventBus);
