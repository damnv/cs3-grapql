<template>
  <li class="cs-cmt-item js-thread-item">
    <div class="cs-cmt-item__header">
      <div class="cs-cmt-menu">
        <EntryMenus hidden-edit hidden-report is-custom-delete :customDetele="customDetele"></EntryMenus>
      </div>
      <div class="cs-cmt-item__header-author">
        <a href="#" class="cs-avatar--black">
          <div
            v-bind:style="{
              'background-image': 'url(' + comment.user.profileImg + ')',
            }"
            class="cs-avatar-2__photo--ambassador"
          ></div>
          <div class="cs-avatar__name">
            {{ comment.user.nickname }}
          </div>
          <div class="cs-avatar-2__label">
            <div class="cs-label-round--a">Official</div>
          </div></a
        >
      </div>
      <div class="cs-cmt-item__header-date">
        {{ comment.createdTime | convertDateTime }}
      </div>
    </div>
    <div class="cs-cmt-item__content">
      <div class="cs-cmt-item__body">
        {{ comment.content }}
      </div>
      <div class="cs-cmt-item__res">
        <CommentPlus
          v-if="comment.id"
          :count="comment.reactions.total"
          :reactions="comment.reactions.items"
          show-text
        ></CommentPlus>
        <div class="cs-response-a">
          <div data-csaction="comment" class="cs-response-a__button--comment">
            <i class="cs-response-a__icon--small"></i
            ><span class="cs-response-a__counter">{{ comment.comment }}</span
            ><span class="cs-response-a__label" @click="onReply">返信する</span>
          </div>
        </div>
      </div>
    </div>
    <!-- サブコメント-->
    <div data-cscmt-sub="root" class="cs-cmt-subthread">
      <form data-cscmt-sub="form"></form>
      <!-- サブコメント もっと見るボタン（上部）-->
      <div class="cs-cmt-subthread__header" v-if="totalComment > 0">
        <div class="cs-cmt-subthread-more">
          <div
            data-cscmt-sub="trigger"
            class="cs-cmt-subthread-more__button"
            @click="onLoadmore"
          >
            他{{ totalComment }}件を見る
          </div>
        </div>
      </div>
      <!-- / サブコメント もっと見るボタン（上部）-->
      <!-- サブコメント リスト-->
      <SubCommentList
        :replies="comment.replies.items"
        @onReply="onReply"
      ></SubCommentList>
      <!-- サブコメント フォーム-->
      <div
        class="cs-cmt-subitem-form js-thread-item__form"
        :class="{ 'is-hidden': !isReply }"
      >
        <!-- 動作確認用に method が get になっていますが、組み込み時には post に変えてください。-->
        <form
          data-cscmt-post-sub="form"
          enctype="multipart/form-data"
          method="get"
        >
          <div class="cs-cmt-subitem-form__avatar">
            <div class="cs-avatar">
              <div
                v-bind:style="{
                  'background-image': 'url(' + $auth.user.picture + ')',
                }"
                class="cs-avatar__image--35"
              ></div>
            </div>
          </div>
          <div class="cs-cmt-subitem-form__button">
            <button
              @click="onCreateComment"
              data-cscmt-post-sub="trigger"
              class="cs-button-b--1-m cs-button--w-50"
            >
              投稿
            </button>
          </div>
          <div class="cs-cmt-subitem-form__field">
            <textarea
              v-model="description"
              data-cscmt-post-sub="field"
              data-csfield="h-auto"
              rows="1"
              class="cs-field-a cs-field--w-100p cs-field--h-auto-mah-10"
            ></textarea>
            <div data-error-name="comment_text" class="cs-cmt-post-error"></div>
          </div>
        </form>
      </div>
    </div>
  </li>
</template>

<script>
import CommentPlus from "./CommentPlus";
import SubCommentList from "./SubCommentList.vue";
import EntryMenus from "../common/EntryMenus.vue";
import commonMixins from "@/mixins/common";
import gql from "graphql-tag";

