<template>
  <div>
    <component :is="layout" />
  </div>
</template>

<script>
import MainLayout from "@/layout/main.vue";
import DefaultLayout from "@/layout/default.vue";
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
  },
};
</script>
