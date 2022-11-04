<template>
  <div
    data-csaction="clip"
    class="cs-button-response-d--clip"
    data-state="active"
    v-if="isClip"
    @click="onDelete"
  >
    クリップ
  </div>
  <div
    data-csaction="clip"
    class="cs-button-response-d--clip"
    v-else
    @click="onCreate"
  >
    クリップ
  </div>
</template>

<script>
import gql from "graphql-tag";
import commonMixins from "@/mixins/common";
import { CLIP_ENTRY_MUTATION } from "@/graphql/mutations"

export default {
  name: "EntryClip",
  mixins: [commonMixins],
  data() {
    return {};
  },
  props: {
    isClip: {
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
    updateClip: {
      type: Function,
    },
  },
  apollo: {},
  methods: {
    onCreate() {
      this.$apollo
        .mutate({
          mutation: CLIP_ENTRY_MUTATION,
          variables: {
            entryId: this.entryId,
            url: this.$route.path,
            caption: "",
            img: "",
          },
        })
        .then(({ data }) => {
          if (data.createEntryClip?.result_code == 0) {
            this.updateClip(true);
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
    onDelete() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation MyMutation(
              $entryId: Int!
              $userId: Int!
              $url: String!
              $caption: String
              $img: String
            ) {
              deleteEntryClip(
                input: {
                  entry_id: $entryId
                  user_id: $userId
                  url: $url
                  caption: $caption
                  img: $img
                }
              ) {
                result_code
              }
            }
          `,
          variables: {
            entryId: this.entryId,
            userId: this.userId,
            url: this.$route.path,
            caption: "",
            img: "",
          },
        })
        .then(({ data }) => {
          if (data.deleteEntryClip?.result_code == 0) {
            this.updateClip(false);
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

<style></style>
