import "./plugins/vee-validate";
import "./plugins/event-bus";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueAxios from "vue-axios";
import VueCookies from "vue-cookies";
import vuetify from "./plugins/vuetify";
import VueApollo from "vue-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const BASE_URL_GRAPQL = process.env.VUE_APP_API_GRAPQL_URL;
const API_KEY = process.env.VUE_APP_API_KEY;

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: BASE_URL_GRAPQL,
  headers: {
    "x-api-key": API_KEY
  }
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

Vue.config.productionTip = false;
Vue.use(VueCookies);
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

new Vue({
  VueAxios,
  router,
  store,
  vuetify,
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
