<template>
  <div>
    <component :is="layout" />
  </div>
</template>

<script>
import axios from "axios";
import MainLayout from "@/layout/main.vue";
import DefaultLayout from "@/layout/default.vue";
import { setToken, getToken } from "@/utils/auth";
export default {
  components: {
    MainLayout,
    DefaultLayout,
  },
  data() {
    return {
      layout: null,
    };
  },
  watch: {
    $route: {
      handler: "handleLayout",
      immediate: true,
    },
  },
  methods: {
    handleLayout(to) {
      if (to.meta.layout !== undefined) {
        this.layout = to.meta.layout;
      } else {
        this.layout = "defaultLayout";
      }
    },
    getAccessToken(){
    let data = {
      "client_id":"hrTKytoxhsplCVvWCiz9wUEemdscdCG5",
      "client_secret":"ch16s13GerZzh_c_lDIbJIFsqUREr4Qn7ZWTTAJstW-gh8y1xuDM7den-e-6Fr0s",
      "audience":"https://test-cs3.us.auth0.com/api/v2/",
      "grant_type":"client_credentials"
    }
    axios
        .post("https://test-cs3.us.auth0.com/oauth/token/", data)
        .then(({ data }) => {
          setToken(data.access_token)
          console.log(data.access_token);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  created(){
    if(!this.$auth.user?.email && !getToken()) this.getAccessToken();
  }
};
</script>
