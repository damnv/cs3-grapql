<template>
  <ul
    data-cscmt-sub="list"
    class="cs-cmt-subthread__items"
    v-if="replies.length"
  >
    <SubCommentListElement
      v-for="(reply, index) in replies"
      :reply="reply"
      :key="index"
      @onReply="onReply"
    ></SubCommentListElement>
  </ul>
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
    replies: {
      type: Array,
      default: () => [],
    },
    commentId: Number,
  },
  components: {
    SubCommentListElement,
  },
  methods: {
    onReply() {
      this.$emit("onReply");
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped></style>
