<template>
  <li class="cs-cmt-item js-thread-item">
    <div class="cs-cmt-item__header">
      <div class="cs-cmt-menu">
        <div data-csdropdown="menu" class="cs-context-menu">
          <div data-csdropdown="trigger" class="cs-context-menu__trigger"></div>
          <div
            data-csdropdown="content"
            data-align="right"
            class="cs-context-menu__content"
          >
            <ul class="cs-context-menu__items">
              <li class="cs-context-menu__item">
                <a href="#" class="cs-context-menu__link">報告する</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="cs-cmt-item__header-author">
        <a href="#" class="cs-avatar--black">
          <div
            v-bind:style="{
              'background-image': 'url(' + comment.user.profile_img + ')',
            }"
            class="cs-avatar-2__photo--ambassador"
          ></div>
          <div class="cs-avatar__name">
            {{ comment.user.nickname }}
          </div>
          <div class="cs-avatar-2__label">
            <div class="cs-label-round--a">Official</div>
          </div></a
        >
      </div>
      <div class="cs-cmt-item__header-date">
        {{ comment.created }}
      </div>
    </div>
    <div class="cs-cmt-item__content">
      <div class="cs-cmt-item__body">
        {{ comment.captions }}
      </div>
      <div class="cs-cmt-item__res">
        <div class="cs-response-a">
          <div
            data-csaction="like"
            data-api=""
            data-cslike-id="comment1"
            class="cs-response-a__button--like"
          >
            <i class="cs-response-a__icon--small"></i
            ><span class="cs-response-a__counter">{{ comment.num_good }}</span
            ><span class="cs-response-a__label">いいね</span>
          </div>
          <div data-csaction="comment" class="cs-response-a__button--comment">
            <i class="cs-response-a__icon--small"></i
            ><span class="cs-response-a__counter">{{
              comment.num_comment
            }}</span
            ><span class="cs-response-a__label">返信する</span>
          </div>
        </div>
      </div>
    </div>
    <!-- サブコメント-->
    <div data-cscmt-sub="root" class="cs-cmt-subthread">
      <form data-cscmt-sub="form" data-api="/_api/cs-comments_02.json">
        <input type="hidden" name="hoge" value="html-hoge" />
        <input type="hidden" name="fuga" value="html-fuga" />
      </form>
      <!-- サブコメント もっと見るボタン（上部）-->
      <div class="cs-cmt-subthread__header">
        <div class="cs-cmt-subthread-more">
          <div
            data-cscmt-sub="indicator"
            class="cs-cmt-subthread-more__indicator is-hidden"
          >
            <div class="cs-spinner-b--m">読み込み中</div>
          </div>
          <div data-cscmt-sub="trigger" class="cs-cmt-subthread-more__button">
            他3件を見る
          </div>
        </div>
      </div>
      <!-- / サブコメント もっと見るボタン（上部）-->
      <!-- サブコメント リスト-->
      <ul data-cscmt-sub="list" class="cs-cmt-subthread__items"></ul>
      <!-- サブコメント フォーム-->
      <div class="cs-cmt-subitem-form is-hidden js-thread-item__form">
        <!-- 動作確認用に method が get になっていますが、組み込み時には post に変えてください。-->
        <form
          data-cscmt-post-sub="form"
          action="/_api/cs-comments-post_02.json"
          enctype="multipart/form-data"
          method="get"
        >
          <div class="cs-cmt-subitem-form__avatar">
            <div class="cs-avatar">
              <div
                v-bind:style="{
                  'background-image': 'url(' + comment.user.profile_img + ')',
                }"
                class="cs-avatar__image--35"
              ></div>
            </div>
          </div>
          <div class="cs-cmt-subitem-form__button">
            <button
              data-cscmt-post-sub="trigger"
              class="cs-button-b--1-m cs-button--w-50"
            >
              投稿
            </button>
          </div>
          <div class="cs-cmt-subitem-form__field">
            <textarea
              data-cscmt-post-sub="field"
              data-csfield="h-auto"
              rows="1"
              class="cs-field-a cs-field--w-100p cs-field--h-auto-mah-10"
            ></textarea>
            <div data-error-name="comment_text" class="cs-cmt-post-error"></div>
          </div>
        </form>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "CommentListElement",
  data() {
    return {};
  },
  components: {},
  computed: {},
  props: {
    comment: {
      type: Object,
      default: () => {},
    },
  },
  watch: {},
  methods: {},
};
</script>
<style lang="scss" scoped></style>
