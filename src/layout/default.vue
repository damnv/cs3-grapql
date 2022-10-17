<template>
  <v-app>
    <v-container>
      <router-view />
      <UIToastList />
    </v-container>
  </v-app>
</template>

<script>
import UIToastList from "@/components/toasts/ToastList";

export default {
  name: "defaultLayout",
  components: {
    UIToastList,
  },
  methods: {},
};
</script>
