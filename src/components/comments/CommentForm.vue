<template>
  <div>
    <form data-cscmt="form" data-api="/_api/cs-comments_01.json">
      <input type="hidden" name="hoge" value="html-hoge" />
      <input type="hidden" name="fuga" value="html-fuga" />
    </form>
    <div class="cs-cmt__header">
      <div class="cs-cmt-header">
        <div class="cs-cmt-header__left">
          <span>{{ totalComments }}</span
          >件のコメントがあります。
        </div>
        <div class="cs-cmt-header__right">
          並び替え
          <select data-cscmt="sort" class="cs-field-a--s">
            <option value="cs-cmt.html" selected>日時順</option>
            <option value="cs-cmt_2.html">いいねの多い順</option>
          </select>
        </div>
      </div>
    </div>
    <!-- comment form-->
    <div class="cs-cmt-post--top">
      <!-- 動作確認用に method が get になっていますが、組み込み時には post に変えてください。-->
      <form
        @submit="onCreateComment"
        enctype="multipart/form-data"
        method="post"
        class="cs-cmt-post__form"
      >
        <div class="cs-cmt-post__image">
          <div
            style="background-image: url('http://placeimg.com/300/200/people')"
            class="cs-avatar__image--35"
          ></div>
        </div>
        <div data-cstextcounter="container" class="cs-cmt-post__body">
          <textarea
            data-cscmt-post="field"
            data-cstextcounter="target"
            data-csfield="h-auto"
            rows="1"
            placeholder="コメントする（1000文字まで）"
            v-model="description"
            class="cs-field-a cs-field--w-100p cs-field--h-auto-mah-10"
          ></textarea>
          <!-- エラーテキストを入れる要素。対象入力フォームのname属性とdata-error-name属性を合わせてください-->
          <div data-error-name="comment_text" class="cs-cmt-post-error"></div>
          <div class="cs-cmt-post__footer">
            <div class="cs-cmt-post__characters">
              あと<span data-cstextcounter="counter" class="cs-cmt-post__count"
                >1000</span
              >文字
            </div>
            <div data-csimage-preview="container" class="cs-cmt-post__image">
              <div data-csimage-preview="trigger" class="cs-cmt-post__upload">
                <i class="cs-cmt-post__upload-icon"></i>写真を追加する
                <input
                  type="file"
                  accept="image/*"
                  data-cscmt-post="field"
                  data-csimage-preview="field"
                  name="comment_img"
                />
              </div>
              <!-- エラーテキストを入れる要素。対象入力フォームのname属性とdata-error-name属性を合わせてください-->
              <div
                data-error-name="comment_image"
                class="cs-cmt-post-error"
              ></div>
              <div
                data-csimage-preview="thumbnail"
                class="cs-cmt-post__thumbnail is-hidden"
              >
                <div
                  data-csimage-preview="remove"
                  class="cs-cmt-post__thumbnail-remove"
                ></div>
              </div>
            </div>
          </div>
          <div class="cs-cmt-post__button">
            <button
              data-cscmt-post="trigger"
              class="cs-button-a--1-m cs-button--w-100p"
            >
              投稿する
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import commonMixins from "@/mixins/common";

export default {
  name: "CommentForm",
  mixins: [commonMixins],
  data() {
    return {
      commentImg: "",
      description: "",
    };
  },
  props: {
    totalComments: {
      type: Number,
      default: () => 0,
    },
    entryId: {
      type: Number,
      default: () => 0,
    },
    userId: {
      type: Number,
      default: () => 0,
    },
    doAddComment: {
      type: Function,
    },
  },
  methods: {
    onCreateComment(e) {
      e.preventDefault();
      this.$apollo
        .mutate({
          mutation: gql`
            mutation MyMutation(
              $entryId: Int!
              $userId: Int!
              $description: String!
              $commentImg: String
            ) {
              createComment(
                input: {
                  user_id: $userId
                  entry_id: $entryId
                  description: $description
                  comment_img: $commentImg
                }
              ) {
                result_code
                data {
                  id
                  img
                  img2
                  num_comment
                  num_good
                  reactions {
                    id
                    caption
                    img
                    num_reaction
                    is_like
                  }
                  user {
                    nickname
                    id
                    profile_img
                    created
                  }
                  description
                  caption
                  created
                  entry_id
                  comment_id
                }
              }
            }
          `,
          variables: {
            userId: this.userId,
            entryId: this.entryId,
            description: this.description,
            commentImg: this.commentImg,
          },
        })
        .then(({ data }) => {
          if (data.createComment?.result_code == 0) {
            this.doAddComment(data.createComment.data);
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