import {
  CREATE_COMMENT_MUTATION,
  GET_SUB_COMMENTS_QUERY,
  DELETE_COMMENT_MUTATION
} from "@/graphql/mutations";

export default {
  name: "CommentListElement",
  mixins: [commonMixins],
  data() {
    return {
      isReply: false,
      description: "",
    };
  },
  components: { CommentPlus, SubCommentList, EntryMenus },
  computed: {
    totalPage() {
      return Math.ceil(this.comment.replies.total / this.comment.replies.limit);
    },
    totalComment() {
      if (
        !this.comment.replies ||
        this.comment.replies.currentPage === this.totalPage
      )
        return 0;
      return (
        this.comment.replies.total -
        this.comment.replies.limit * this.comment.replies.currentPage
      );
    },
  },
  props: {
    comment: {
      type: Object,
      default: () => {},
    },
  },
  watch: {},
  methods: {
    customDetele() {
      this.$apollo
          .mutate({
            mutation: DELETE_COMMENT_MUTATION,
            variables: {
              id: this.comment.id,
            },
            update: () => {},
          })
          .then(() => {
            setTimeout(() => {
              this.newToast({
                type: "success",
                message: "Delete comment success",
              });
            }, 0);
          })
          .catch((error) => {
            if (error.graphQLErrors) {
              error.graphQLErrors.forEach(({ message }) => {
                this.newToast({
                  type: "error",
                  message: message,
                });
              });
            }
          });
    },
    onReply() {
      this.isReply = true;
    },
    onCreateComment(e) {
      e.preventDefault();
      this.$apollo
        .mutate({
          mutation: CREATE_COMMENT_MUTATION,
          variables: {
            entryId: this.comment.entryId,
            description: this.description,
            commentImg: this.commentImg,
            commentId: this.comment.id,
          },
        })
        .then(({ data }) => {
          this.description = "";
          if (data.createComment?.result_code == 0) {
            this.$emit("onUpdateComment", data.createComment.data);
          }
        })
        .catch((error) => {
          if (error.graphQLErrors) {
            error.graphQLErrors.forEach(({ message }) => {
              this.newToast({
                type: "error",
                message: message,
              });
            });
          }
        });
    },
    onLoadmore(e) {
      e.preventDefault();
      this.$apollo
        .query({
          query: gql`
            query MyQuery(
              $commentId: Int!
              $entryId: Int!
              $currentPage: Int
              $limit: Int
              $sort: String
              $moduleId: Int
            ) {
              getSubComments(
                comment_id: $commentId
                entry_id: $entryId
                currentPage: $currentPage
                limit: $limit
                sort: $sort
                module_id: $moduleId
              ) {
                result_code
                data {
                  total
                  sort
                  limit
                  items {
                    actionStatus {
                      clip
                      follow
                      mute
                      reaction
                    }
                    id
                    entryId
                    createdTime
                    content
                    comments
                    commentId
                    reactions {
                      items {
                        id
                        icon
                        count
                        caption
                      }
                      total
                    }
                    user {
                      id
                      isAdmin
                      nickname
                      profileImg
                      title
                    }
                  }
                  currentPage
                }
              }
            }
          `,
          variables: {
            entryId: this.comment.entryId,
            commentId: this.comment.id,
            currentPage: this.comment.replies.currentPage + 1,
          },
        })
        .then(({ data }) => {
          this.description = "";
          if (data.getSubComments?.result_code == 0) {
            data.getSubComments.data.commentId = this.comment.id;
            this.$emit("onUpdateSubComment", data.getSubComments.data);
          }
        })
        .catch((error) => {
          if (error.graphQLErrors) {
            error.graphQLErrors.forEach(({ message }) => {
              this.newToast({
                type: "error",
                message: message,
              });
            });
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped></style>
