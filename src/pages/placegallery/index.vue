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
    <div class="cs-container--type-c">
      <div class="cs-container__inner">
        <div class="cs-container__main">
          <div class="cs-pane">
            <div class="pm-pla-mainvisual">
              <img src="https://via.placeholder.com/1600x640" />
            </div>
          </div>
          <div class="cs-pane">
            <div class="cs-pane__inner--a">
              <div class="pm-pla-promote">
                <div class="pm-pla-promote__text">
                  <div class="pm-ita-promote__text__catch">
                    あなたの体験を教えて！
                  </div>
                  訪れた場所、お店、出逢った人、食べたもの…<br />あなたしか知らない体験やスト―リーを投稿してみよう！
                </div>
                <a @click="onCreate" class="pm-pla-promote__button white--text"
                  ><i class="pm-pla-promote__button-icon"></i
                  >体験発掘ノートに投稿する</a
                >
                <div class="pm-ita-promote__text">
                  <a href="#" target="_blank">※SNSからも投稿できます！</a>
                </div>
              </div>
            </div>
          </div>
          <div class="cs-pane">
            <div class="cs-pane__inner--a">
              <div class="pm-pla-list">
                <h2 class="pm-pla-list__title">みんなの投稿</h2>
                <div class="pm-pla-list__count">{{ totalCount }}件</div>
                <div class="pm-pla-list__header">
                  <div class="cs-nav-a">
                    <ul class="cs-nav-a__list">
                      <li class="cs-nav-a__item">
                        <a href="#" class="cs-nav-a__link is-active">新着</a>
                      </li>
                      <li class="cs-nav-a__item">
                        <a href="#" class="cs-nav-a__link">人気</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  data-cscomments="root"
                  id="js-pla-list"
                  class="pm-pla-list__items-container"
                >
                  <div
                    data-cscomments="container"
                    class="pm-pla-list__items"
                    v-if="entries"
                  >
                    <div
                      data-cshistory-id="1"
                      class="pm-pla-list-item"
                      v-for="(entry, index) in entries"
                      :key="index"
                    >
                      <div class="pm-pla-list-item__header">
                        <div class="cs-avatar-2" v-if="entry.user">
                          <a
                            href="#"
                            v-bind:style="{
                              'background-image':
                                'url(' + entry.user.profileImg + ')',
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
                              {{ entry.createdTime }}
                            </div>
                          </div>
                          <div class="cs-avatar-2__info">
                            <i class="cs-avatar-2__beginner"></i>
                          </div>
                        </div>
                        <EntryMenus
                          class-content="pm-pla-list-item__header-right"
                        ></EntryMenus>
                      </div>
                      <router-link
                        :to="{
                          name: 'placegallery-detail',
                          params: { id: entry.id },
                        }"
                        class="pm-pla-list-item__image-link"
                      >
                        <div
                          class="pm-pla-list-item__image-list pm-pla-list-item__image-list--items-1"
                        >
                          <div
                            v-bind:style="{
                              'background-image':
                                'url(' + entry.thumbnail + ')',
                            }"
                            class="pm-pla-list-item__image"
                          ></div>
                          <!-- <div
                            style="background-color: #000"
                            class="pm-pla-list-item__image cs-video-mark"
                          >
                            <video preload="metadata">
                              <source
                                src="https://scontent.xx.fbcdn.net/v/t50.2886-16/51251245_774001676291783_386732990069211136_n.mp4?_nc_cat=109&amp;_nc_ht=scontent.xx&amp;oh=d8f70ed43cecf5b566f00fcc5e4a8898&amp;oe=5CB28AD2"
                                type="video/mp4"
                              />
                            </video>
                          </div> -->
                        </div></router-link
                      ><router-link
                        :to="{
                          name: 'placegallery-detail',
                          params: { id: entry.id },
                        }"
                        class="pm-pla-list-item__text-link"
                      >
                        <div class="pm-pla-list-item__text">
                          {{ entry.caption }}
                        </div></router-link
                      >
                      <!-- <div class="pm-pla-list-item__location">
                        <a href="#" class="pm-pla-list-item__location-spot"
                          >居酒屋かやぶき</a
                        ><a href="#" class="pm-pla-list-item__location-area"
                          >栃木県宇都宮市</a
                        >
                      </div> -->
                      <div class="pm-pla-list-item__response-group">
                        <div class="pm-pla-list-item__response-group-left">
                          <EntryPlus
                            v-if="entry.reactions"
                            :count="entry.reactions.total"
                            :reactions="entry.reactions.items"
                            :user-id="entry.user.id"
                            :entry-id="entry.id"
                            :state-active="entry.actionStatus.reaction"
                            @onUpdate="onUpdateEntry"
                          ></EntryPlus>
                          <EntryComment :count="entry.comment"></EntryComment>
                        </div>
                        <div class="pm-pla-list-item__response-group-right">
                          <EntryView :count="entry.view"></EntryView>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="pm-pla-list__button-more" v-if="isLoadmore">
                    <div
                      data-cscomments="indicator"
                      class="pm-pla-list__button-more__indicator is-hidden"
                    >
                      <div class="cs-spinner-a--m">読み込み中</div>
                    </div>
                    <div
                      data-cscomments="trigger"
                      data-api-query="{&amp;quot;hoge&amp;quot;:&amp;quot;test&amp;quot;, &amp;quot;fuga&amp;quot;: &amp;quot;fugafuga&amp;quot;}"
                      class="cs-button-b--3-xl cs-button--w-100p"
                    >
                      もっと見る
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Post v-if="isCreate" @onClose="onClose" @onChangeData="getData"></Post>
  </div>
  <!-- end module-->
