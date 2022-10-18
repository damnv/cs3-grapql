<template>
  <div class="cs-response-c cs-reaction-a" :class="classContent">
    <div data-csreaction="container" class="cs-reaction-a-container">
      <div
        data-csreaction="button"
        class="cs-response-c__button--like"
        @click="showReaction"
      >
        <i data-csreaction="button-icon" class="cs-response-c__icon--medium"></i
        ><span data-cslike-counter="12345" class="cs-response-c__counter">{{
          count
        }}</span
        ><span
          data-csreaction="button-label"
          v-if="showText"
          class="cs-response-c__label"
          >いいね！</span
        >
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
  </div>
</template>

<script>
import gql from "graphql-tag";
import commonMixins from "@/mixins/common";
export default {
  name: "EntryPlus",
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
    entryId: {
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
              $entryId: Int!
              $reactionId: Int!
              $userId: Int!
            ) {
              createEntryPlus(
                input: {
                  entry_id: $entryId
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
            entryId: 1,
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
