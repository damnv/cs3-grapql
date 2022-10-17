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
                <a href="#" class="pm-pla-promote__button"
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
                <div class="pm-pla-list__count">{{totalCount}}件</div>
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
                  <div data-cscomments="container" class="pm-pla-list__items" v-if="entries">
                    <div data-cshistory-id="1" class="pm-pla-list-item" v-for="(entry, index) in entries" :key="index">
                      <div class="pm-pla-list-item__header">
                        <div class="cs-avatar-2">
                          <a
                            href="#"
                            v-bind:style="{ 'background-image': 'url(' + entry.user.profile_img + ')' }"
                            class="cs-avatar-2__photo"
                          ></a>
                          <div class="cs-avatar-2__info">
                            <div class="cs-avatar-2__name-group">
                              <a href="#" class="cs-avatar-2__name"
                                >{{ entry.user.nickname}}</a
                              >
                            </div>
                            <div class="cs-avatar-2__opt">{{ entry.created}}</div>
                          </div>
                          <div class="cs-avatar-2__info">
                            <i class="cs-avatar-2__beginner"></i>
                          </div>
                        </div>
                        <div class="pm-pla-list-item__header-right">
                          <i class="cs-icn-sns--instagram--gray"></i>
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
                                    class="cs-context-menu__link cs-context-menu__link"
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
                      <router-link :to="{ name:'placegallery-detail', params: { id: entry.id }}" class="pm-pla-list-item__image-link">
                        <div
                          class="pm-pla-list-item__image-list pm-pla-list-item__image-list--items-1"
                        >
                        <div  v-bind:style="{ 'background-image': 'url(' + entry.img + ')' }"  class="pm-pla-list-item__image"></div>
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
                      ><a href="#" class="pm-pla-list-item__text-link">
                        <div class="pm-pla-list-item__text">
                          {{ entry.caption}}
                        </div></a
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
                          <div class="cs-response-c">
                            <div
                              data-csaction="like"
                              data-api=""
                              data-cslike-id="12345"
                              class="cs-response-c__button--like"
                            >
                              <i class="cs-response-c__icon--medium"></i
                              ><span
                                data-cslike-counter="12345"
                                class="cs-response-c__counter"
                                >{{ entry.num_good}}</span
                              >
                            </div>
                          </div>
                          <div class="cs-response-c">
                            <div class="cs-response-c__button--comment">
                              <i class="cs-response-c__icon--medium"></i
                              ><span class="cs-response-c__counter">{{ entry.num_comment}}</span>
                            </div>
                          </div>
                        </div>
                        <div class="pm-pla-list-item__response-group-right">
                          <div class="cs-response-c">
                            <div class="cs-response-c__views">{{ entry.num_view}} views</div>
                          </div>
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
  </div>
  <!-- end module-->
</template>
<script>
import Entry from "@/components/partials/Entry";
import HeaderBack from "@/components/partials/HeaderBack";
import gql from "graphql-tag";

export default {
  name: "PlacegalleryList",
  props: {
    hiddenHeaderBack: {
      type: Boolean,
      default: false,
    },
  },
  components: { Entry, HeaderBack },
  data() {
    return {};
  },
  apollo: {
    getEntries: gql`
      query MyQuery {
        getEntries {
          result_code
          data {
            current_page
            is_last
            total_count
            entries {
              caption
              id
              category_l_id
              created
              description
              img
              img2
              img3
              img4
              img5
              img_thumbnail
              is_clip
              is_following
              module_entry_id
              module_id
              module_type
              num_comment
              num_good
              num_view
              reactions {
                caption
                id
                img
                is_like
                num_reaction
              }
              user_id
              user {
                birthday
                email
                gender
                profile_img
                introduction
                nickname
                id
              }
            }
          }
        }
      }
    `,
  },
  computed: {
    entries() {
      return this.getEntries?.data?.entries?.length
        ? this.getEntries.data.entries
        : [];
    },
    totalCount(){
      return this.getEntries?.data?.total_count
        ? this.getEntries.data.total_count
        : [];
    },
    isLoadmore() {
      return this.getEntries?.data?.is_last;
    },
  },
};
</script>
<style lang="scss" scoped></style>
