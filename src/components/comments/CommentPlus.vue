<template>
  <div class="cs-reaction-a">
    <div
      class="cs-response-a__button--like"
      style="margin-right: 15px"
      @click="showReaction"
    >
      <i class="cs-response-a__icon--small"></i
      ><span class="cs-response-a__counter">{{ count }}</span
      ><span class="cs-response-a__label">いいね</span>
    </div>
    <div
      data-csreaction="menu"
      class="cs-button-reaction-a"
      v-if="isShowReaction && reactions.length"
    >
      <div
        class="cs-button-reaction-a__outer"
        v-click-outside="onClickOutside"
      >
        <div class="cs-button-reaction-a__inner">
          <div class="cs-button-reaction-a__button-layer">
            <span
              data-csreaction-type="1"
              class="cs-button-reaction-a__item"
              v-for="(reaction, index) in reactions"
              :key="index"
              @click="onCreate"
            >
              <i
                :data-csreaction-icon="reaction.id"
                class="cs-button-reaction-a__icon"
              ></i>
              <span
                data-csreaction="label"
                class="cs-button-reaction-a__emot"
                >{{ reaction.caption }}</span
              ></span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import commonMixins from "@/mixins/common";
export default {
  name: "CommentPlus",
  mixins: [commonMixins],
  data() {
    return {
      isShowReaction: false,
    };
  },
  props: {
    count: {
      default: () => 0,
    },
    classContent: {
      type: String,
      default: () => "",
    },
    showText: {
      type: Boolean,
      default: () => false,
    },
    commentId: {
      type: Number,
      default: () => 0,
    },
    userId: {
      type: Number,
      default: () => 0,
    },
    reactions: {
      type: Array,
      default: () => [],
    },
  },
  apollo: {},
  methods: {
    onCreate() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation MyMutation(
              $commentId: Int!
              $reactionId: Int!
              $userId: Int!
            ) {
              createCommentPlus(
                input: {
                  comment_id: $commentId
                  reaction_id: $reactionId
                  user_id: $userId
                }
              ) {
                result_code
                data {
                  num_good
                  reactions {
                    caption
                    id
                    img
                    is_like
                    num_reaction
                  }
                }
              }
            }
          `,
          variables: {
            commentId: 1,
            reactionId: 1,
            userId: 1,
          },
          update: () => {},
        })
        .then((data) => {
          this.$emit("onReaction", data);
          this.isShowReaction = false;
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
    showReaction() {
      this.isShowReaction = true;
    },
    onClickOutside() {
      this.isShowReaction = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
