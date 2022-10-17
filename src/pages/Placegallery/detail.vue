<template>
  <!-- start module-->
  <div class="pm-pla">
    <div class="cs-titlebar--type-c">
      <div class="cs-titlebar__inner">
        <div class="cs-titlebar__main">
          <div class="cs-titlebar__title-outer">
            <div class="cs-titlebar__title">体験発掘ノート</div>
          </div>
          <div class="cs-titlebar__nav-back"><a href="#">&lt;</a></div>
        </div>
      </div>
    </div>
    <div class="cs-container--type-a">
      <div class="cs-container__inner">
        <div class="cs-container__main">
          <div class="cs-pane">
            <div class="cs-pane__inner--c">
              <div class="pm-pla-detail__header">
                <div class="cs-avatar-2">
                  <a
                    href="#"
                    v-bind:style="{
                      'background-image': 'url(' + entry.user.profile_img + ')',
                    }"
                    class="cs-avatar-2__photo"
                  ></a>
                  <div class="cs-avatar-2__info">
                    <div class="cs-avatar-2__name-group">
                      <a href="#" class="cs-avatar-2__name">{{
                        entry.user.nickname
                      }}</a>
                    </div>
                    <div class="cs-avatar-2__opt">{{ entry.created }}</div>
                  </div>
                  <div class="cs-avatar-2__info">
                    <i class="cs-avatar-2__beginner"></i>
                  </div>
                </div>
                <div class="pm-pla-detail__header__right">
                  <div
                    data-csaction="follow"
                    data-id="12345"
                    class="cs-button-follow-a"
                  >
                    フォロー
                  </div>
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
                    <img :src="`${entry.img}`" alt="" />
                  </div>
                  <div class="pm-pla-detail__content__photo-list">
                    <div
                      class="pm-pla-detail__content__photo-item"
                      v-for="(image, index) in images"
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
                  <div class="pm-pla-detail__content__text">
                    {{ entry.caption }}
                  </div>
                  <!-- <div class="pm-pla-detail__content__place">
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
                  <div class="pm-pla-detail__content__sns-note">
                    Curated from<i class="cs-icn-sns--twitter--gray"></i>Twitter
                  </div> -->
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
                        <div class="cs-response-c cs-reaction-a">
                          <div
                            data-csreaction="container"
                            data-cslike-id="3456"
                            class="cs-reaction-a-container"
                          >
                            <div
                              data-csreaction="button"
                              class="cs-response-c__button--like"
                            >
                              <i
                                data-csreaction="button-icon"
                                class="cs-response-c__icon--medium"
                              ></i
                              ><span
                                data-cslike-counter="3456"
                                class="cs-response-c__counter"
                                >{{ entry.num_good }}</span
                              ><span
                                data-csreaction="button-label"
                                class="cs-response-c__label"
                                >いいね！</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="cs-resp-set__item">
                        <div class="cs-response-c">
                          <div class="cs-response-c__button--comment">
                            <i class="cs-response-c__icon--medium"></i
                            ><span class="cs-response-c__counter">{{
                              entry.num_comment
                            }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="cs-resp-set__right">
                      <div class="cs-resp-set__item">
                        <div
                          data-csaction="clip"
                          data-url="https://www.elife.co.jp/"
                          data-caption="マーケティング戦略立案から実行のイーライフ"
                          data-img="https://www.elife.co.jp/images/header_logo_01.png"
                          class="cs-button-response-d--clip"
                        >
                          クリップ
                        </div>
                      </div>
                      <div data-csdropdown="menu" class="cs-context-menu">
                        <div
                          data-csdropdown="trigger"
                          class="cs-context-menu__trigger"
                        ></div>
                        <div
                          data-csdropdown="content"
                          data-align="right"
                          class="cs-context-menu__content"
                        >
                          <ul class="cs-context-menu__items">
                            <li class="cs-context-menu__item">
                              <a href="#" class="cs-context-menu__link"
                                >編集する</a
                              >
                            </li>
                            <li class="cs-context-menu__item">
                              <a
                                href="#"
                                data-csmodal="trigger"
                                data-target="#js-modal-delete-9999999"
                                class="
                                  cs-context-menu__link cs-context-menu__link
                                "
                                >削除する</a
                              >
                            </li>
                            <li class="cs-context-menu__item">
                              <a href="#" class="cs-context-menu__link"
                                >報告する</a
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div
                        id="js-modal-delete-9999999"
                        class="cs-modal-delete-post"
                      >
                        <div class="cs-modal-delete-post__content">
                          <p class="cs-modal-delete-post__title">
                            この投稿を削除してもよろしいですか？
                          </p>
                          <p class="cs-modal-delete-post__body">
                            一度削除すると元に戻すことはできません。
                          </p>
                          <span
                            data-csmodal="hide"
                            onclick="return false;"
                            class="cs-button-b--1-m"
                            >キャンセル</span
                          >&nbsp;&nbsp;<span
                            onclick="location.href='#'"
                            class="cs-button-a--1-m"
                            >削除する</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cs-liked-list">
                  <div class="cs-liked-list__header">
                    <span data-cslike-counter="12345">{{
                      totalUserReactions
                    }}</span
                    >人のメンバーがいいね！と言ってます
                  </div>
                  <ul
                    data-csmodal="trigger"
                    data-target="#js-modal-cs-liked-reaction-list"
                    class="cs-liked-list__members cs-reaction-list-a"
                    v-if="userReactions"
                  >
                    <li
                      v-for="(user, index) in userReactions"
                      :key="index"
                      v-bind:style="{
                        'background-image': 'url(' + user.profile_img + ')',
                      }"
                      class="cs-liked-list__avatar"
                    >
                      <i
                        data-csreaction-icon="3"
                        class="cs-button-reaction-a__icon"
                      ></i>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="cs-pane">
            <div class="cs-pane__inner--b">
              <div class="pm-pla-detail__share">
                <div class="cs-sns-share">
                  <div class="cs-sns-share__header">
                    <div class="cs-sns-share__lead">シェアしよう！</div>
                  </div>
                  <ul class="cs-sns-share__buttons">
                    <li class="cs-sns-share__item">
                      <a href="#" class="cs-button-sns--facebook"></a>
                    </li>
                    <li class="cs-sns-share__item">
                      <a href="#" class="cs-button-sns--twitter"></a>
                    </li>
                    <li class="cs-sns-share__item">
                      <a href="#" class="cs-button-sns--line"></a>
                    </li>
                    <li class="cs-sns-share__item">
                      <a href="#" class="cs-button-sns--pinterest"></a>
                    </li>
                    <li class="cs-sns-share__item">
                      <a href="#" class="cs-button-sns--hatena"></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="cs-pane">
            <div class="cs-pane__inner--a">
              <div class="pm-pla-detail__comments">
                <div class="pm-pla-detail__comments__title">コメント</div>
                <!-- コメント ブロック-->
                <!-- ソート機能-->
                <!-- 上にコメントフォーム data-cscmt-order="top"-->
                <!-- 下にコメントフォーム data-cscmt-order="bottom"-->
                <div data-cscmt="root" data-cscmt-order="top" class="cs-cmt">
                  <CommentForm :total-comments="totalComments"></CommentForm>
                  <CommentList :comments="comments" :loadmore="isLoadmoreComments"></CommentList>
                </div>
                <!-- / コメント ブロック-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- end module-->
