<template>
  <transition-group name="slide" tag="div" class="toast-list">
    <UIToast
      v-for="(toast, index) in toasts"
      :key="index"
      :toast="toast"
      @onRemove="onRemoveToast"
    />
  </transition-group>
</template>

<script>
import UIToast from "@/components/toasts/Toast";
import { mapState, mapMutations } from "vuex";

export default {
  name: "UIToastList",
  components: {
    UIToast,
  },
  computed: {
    ...mapState({
      toasts: (state) => state.toast.toasts,
    }),
  },
  watch: {
    $route: {
      handler: "removeToastList",
      deep: "true",
    },
  },
  methods: {
    ...mapMutations({
      removeToast: "toast/REMOVE_TOAST",
      removeToastList: "toast/REMOVE_TOAST_LIST",
    }),
    onRemoveToast(id) {
      this.removeToast({
        id: id,
      });
    },
  },
};
</script>

<style lang="scss">
.toast-list {
  position: fixed;
  top: 2.6rem;
  right: 2.6rem;
  z-index:999999999999
}
.slide-leave-active,
.slide-enter-active {
  transition: all ease 0.5s;
}
.slide-enter {
  transform: translateY(-50%);
  opacity: 1;
}
.slide-leave-to {
  transform: translateY(50%);
  opacity: 0;
}
</style>
