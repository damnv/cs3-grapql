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
          <UserPoint></UserPoint>
          <UserBadge></UserBadge>
          <UserClip :entries="dataMockup"></UserClip>
          <UserHistory :entries="dataMockup"></UserHistory>
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
import gql from "graphql-tag";
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
      dataMockup: [
        {
          img: "http://placeimg.com/300/300/nature",
          caption: "みんなが発掘した世界遺産に推薦するべき10のスポット",
        },
        {
          img: "http://placeimg.com/300/300/nature",
          caption: "みんなが発掘した世界遺産に推薦するべき10のスポット",
        },
        {
          img: "http://placeimg.com/300/300/nature",
          caption: "みんなが発掘した世界遺産に推薦するべき10のスポット",
        },
      ],
      entries: [],
      totalCount: 0,
      isLoadmore: false,
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
  apollo: {},
  methods: {
    getData() {
      this.$apollo
        .query({
          query: gql`
            query MyQuery {
              getEntriesByUserId(user_id: 10) {
                result_code
                data {
                  current_page
                  is_last
                  total_count
                  entries {
                    caption
                    created
                    num_view
                    num_good
                    num_comment
                    module_type
                    id
                    img
                    user {
                      nickname
                      profile_img
                    }
                  }
                }
              }
            }
          `,
        })
        .then(({ data }) => {
          this.entries = data.getEntriesByUserId.data.entries;
          this.totalCount = data.getEntries.data.total_count;
          this.isLoadmore = data.getEntries.data.is_last;
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
