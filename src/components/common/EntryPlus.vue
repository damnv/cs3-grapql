<template>
  <div class="cs-response-c" :class="classContent" @click="onCreate">
    <div class="cs-response-c__button--like">
      <v-icon size="20">$likeBlue</v-icon>
      ><span data-cslike-counter="12345" class="cs-response-c__counter">{{
        count
      }}</span>
      <span
        v-if="showText"
        data-csreaction="button-label"
        class="cs-response-c__label"
        >いいね！</span
      >
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "EntryPlus",
  data() {
    return {};
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
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
