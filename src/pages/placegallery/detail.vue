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
                    :followingUserId="entry.userId"
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
                  <div class="pm-pla-detail__content__text mt-4">
                    {{ entry.description }}
                  </div>
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
                          :count="entry.reactions.total"
                          :reactions="entry.reactions.items"
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
                      <EntryMenus></EntryMenus>
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
            :userId="currentUser"
            :loadmore="isLoadmoreComments"
            :doAddComment="doAddComment"
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

import gql from "graphql-tag";
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
    currentUser: 1,
    userReactions: [],
    totalUserReactions: 0,
    totalComments: 0,
    comments: [],
    isLoadmoreComments: false,
    entryId: null,
  }),
  apollo: {
    getEntryById: {
      query: gql`
        query MyQuery($entryId: Int!) {
          getEntryById(id: $entryId) {
            data {
              actionStatus {
                clip
                follow
                reaction
                mute
              }
              caption
              comment
              createdTime
              curationSource
              description
              id
              view
              user {
                isAdmin
                id
                nickname
                profileImg
                title
              }
              tags
              thumbnail
              reactions {
                total
                items {
                  caption
                  count
                  icon
                  id
                }
              }
              spot {
                city
                country
                name
                region
                street
              }
              module {
                alias
                caption
                id
              }
              medias {
                type
                url
              }
            }
            result_code
          }
        }
      `,
      variables: () => {
        return {
          entryId: "3123",
        };
      },
      update({ getEntryById }) {
        this.entry = getEntryById.data;
      },
      error(error) {
        if (error.graphQLErrors) {
          error.graphQLErrors.forEach(({ message }) => {
            this.newToast({
              type: "error",
              message: message,
            });
          });
        }
      },
    },
    getUserReactionsByEntryId: {
      query: gql`
        query MyQuery {
          getUserReactionsByEntryId(entry_id: 10) {
            data {
              current_page
              is_last
              total_count
            }
          }
        }
      `,
      update({ getUserReactionsByEntryId }) {
        this.userReactions = getUserReactionsByEntryId.data.user_reactions;
        this.totalUserReactions = getUserReactionsByEntryId.data.total_count;
      },
      error(error) {
        if (error.graphQLErrors) {
          error.graphQLErrors.forEach(({ message }) => {
            this.newToast({
              type: "error",
              message: message,
            });
          });
        }
      },
    },
    getCommentsByEntryId: {
      query: gql`
        query MyQuery {
          getCommentsByEntryId(
            currentPage: 10
            entry_id: 10
            limit: 10
            sort: ""
            user_id: 10
          ) {
            data {
              currentPage
              items {
                actionStatus {
                  clip
                  follow
                  mute
                  reaction
                }
                commentId
                content
                createdTime
                entryId
                id
                user {
                  title
                  profileImg
                  nickname
                  isAdmin
                  id
                }
                replies {
                  total
                  limit
                  sort
                  currentPage
                  items {
                    id
                    entryId
                    createdTime
                    content
                    comments
                    commentId
                    reactions {
                      total
                      items {
                        id
                        icon
                        count
                        caption
                      }
                    }
                    user {
                      profileImg
                      title
                      nickname
                      isAdmin
                      id
                    }
                  }
                }
                reactions {
                  total
                  items {
                    id
                    icon
                    count
                    caption
                  }
                }
                medias {
                  url
                  type
                }
              }
              total
              sort
              limit
            }
            result_code
          }
        }
      `,
      update({ getCommentsByEntryId }) {
        this.comments = getCommentsByEntryId.data.items;
        this.totalComments = getCommentsByEntryId.data.total;
      },
      error(error) {
        if (error.graphQLErrors) {
          error.graphQLErrors.forEach(({ message }) => {
            this.newToast({
              type: "error",
              message: message,
            });
          });
        }
      },
    },
  },
  computed: {},
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
      entry.reactions = data.reaction;
      entry.actionStatus.reaction = data.actionStatus.reaction;
    },
  },
  created() {
    this.entryId = this.$route.params.id;
  },
};
</script>
<style lang="scss"></style>
