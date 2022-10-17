<template>
  <div v-if="toast" class="toast">
    <v-alert :type="toast.type" outlined>{{ toast.message }}</v-alert>
  </div>
</template>

<script>
export default {
  name: "BaseToast",
  props: {
    toast: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  watch: {
    toast: {
      handler: "removeToastDelay",
      immediate: "true",
    },
  },
  methods: {
    onRemove(id) {
      this.$emit("onRemove", id);
    },
    removeToastDelay() {
      setTimeout(() => {
        this.onRemove(this.toast.id);
      }, this.toast.duration);
    },
  },
};
</script>

<style lang="scss">
.toast {
  .v-alert--outlined {
    border: 10px !important;
    background-color: var(--v-white-base) !important;
    box-shadow: 0 0 10px var(--v-gray100-base);
  }
  .v-alert__content {
    max-width: 800px;
    max-height: 50px;
    overflow: hidden;
    color: var(--v-gray700-base);
    font-weight: 600;
  }
  .v-alert:not(.v-sheet--tile) {
    border-radius: 8px;
  }
}
</style>
