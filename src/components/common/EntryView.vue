<template>
  <div class="cs-response-c">
    <div class="cs-response-c__views">{{ count }} views</div>
  </div>
</template>

<script>
export default {
  name: "EntryViews",
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
