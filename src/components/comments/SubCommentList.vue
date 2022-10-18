<template>
  <div>
    <SubCommentListElement></SubCommentListElement>
  </div>
</template>

<script>
import SubCommentListElement from "./SubCommentListElement";

export default {
  name: "SubCommentList",
  data() {
    return {};
  },
  computed: {},
  props: {
    subComments: Object,
    commentId: Number,
  },
  components: {
    SubCommentListElement,
  },
  mounted() {},
};
</script>
<style lang="scss" scoped></style>