</template>
<script>
import gql from "graphql-tag";
import commonMixins from "@/mixins/common";
import EntryPlus from "@/components/common/EntryPlus";
import EntryComment from "@/components/common/EntryComment";
import EntryView from "@/components/common/EntryView";
import EntryMenus from "@/components/common/EntryMenus.vue";
import Post from "@/components/partials/placegallery/Post.vue";

export default {
  name: "PlacegalleryList",
  mixins: [commonMixins],
  props: {},
  components: { EntryPlus, EntryComment, EntryView, EntryMenus, Post },
  data() {
    return {
      isCreate: false,
      entries: [],
      totalCount: 0,
      isLoadmore: false,
      test: "test",
    };
  },
  methods: {
    onCreate() {
      this.isCreate = true;
    },
    onClose() {
      this.isCreate = false;
    },
    getData() {
      this.setLoading(true);
      this.$apollo
        .query({
          query: gql`
            query MyQuery(
              $currentPage: Int
              $limit: Int
              $sort: String
              $userId: Int
            ) {
              getEntries(
                currentPage: $currentPage
                limit: $limit
                sort: $sort
                user_id: $userId
              ) {
                result_code
                data {
                  currentPage
                  items {
                    actionStatus {
                      clip
                      follow
                      mute
                      reaction
                    }
                    caption
                    category {
                      caption
                      description
                      id
                      img
                    }
                    comment
                    createdTime
                    curationSource
                    description
                    id
                    medias {
                      type
                      url
                    }
                    module {
                      alias
                      caption
                      id
                    }
                    reactions {
                      total
                      items {
                        caption
                        count
                        icon
                        id
                      }
                    }
                    tags
                    spot {
                      name
                      country
                      region
                      city
                      street
                    }
                    thumbnail
                    view
                    user {
                      id
                      isAdmin
                      nickname
                      profileImg
                      title
                    }
                  }
                  limit
                  sort
                  total
                }
              }
            }
          `,
          variables: {
            currentPage: 1,
            limit: 0,
            sort: "new",
            userId: 1,
          },
          update: () => {},
          error(error) {
            console.log(error);
          },
        })
        .then(({ data }) => {
          this.test = " damnv";
          this.entries = data.getEntries.data.items;
          this.totalCount = data.getEntries.data.total;
          this.isLoadmore = false;
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
    onUpdateEntry(data) {
      this.entries.map((item) => {
        if (item.id == data.id) {
          item.reaction = data.reaction;
          item.actionStatus.reaction = data.actionStatus.reaction;
        }
      });
    },
  },
  apollo: {},
  computed: {},
  created() {
    this.getData();
  },
};
</script>
<style lang="scss" scoped></style>
