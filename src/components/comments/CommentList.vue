<template>
  <div class="cs-cmt__list" v-if="comments">
    <div class="cs-cmt-thread">
      <!-- コメント リスト-->
      <ul data-cscmt="list" class="cs-cmt-thread__items">
        <CommentListElement         v-for="(comment, index) in comments"
          :key="index" :comment="comment"></CommentListElement>
      </ul>
      <!-- もっと見るボタン（下部）-->
      <div class="cs-cmt-thread__footer" v-if="loadmore">
        <div class="cs-cmt-thread-more">
          <div
            data-cscmt="indicator"
            class="cs-cmt-thread-more__indicator is-hidden"
          >
            <div class="cs-spinner-b--m">読み込み中</div>
          </div>
          <div data-cscmt="trigger" class="cs-cmt-thread-more__button">
            <div class="cs-cmt-thread-more__label">以前のコメントを見る</div>
          </div>
        </div>
      </div>
      <!-- / もっと見るボタン（下部）-->
    </div>
  </div>
</template>

<script>
import CommentListElement from "./CommentListElement";

export default {
  name: "CommentList",
  data() {
    return {
      currentCommentId: null,
    };
  },
  props: {
    comments: {
      type: Array,
      default: () => [],
    },
    loadmore: {
      type: Boolean,
      default: () => false,
    },
  },
  components: {
    CommentListElement,
  },
  methods: {},
};
</script>
