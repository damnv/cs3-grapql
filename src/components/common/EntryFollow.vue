<template>
  <div v-if="userId != followingUserId">
    <div
      class="cs-button-follow-a"
      data-state="active"
      v-if="isFollowing"
      @click="onUnFollow"
    >
      フォロー解除
    </div>
    <div class="cs-button-follow-a" v-else @click="onFollow">フォロー</div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import commonMixins from "@/mixins/common";

export default {
  name: "EntryFollow",
  mixins: [commonMixins],
  data() {
    return {};
  },
  props: {
    isFollowing: {
      type: Boolean,
      default: () => false,
    },
    followingUserId: {
      type: Number,
      default: () => 0,
    },
    userId: {
      type: Number,
      default: () => 0,
    },
    updateFollowing: {
      type: Function,
    },
  },
  methods: {
    onFollow() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation MyMutation($followingUserId: Int!, $userId: Int!) {
              createUserFollow(
                following_user_id: $followingUserId
                user_id: $userId
              ) {
                result_code
              }
            }
          `,
          variables: {
            followingUserId: this.followingUserId,
            userId: this.userId,
          },
        })
        .then(({ data }) => {
          if (data.createUserFollow?.result_code == 0) {
            this.updateFollowing(true);
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
    onUnFollow() {
      console.log(this.followingUserId, this.userId);
      this.$apollo
        .mutate({
          mutation: gql`
            mutation MyMutation($followingUserId: Int!, $userId: Int!) {
              deleteUserFollow(
                following_user_id: $followingUserId
                user_id: $userId
              ) {
                result_code
              }
            }
          `,
          variables: {
            followingUserId: this.followingUserId,
            userId: this.userId,
          },
        })
        .then(({ data }) => {
          if (data.deleteUserFollow?.result_code == 0) {
            this.updateFollowing(false);
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
