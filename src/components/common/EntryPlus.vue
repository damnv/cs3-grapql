<template>
  <div class="cs-response-c cs-reaction-a" :class="classContent">
    <div data-csreaction="container" class="cs-reaction-a-container">
      <div
        data-csreaction="button"
        class="cs-response-c__button--like"
        @click="showReaction"
      >
        <i
          data-csreaction="button-icon"
          v-if="!reactionActive"
          class="cs-response-c__icon--medium"
        ></i>
        <i
          data-csreaction="button-icon"
          v-else
          v-bind:style="{
            'background-image': 'url(' + reactionActive.icon + ') !important',
          }"
          class="cs-response-c__icon--medium"
        ></i
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
                @click="handleReaction(reaction.id)"
              >
                <i
                  v-bind:style="{
                    'background-image': 'url(' + reaction.icon + ') !important',
                  }"
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
import commonMixins from "@/mixins/common";
import {
  CREATE_ENTRY_PLUS_MUTATION,
  DELETE_ENTRY_PLUS_MUTATION,
} from "@/graphql/mutations";

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
    stateActive: {
      type: String,
      default: () => "",
    },
  },
  apollo: {},
  computed: {
    reactionActive() {
      let reaction;
      this.reactions.forEach((item) => {
        if (item.id == this.stateActive) reaction = item;
      });
      return reaction;
    },
  },
  methods: {
    onCreate(reactionId) {
      this.$apollo
        .mutate({
          mutation: CREATE_ENTRY_PLUS_MUTATION,
          variables: {
            entryId: this.entryId,
            reactionId: reactionId,
          },
          update: () => {},
        })
        .then(({ data }) => {
          let entry = {};
          entry.actionStatus = data.createEntryPlus.data.actionStatus;
          entry.reactions = data.createEntryPlus.data.reactions;
          entry.id = this.entryId;
          this.$emit("onUpdate", entry);
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
    onDelete() {
      this.$apollo
        .mutate({
          mutation: DELETE_ENTRY_PLUS_MUTATION,
          variables: {
            entryId: this.entryId,
          },
          update: () => {},
        })
        .then(({ data }) => {
          let entry = {};
          entry.actionStatus = data.deleteEntryPlus.data.actionStatus;
          entry.reactions = data.deleteEntryPlus.data.reactions;
          entry.id = this.entryId;
          this.$emit("onUpdate", entry);
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
    handleReaction(reactionId) {
      if (this.reactionActive && this.stateActive == reactionId) {
        this.onDelete();
      } else {
        this.onCreate(reactionId);
      }
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
