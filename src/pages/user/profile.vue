<template>
  <div class="pm-usr-2">
    <div class="cs-titlebar--type-c">
      <div class="cs-titlebar__inner">
        <div class="cs-titlebar__main">
          <div class="cs-titlebar__title-outer">
            <div class="cs-titlebar__title">プロフィール</div>
          </div>
          <div class="cs-titlebar__nav-back"><a href="#">&lt;</a></div>
        </div>
      </div>
    </div>
    <div class="cs-container--type-c">
      <div class="cs-container__inner">
        <div class="cs-container__main">
          <UserInfomation></UserInfomation>
          <UserActivity
            :entries="entries"
            :loadmore="isLoadmore"
            :total="totalCount"
          ></UserActivity>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_ENTRIES_USER_QUERY } from '@/graphql/queries';
import UserInfomation from "../../components/user/UserInfomation.vue";
import UserPoint from "../../components/user/UserPoint.vue";
import UserBadge from "../../components/user/UserBadge.vue";
import UserClip from "../../components/user/UserClip.vue";
import UserHistory from "../../components/user/UserHistory.vue";
import UserActivity from "../../components/user/UserActivity.vue";
import commonMixins from "@/mixins/common";
export default {
  name: "UserHome",
  mixins: [commonMixins],
  data() {
    return {
      entries: [],
      totalCount: 0,
      limit: 9,
      currentPage: 1,
      sort: "",
      userId: parseInt(this.$route.params.id),
    };
  },
  components: {
    UserInfomation,
    UserPoint,
    UserBadge,
    UserClip,
    UserHistory,
    UserActivity,
  },
  computed: {
    isLoadmore() {
      return (this.limit * this.currentPage) < this.totalCount;
    }
  },
  apollo: {},
  methods: {
    getData() {
      this.$apollo
        .query({
          query: GET_ENTRIES_USER_QUERY,
          variables: {
            limit: this.limit,
            page: this.currentPage,
            sort: this.sort,
            user_id: this.userId,
          }
        })
        .then(({ data }) => {
          this.entries = data.getEntriesByUserId.data.items;
          this.totalCount = data.getEntriesByUserId.data.total;
        })
        .catch(({ graphQLErrors, networkError }) => {
          setTimeout(() => {
            if (graphQLErrors) {
              graphQLErrors.forEach(({ message }) => {
                this.newToast({
                  type: "error",
                  message: message,
                });
              });
            }
            if (networkError?.result?.errors) {
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
  created() {
    if (!this.$auth.user) {
      this.$router.push({ name: "home" });
    }
    this.getData();
  },
};
</script>

<style></style>
