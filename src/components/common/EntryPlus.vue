<template>
  <div class="cs-response-c" :class="classContent">
    <div class="cs-response-c__button--like">
      <v-icon size="20">$likeBlue</v-icon>
      ><span data-cslike-counter="12345" class="cs-response-c__counter">{{
        count
      }}</span>
      <span
        v-if="showText"
        data-csreaction="button-label"
        class="cs-response-c__label"
        >いいね！</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "EntryPlus",
  data() {
    return {};
  },
  props: {
    count: {
      default: () => 0,
    },
    classContent: {
      type: String,
      default: () => "",
    },
    showText: {
      type: Boolean,
      default: () => false,
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
