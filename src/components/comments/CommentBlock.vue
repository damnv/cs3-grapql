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
          <CommentForm :total-comments="totalComments" :entryId="entryId" :userId="userId" :doAddComment="doAddComment"></CommentForm>
          <CommentList :comments="comments" :loadmore="loadmore" :entryId="entryId" :userId="userId"></CommentList>
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
    comments: {
      type: Array,
      default: () => [],
    },
    loadmore: {
      type: Boolean,
      deafult: () => false,
    },
    entryId: {
      type: Number,
      deafult: () => 0,
    },
    userId: {
      type: Number,
      deafult: () => 0,
    },
    doAddComment: {
      type: Function
    },
  },
};
</script>

<style></style>
