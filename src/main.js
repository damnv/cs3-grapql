import "./plugins/vee-validate";
import "./plugins/event-bus";
import "./plugins/filters";
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
// import { createUploadLink } from "apollo-upload-client";
import { Auth0Plugin } from "./plugins/auth0";
import { domain, clientId, audience } from "./auth_config.json";

const BASE_URL_GRAPQL = process.env.VUE_APP_API_GRAPHQL_URL;
const API_KEY = process.env.VUE_APP_API_KEY;

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: BASE_URL_GRAPQL,
  headers: {
    "x-api-key": API_KEY,
  },
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  onError(err) {
    console.log(err);
  },
});

Vue.config.productionTip = false;
Vue.use(VueCookies);
Vue.use(VueApollo);
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience, // NEW - configure the plugin with the audience value
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  },
});

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
