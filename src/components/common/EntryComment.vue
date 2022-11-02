<template>
  <div class="cs-response-c">
    <div class="cs-response-c__button--comment">
      <i class="cs-response-c__icon--medium"></i
      ><span class="cs-response-c__counter">{{ count }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "EntryComment",
  data() {
    return {};
  },
  props: {
    count: {
      default: 0,
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
