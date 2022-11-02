<template>
  <div class="cs-cmt__list" v-if="comments">
    <div class="cs-cmt-thread">
      <!-- コメント リスト-->
      <ul data-cscmt="list" class="cs-cmt-thread__items">
        <CommentListElement
          v-for="(comment, index) in comments"
          :key="index"
          :comment="comment"
          @onUpdateComment="onUpdateComment"
          @onUpdateSubComment="onUpdateSubComment"
        ></CommentListElement>
      </ul>
      <!-- もっと見るボタン（下部）-->
      <div class="cs-cmt-thread__footer" v-if="loadmore">
        <div class="cs-cmt-thread-more">
          <div
            data-cscmt="trigger"
            class="cs-cmt-thread-more__button"
            @click.prevent="onLoadmore"
          >
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
import { GET_COMMENT_ENTRY_QUERY } from "@/graphql/queries";

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
    currentPage: {
      type: Number,
      default: 1,
    },
    entryId: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 0,
    },
    loadmore: {
      type: Boolean,
      default: () => false,
    },
  },
  components: {
    CommentListElement,
  },
  methods: {
    onUpdateComment(data) {
      this.$emit("onUpdateComment", data);
    },
    onUpdateSubComment(data) {
      this.$emit("onUpdateSubComment", data);
    },
    onLoadmore() {
      this.$apollo
        .query({
          query: GET_COMMENT_ENTRY_QUERY,
          variables: {
            currentPage: this.currentPage + 1,
            entryId: this.entryId,
            limit: this.limit,
            sort: "new",
          },
          update: () => {},
          error(error) {
            console.log(error);
          },
        })
        .then(({ data }) => {
          this.$emit("onUpdateCommentLoadmore", data.getCommentsByEntryId.data);
        })
        .catch(({ graphQLErrors, networkError }) => {
          this.setLoading(false);
          setTimeout(() => {
            if (graphQLErrors) {
              graphQLErrors.forEach(({ message }) => {
                this.newToast({
                  type: "error",
                  message: message,
                });
              });
            }
            if (networkError) {
              networkError.result.errors.forEach(({ message }) => {
                this.newToast({
                  type: "error",
                  message: message,
                });
              });
            }
          }, 200);
        });
    },
  },
};
</script>
