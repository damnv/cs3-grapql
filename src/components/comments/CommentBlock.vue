<template>
  <div class="cs-pane">
    <div class="cs-pane__inner--a">
      <div class="pm-pla-detail__comments">
        <div class="pm-pla-detail__comments__title">コメント</div>
        <!-- コメント ブロック-->
        <!-- ソート機能-->
        <!-- 上にコメントフォーム data-cscmt-order="top"-->
        <!-- 下にコメントフォーム data-cscmt-order="bottom"-->
        <div data-cscmt="root" data-cscmt-order="top" class="cs-cmt">
          <CommentForm
            :total-comments="totalComments"
            :entryId="entryId"
            :userId="userId"
            :moudle="module"
            :doAddComment="doAddComment"
          ></CommentForm>
          <CommentList
            :comments="comments"
            :currentPage="currentPage"
            :loadmore="loadmore"
            :entryId="entryId"
            :userId="userId"
            :limit="limit"
            @onUpdateComment="onUpdateComment"
            @onUpdateSubComment="onUpdateSubComment"
            @onUpdateCommentLoadmore="onUpdateCommentLoadmore"
          ></CommentList>
        </div>
        <!-- / コメント ブロック-->
      </div>
    </div>
  </div>
</template>

<script>
import CommentList from "@/components/comments/CommentList.vue";
import CommentForm from "@/components/comments/CommentForm.vue";
export default {
  name: "CommentBlock",
  components: { CommentForm, CommentList },
  props: {
    totalComments: {
      default: () => 0,
    },
    currentPage: {
      type: Number,
      deafult: () => 1,
    },
    limit: {
      type: Number,
      deafult: () => 10,
    },
    comments: {
      type: Array,
      default: () => [],
    },
    entryId: {
      type: Number,
      deafult: () => 0,
    },
    userId: {
      type: Number,
      deafult: () => 0,
    },
    module: {
      type: Object,
      deafult: () => {},
    },
    doAddComment: {
      type: Function,
    },
  },
  computed: {
    totalPage() {
      return Math.ceil(this.totalComments / this.limit);
    },
    loadmore() {
      return this.currentPage < this.totalPage;
    },
  },
  methods: {
    onUpdateComment(data) {
      this.$emit("onUpdateComment", data);
    },
    onUpdateSubComment(data) {
      this.$emit("onUpdateSubComment", data);
    },
    onUpdateCommentLoadmore(data) {
      this.$emit("onUpdateCommentLoadmore", data);
    },
  },
};
</script>

<style></style>
