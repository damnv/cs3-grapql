import Vue from "vue";
import createAuth0Client from "@auth0/auth0-spa-js";
import apiService from "@/services/apiService";
import { mapMutations } from "vuex";
import { setToken } from "@/utils/auth";

/** Define a default action to perform after authentication */
const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

let instance;

/** Returns the current instance of the SDK */
export const getInstance = () => instance;

/** Creates an instance of the Auth0 SDK. If one has already been created, it returns that instance */
export const useAuth0 = ({
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  redirectUri = window.location.origin,
  ...options
}) => {
  if (instance) return instance;

  // The 'instance' is simply a Vue object
  instance = new Vue({
    data() {
      return {
        loading: true,
        isAuthenticated: false,
        user: {},
        auth0Client: null,
        popupOpen: false,
        error: null,
      };
    },
    methods: {
      ...mapMutations({
        newToast: "toast/NEW_TOAST",
      }),
      /** Authenticates the user using a popup window */
      async loginWithPopup(options, config) {
        this.popupOpen = true;

        try {
          await this.auth0Client.loginWithPopup(options, config);
          this.user = await this.auth0Client.getUser();
          this.isAuthenticated = await this.auth0Client.isAuthenticated();
          this.error = null;
        } catch (e) {
          this.error = e;
          // eslint-disable-next-line
          console.error(e);
        } finally {
          this.popupOpen = false;
        }

        this.user = await this.auth0Client.getUser();
        this.isAuthenticated = true;
      },
      /** Handles the callback when logging in using a redirect */
      async handleRedirectCallback() {
        this.loading = true;
        try {
          await this.auth0Client.handleRedirectCallback();
          this.user = await this.auth0Client.getUser();
          this.isAuthenticated = true;
          this.error = null;
        } catch (e) {
          this.error = e;
        } finally {
          this.loading = false;
        }
      },
      /** Authenticates the user using the redirect method */
      loginWithRedirect(o) {
        return this.auth0Client.loginWithRedirect(o);
      },
      /** Returns all the claims present in the ID token */
      getIdTokenClaims(o) {
        return this.auth0Client.getIdTokenClaims(o);
      },
      /** Returns the access token. If the token is invalid or missing, a new one is retrieved */
      getTokenSilently(o) {
        return this.auth0Client.getTokenSilently(o);
      },
      /** Gets the access token using a popup window */

      getTokenWithPopup(o) {
        return this.auth0Client.getTokenWithPopup(o);
      },
      /** Logs the user out and removes their session on the authorization server */
      logout(o) {
        return this.auth0Client.logout(o);
      },
      getConfig(){
        const graphqlQuery = {
          operationName: "MyQuery",
          query:
            " query MyQuery{ getConfigs{data { auth0 { domain secret } } result_code } }",
        };
        apiService
        .post("", graphqlQuery)
        .then(({ data }) => {
          const config = data.data.getConfigs.data[0].auth0;
          // options.domain = config.domain;
          // options.clientId = config.secret
        })
        .catch((error) => {
          console.log(error);
        });
      }
    },
    /** Use this lifecycle method to instantiate the SDK client */
    async created() {
      await this.getConfig();
      // Create a new instance of the SDK client using members of the given options object
      this.auth0Client = await createAuth0Client({
        ...options,
        client_id: options.clientId,
        redirect_uri: redirectUri,
      });

      try {
        // If the user is returning to the app after authentication..
        if (
          window.location.search.includes("code=") &&
          window.location.search.includes("state=")
        ) {
          // handle the redirect and retrieve tokens
          const { appState } = await this.auth0Client.handleRedirectCallback();

          this.error = null;

          // Notify subscribers that the redirect callback has happened, passing the appState
          // (useful for retrieving any pre-authentication state)
          onRedirectCallback(appState);
        }
      } catch (e) {
        this.error = e;
      } finally {
        // Initialize our internal authentication state
        this.isAuthenticated = await this.auth0Client.isAuthenticated();
        this.user = await this.auth0Client.getUser();
        this.loading = false;
        if (this.isAuthenticated) {
          const idToken = await this.$auth.getIdTokenClaims();
          console.log(idToken);
          // const accessToken = await this.$auth.getTokenSilently();
          setToken(accessToken);

          const graphqlQuery = {
            operationName: "MyQuery",
            query:
              " query MyQuery($token: String) { login(token: $token) {data { id nickname } result_code } }",
            variables: { token: accessToken },
          };

          await apiService
            .post("", graphqlQuery)
            .then(({ data }) => {
              if (data.data.login) {
                this.user.id = data.data.login.data.id;
                console.log(this.user);
              }
              if (data?.errors) {
                data.errors.forEach((error) => {
                  console.log(error.message);
                  // this.newToast({
                  //   type: 'error',
                  //   message: error.message
                  // });
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
  });

  return instance;
};

// Create a simple Vue plugin to expose the wrapper object throughout the application
export const Auth0Plugin = {
  install(Vue, options) {
    Vue.prototype.$auth = useAuth0(options);
  },
};
