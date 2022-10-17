<template>
  <div class="d-flex">
    <v-icon @click="historyBack">$previousIcon</v-icon>
  </div>
</template>

<script>
export default {
  name: "HeaderBack",
  data() {
    return {};
  },
  methods: {
    historyBack() {
      this.$router.back();
    },
  },
};
</script>

<style></style>
