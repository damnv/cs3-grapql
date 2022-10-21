<template>
  <div class="pm-home">
    <div class="pm-home-pgl">
      <div class="d-flex justify-space-between align-center">
        <h3 class="mt-4 mb-5">Placegallery</h3>
        <div class="pm-home-detail-link">
          <router-link :to="{ name: 'placegallery-list' }"
            ><v-icon color="navy">mdi-arrow-right</v-icon></router-link
          >
        </div>
      </div>
      <Placegallery hidden-header-back></Placegallery>
    </div>
    <v-btn @click="getToken">show Token</v-btn>
    <p>{{ token }}</p>
  </div>
</template>

<script>
import Placegallery from "@/pages/placegallery/index";
// import gql from "graphql-tag";
import commonMixins from "@/mixins/common";
export default {
  name: "Home",
  mixins: [commonMixins],
  data() {
    return {
      entries: [],
      getListReaction: [],
      token: "",
    };
  },
  components: { Placegallery },
  props: {},
  watch: {},
  methods: {
    async getToken() {
      // Get the access token from the auth wrapper
      this.token = await this.$auth.getTokenSilently();
    },
  },
  apollo: {},
  created() {
    // this.$apollo
    //   .query({
    //     query: gql`
    //       query MyQuery($idToken: String) {
    //         login(id_token: $idToken) {
    //           data {
    //             id
    //             email
    //             nickname
    //           }
    //           result_code
    //         }
    //       }
    //     `,
    //     variables: {
    //       idToken:
    //         "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImJmN0duQ0FHWmdUQ3dXTUt1NDZxMCJ9.eyJpc3MiOiJodHRwczovL2Rldi0zbGdtZmQwdHE1bG1pODZ6LmpwLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExMTY5MTYyNjM2MTkzNDE5MDk1MyIsImF1ZCI6WyJodHRwOi8vbG9jYWxob3N0OjgwODAvIiwiaHR0cHM6Ly9kZXYtM2xnbWZkMHRxNWxtaTg2ei5qcC5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjY2MzQzMTA3LCJleHAiOjE2NjY0Mjk1MDcsImF6cCI6InphbzNkNlZMS0dTZXJ4dGYxU2lSN216TDk3aXNydmFrIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.Jv_WSD5A0okIeqMR_RzdhGCzliOsYdbjOVqq6XX2luFMtnjMn3ZYP1ytkeyRwJrNSyCHVJjGBndwDUSH_6pm4A-AmrIC3WY4XuD_nQZHyFi-su99FLHed902JuIunTCse4rHYF_IkStpkP4bQsEQMlvWqIkU7jA0UYDSajlygRDwJA-fa-yiJD74ae9tcHExqj95gTlKuIa0Tl_9ZUOJgGbvOgpv9LTm1gNXz0kdx7yjxdEcTAawAdkUHZn32uQelROZXOdCBdCBCpPyKvw8Ods8qk9X5pVFly1zXwEAGKemd7ekAGhGHLbbIaatlOTT4IAZmnuoblzp2SF5OdyHvA",
    //     },
    //     error(error) {
    //       console.log(error);
    //     },
    //   })
    //   .then(({ data }) => {
    //     console.log(data);
    //   })
    //   .catch(({ graphQLErrors, networkError }) => {
    //     setTimeout(() => {
    //       if (graphQLErrors) {
    //         graphQLErrors.forEach(({ message }) => {
    //           this.newToast({
    //             type: "error",
    //             message: message,
    //           });
    //         });
    //       }
    //       if (networkError) {
    //         networkError.result.errors.forEach(({ message }) => {
    //           this.newToast({
    //             type: "error",
    //             message: message,
    //           });
    //         });
    //       }
    //     }, 200);
    //   });
  },
};
</script>

<style lang="scss"></style>
