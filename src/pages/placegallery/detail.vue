<template>
  <!-- start module-->
  <div class="pm-pla mt-10">
    <div class="cs-titlebar--type-c">
      <div class="cs-titlebar__inner">
        <div class="cs-titlebar__main">
          <div class="cs-titlebar__title-outer">
            <div class="cs-titlebar__title">体験発掘ノート</div>
          </div>
          <div class="cs-titlebar__nav-back">
            <a @click="goTo('placegallery-list')">&lt;</a>
          </div>
        </div>
      </div>
    </div>
    <div class="cs-container--type-a">
      <div class="cs-container__inner">
        <div class="cs-container__main">
          <div class="cs-pane">
            <div class="cs-pane__inner--c">
              <div class="pm-pla-detail__header">
                <div class="cs-avatar-2" v-if="entry.user">
                  <a
                    v-bind:style="{
                      'background-image': 'url(' + entry.user.profileImg + ')',
                    }"
                    class="cs-avatar-2__photo"
                  ></a>
                  <div class="cs-avatar-2__info">
                    <div class="cs-avatar-2__name-group">
                      <a href="#" class="cs-avatar-2__name">{{
                        entry.user.nickname
                      }}</a>
                    </div>
                    <div class="cs-avatar-2__opt">
                      {{ entry.createdTime | convertDateTime }}
                    </div>
                  </div>
                  <div class="cs-avatar-2__info">
                    <i class="cs-avatar-2__beginner"></i>
                  </div>
                </div>
                <div class="pm-pla-detail__header__right">
                  <EntryFollow
                    v-if="entry.actionStatus"
                    :isFollowing="entry.actionStatus.follow"
                    :updateFollowing="updateFollowing"
                    :userId="currentUser"
                    :followingUserId="entry.user.id"
                  ></EntryFollow>
                  <!-- Instagramのとき -->
                  <!-- classは、.cs-icn-sns--instagram -->
                </div>
              </div>
              <div class="pm-pla-detail__content">
                <div class="pm-pla-detail__content__body">
                  <div class="pm-pla-detail__content__photo-main">
                    <!-- <video
                      playsinline
                      muted
                      poster="/assets/images/IMG_2723_poster.jpg"
                      preload="metadata"
                    >
                      <source
                        src="/assets/images/IMG_2723.m4v"
                        type="video/mp4"
                      /></video> -->
                    <!-- 静止画のとき -->
                    <img :src="`${entry.thumbnail}`" alt="" />
                  </div>
                  <div class="pm-pla-detail__content__photo-list">
                    <div
                      class="pm-pla-detail__content__photo-item"
                      v-for="(image, index) in entry.medias"
                      :key="index"
                    >
                      <div
                        v-bind:style="{
                          'background-image': 'url(' + image + ')',
                        }"
                        data-target="#js-modal-pla"
                        data-csmodal="trigger"
                        data-slide="2"
                        class="pm-pla-detail__content__photo"
                      ></div>
                    </div>
                  </div>
                  <h5 class="ml-4">
                    {{ entry.caption }}
                  </h5>
                  <div
                    class="pm-pla-detail__content__text mt-4"
                    v-html="entry.description"
                  ></div>
                  <div class="pm-pla-detail__content__place" v-if="entry.spot">
                    <div class="pm-pla-detail__content__place__text">
                      <a href="#" class="cs-text--icon-location-spot"
                        >武甲山表参道 一の鳥居 駐車場</a
                      ><span>（埼玉県秩父郡横瀬町横瀬８５８２）</span>
                    </div>
                    <div class="pm-pla-detail__content__place__map-button">
                      <a href="https://goo.gl/maps/7AGKGUppZMN2" target="_blank"
                        >地図を見る</a
                      >
                    </div>
                  </div>
                  <div
                    class="pm-pla-detail__content__sns-note"
                    v-if="entry.curationSource"
                  >
                    Curated from<i class="cs-icn-sns--twitter--gray"></i>Twitter
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cs-pane">
            <div class="cs-pane__inner--a">
              <div class="pm-pla-detail__actions">
                <div class="cs-resp-set">
                  <div class="cs-resp-set__row">
                    <div class="cs-resp-set__left">
                      <div class="cs-resp-set__item">
                        <EntryPlus
                          v-if="entry.reactions"
                          :entry-id="entry.id"
                          :count="entry.reactions.total"
                          :reactions="entry.reactions.items"
                          :state-active="entry.actionStatus.reaction"
                          @onUpdate="onUpdateEntry"
                          show-text
                          class-content="cs-reaction-a"
                        ></EntryPlus>
                      </div>
                      <div class="cs-resp-set__item">
                        <EntryComment :count="entry.comment"></EntryComment>
                      </div>
                    </div>
                    <div class="cs-resp-set__right">
                      <div class="cs-resp-set__item">
                        <EntryClip
                          v-if="entry.actionStatus"
                          :isClip="entry.actionStatus.clip"
                          :updateClip="updateClip"
                          :entryId="entry.id"
                          :userId="1"
                        ></EntryClip>
                      </div>
                      <EntryMenus
                        :user-id="$auth.user.id"
                        :author-id="entry.user.id"
                        :entry-id="entry.id"
                      ></EntryMenus>
                    </div>
                  </div>
                </div>
                <EntryUserReactions
                  v-if="userReactions"
                  :users="userReactions"
                  :total="totalUserReactions"
                ></EntryUserReactions>
              </div>
            </div>
          </div>
          <EntrySns></EntrySns>
          <CommentBlock
            :total-comments="totalComments"
            :comments="comments"
            :entryId="entry.id"
            :userId="$auth.user.id"
            :loadmore="isLoadmoreComments"
            :current-page="currentPage"
            :limit="limitOfPage"
            :doAddComment="doAddComment"
            @onUpdateComment="onUpdateComment"
            @onUpdateSubComment="onUpdateSubComment"
            @onUpdateCommentLoadmore="onUpdateCommentLoadmore"
          ></CommentBlock>
        </div>
      </div>
    </div>
  </div>
  <!-- end module-->