</template>
<script>
import CommentList from "@/components/comments/CommentList.vue";
import CommentForm from "@/components/comments/CommentForm.vue";

import gql from "graphql-tag";
export default {
  name: "PlacegalleryDetail",
  components: { CommentForm, CommentList },
  data: () => ({
    model: 0,
    colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
  }),
  apollo: {
    getEntryById: gql`
      query MyQuery {
        getEntryById(id: 10) {
          data {
            caption
            category_l_id
            created
            id
            img
            description
            img2
            img3
            img5
            img4
            num_view
            num_good
            num_comment
            module_type
            module_id
            module_entry_id
            is_clip
            img_thumbnail
            is_following
            tag
            user {
              profile_img
              nickname
              introduction
              gender
              email
              birthday
              id
            }
            user_id
          }
        }
      }
    `,
    getUserReactionsByEntryId: gql`
      query MyQuery {
        getUserReactionsByEntryId(entry_id: 10) {
          data {
            current_page
            is_last
            total_count
            user_reactions {
              profile_img
              id
            }
          }
        }
      }
    `,
    getCommentsByEntryId: gql`
      query MyQuery {
        getCommentsByEntryId(
          entry_id: 10
          limit: 10
          page: 10
          user_id: 10
          sort: ""
        ) {
          data {
            total_count
            is_last
            current_page
            comments {
              num_good
              num_comment
              img2
              img
              id
              entry_id
              description
              created
              comment_id
              caption
              user_id
              user {
                nickname
                id
                profile_img
                created
              }
            }
          }
        }
      }
    `,
  },
  computed: {
    entry() {
      return this.getEntryById?.data ? this.getEntryById.data : [];
    },
    images() {
      let images = [];
      // if (this.entry.img) images.push(this.entry.img);
      if (this.entry.img2) images.push(this.entry.img2);
      if (this.entry.img3) images.push(this.entry.img3);
      if (this.entry.img4) images.push(this.entry.img4);
      if (this.entry.img5) images.push(this.entry.img5);
      return images;
    },
    userReactions() {
      return this.getUserReactionsByEntryId?.data?.user_reactions
        ? this.getUserReactionsByEntryId.data.user_reactions
        : [];
    },
    totalUserReactions() {
      return this.getUserReactionsByEntryId?.data?.total_count
        ? this.getUserReactionsByEntryId.data.total_count
        : 0;
    },
    totalComments() {
      return this.getCommentsByEntryId?.data?.total_count
        ? this.getCommentsByEntryId.data.total_count
        : 0;
    },
    comments() {
      return this.getCommentsByEntryId?.data?.comments
        ? this.getCommentsByEntryId.data.comments
        : [];
    },
    isLoadmoreComments(){
      return this.getCommentsByEntryId?.data?.is_last
        ? this.getCommentsByEntryId.data.is_last
        : false;
    }
  },
};
</script>
<style lang="scss"></style>
