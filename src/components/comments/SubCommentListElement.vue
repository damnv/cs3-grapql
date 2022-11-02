<template>
  <li class="cs-cmt-subitem fx-fade fx-in" id="27715">
    <div class="cs-cmt-subitem__header">
      <div class="cs-cmt-menu">
        <EntryMenus hidden-edit hidden-report is-custom-delete :customDetele="customDetele"></EntryMenus>
      </div>
      <div class="cs-cmt-subitem__header-author">
        <a href="/user/profile/27555/" class="cs-avatar--black">
          <div
            v-bind:style="{
              'background-image': 'url(' + reply.user.profileImg + ')',
            }"
            class="cs-avatar-2__photo"
          ></div>
          <div class="cs-avatar__name">{{ reply.user.nickname }}</div>
        </a>
      </div>
      <div class="cs-cmt-subitem__header-date">
        {{ reply.createdTime | convertDateTime }}
      </div>
    </div>
    <div class="cs-cmt-subitem__content">
      <div class="cs-cmt-subitem__body">{{ reply.content }}</div>
      <div class="cs-cmt-item__res">
        <div class="cs-response-a d-flex">
          <CommentPlus
            v-if="reply.id"
            :count="reply.reactions.total"
            :reactions="reply.reactions.items"
          ></CommentPlus>
          <div data-csaction="comment" class="cs-response-a__button--comment">
            <i class="cs-response-a__icon--small"></i>
            <span class="cs-response-a__counter"></span>
            <span class="cs-response-a__label" @click="onReply">返信する</span>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import CommentPlus from "./CommentPlus.vue";
import EntryMenus from "../common/EntryMenus.vue";
import commonMixins from "@/mixins/common";

import { DELETE_COMMENT_MUTATION } from "@/graphql/mutations";


export default {
  name: "SubCommentListElement",
  mixins: [ commonMixins ],
  data() {
    return {};
  },
  props: {
    reply: Object,
  },
  computed: {},
  methods: {
    onReply() {
      this.$emit("onReply");
    },
    customDetele() {
      this.$apollo
          .mutate({
            mutation: DELETE_COMMENT_MUTATION,
            variables: {
              id: this.reply.id,
              accessToken: '',
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
  },
  components: { CommentPlus, EntryMenus },
};
</script>
<style lang="scss" scoped></style>