</template>
<script>
import EntryPlus from "@/components/common/EntryPlus";
import EntryComment from "@/components/common/EntryComment";
import EntryClip from "@/components/common/EntryClip.vue";
import EntryMenus from "@/components/common/EntryMenus.vue";
import EntryUserReactions from "@/components/common/EntryUserReactions.vue";
import EntrySns from "@/components/common/EntrySns.vue";
import CommentBlock from "../../components/comments/CommentBlock.vue";
import EntryFollow from "@/components/common/EntryFollow.vue";
import commonMixins from "@/mixins/common";

import { getToken } from "@/utils/auth";
import { GET_COMMENT_ENTRY_QUERY, GET_ENTRY_QUERY } from "@/graphql/queries";

export default {
  name: "PlacegalleryDetail",
  mixins: [commonMixins],
  components: {
    EntryPlus,
    EntryComment,
    EntryClip,
    EntryMenus,
    EntryUserReactions,
    EntrySns,
    CommentBlock,
    EntryFollow,
  },
  data: () => ({
    entry: {},
    userReactions: [],
    totalUserReactions: 0,
    totalComments: 0,
    currentPage: 1,
    limitOfPage: 10,
    comments: [],
    isLoadmoreComments: false,
    entryId: null,
  }),
  apollo: {
    // getUserReactionsByEntryId: {
    //   query: gql`
    //     query MyQuery {
    //       getUserReactionsByEntryId(entry_id: 10) {
    //         data {
    //           current_page
    //           is_last
    //           total_count
    //         }
    //       }
    //     }
    //   `,
    //   update({ getUserReactionsByEntryId }) {
    //     this.userReactions = getUserReactionsByEntryId.data.user_reactions;
    //     this.totalUserReactions = getUserReactionsByEntryId.data.total_count;
    //   },
    //   error(error) {
    //     if (error.graphQLErrors) {
    //       error.graphQLErrors.forEach(({ message }) => {
    //         this.newToast({
    //           type: "error",
    //           message: message,
    //         });
    //       });
    //     }
    //   },
    // },
  },
  computed: {
    currentUser() {
      return this.$auth.user.id;
    },
  },
  methods: {
    goTo(name = null) {
      if (name) {
        return this.$router.push({ name });
      }
      this.$router.back();
    },
    updateClip(isClip) {
      this.entry.actionStatus.clip = isClip;
    },
    updateFollowing(isFollowing) {
      this.entry.actionStatus.follow = isFollowing;
    },
    doAddComment(comment) {
      this.comments.unshift({ ...comment });
    },
    onUpdateEntry(data) {
      if (data) {
        this.entry.reactions = data.reactions;
        this.entry.actionStatus.reaction = data.actionStatus.reaction;
      }
    },
    onUpdateComment(data) {
      this.comments.map((item) => {
        if ((item.id = data.commentId)) {
          item.replies.items.push(data);
        }
      });
    },
    onUpdateSubComment(data) {
      this.comments.map((comment) => {
        if (comment.id === data.commentId) {
          comment.replies.currentPage = data.currentPage;
          comment.replies.items = comment.replies.items.concat(data.items);
        }
      });
    },
    onUpdateCommentLoadmore(data) {
      this.comments = this.comments.concat(data.items);
      this.currentPage = data.currentPage;
    },
    getEntryById(entryId) {
      this.setLoading(true);
      this.$apollo
        .query({
          query: GET_ENTRY_QUERY,
          variables: {
            currentPage: 1,
            entryId: entryId,
            limit: 10,
            sort: "new",
            userId: 213,
          },
          update: () => {},
          error(error) {
            console.log(error);
          },
        })
        .then(({ data }) => {
          if(data.getEntryById.result_code == 1){
            this.$router.push({ name: 'placegallery-list'})
          }
          else{
            this.entry = data.getEntryById.data;
          }
          this.setLoading(false);
        })
        .catch(({ graphQLErrors, networkError }) => {
          this.setLoading(false);
          setTimeout(() => {
            if (graphQLErrors) {
              graphQLErrors.forEach(({ message }) => {
                this.newToast({
                  type: "error",
                  message: message,
                });
              });
            }
            if (networkError) {
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
    getCommentByEntryId(entryId) {
      this.setLoading(true);
      this.$apollo
        .query({
          query: GET_COMMENT_ENTRY_QUERY,
          variables: {
            page: 1,
            entryId: entryId,
            limit: 10,
            sort: "new",
            userId: 213,
          },
          update: ({ getCommentsByEntryId }) => {
            console.log(getCommentsByEntryId);
          },
          error(error) {
            console.log(error);
          },
        })
        .then(({ data }) => {
          this.comments = data.getCommentsByEntryId.data.items;
          this.totalComments = data.getCommentsByEntryId.data.total;
          this.currentPage = data.getCommentsByEntryId.data.currentPage;
          this.limitOfPage = data.getCommentsByEntryId.data.limit;
          this.setLoading(false);
        })
        .catch(({ graphQLErrors, networkError }) => {
          this.setLoading(false);
          setTimeout(() => {
            if (graphQLErrors) {
              graphQLErrors.forEach(({ message }) => {
                this.newToast({
                  type: "error",
                  message: message,
                });
              });
            }
            if (networkError) {
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
    isNumeric(str) {
      if (typeof str != "string") return false 
      return !isNaN(str) &&  !isNaN(parseFloat(str))
    }
  },
  created() {
    const timeDelay = getToken ? 0 : 2000;
    setTimeout(() => {
      this.getEntryById(this.$route.params.id);
      this.getCommentByEntryId(this.$route.params.id);
    }, timeDelay);
  },
};
</script>
<style lang="scss"></style>
