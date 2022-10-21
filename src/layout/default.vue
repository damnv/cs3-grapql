<template>
  <v-app>
    <Header></Header>
    <v-container>
      <router-view />
      <UIToastList />
    </v-container>
    <v-overlay
      v-if="isLoading || (!$auth && $auth.loading)"
      z-index="9999"
      opacity="0.46"
      color="rgb(33, 33, 33)"
    >
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import UIToastList from "@/components/toasts/ToastList";
import Header from "@/components/header/header.vue";
import commonMixins from "@/mixins/common";

export default {
  name: "defaultLayout",
  mixins: [commonMixins],
  components: {
    UIToastList,
    Header,
  },
  methods: {},
};
</script>
