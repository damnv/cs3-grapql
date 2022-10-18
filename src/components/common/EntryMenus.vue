<template>
  <div class="cs-context-menu" :class="classContent">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <div
          v-bind="attrs"
          v-on="on"
          data-csdropdown="trigger"
          class="cs-context-menu__trigger"
        ></div>
      </template>
      <ul class="cs-context-menu__items">
        <li class="cs-context-menu__item">
          <p class="cs-context-menu__link">編集する</p>
        </li>
        <li class="cs-context-menu__item" @click="handleShowModalDelete">
          <p
            data-csmodal="trigger"
            class="cs-context-menu__link cs-context-menu__link"
          >
            削除する
          </p>
        </li>
        <li
          class="cs-context-menu__item"
          @click.prevent="handleShowModalReport"
        >
          <p class="cs-context-menu__link">報告する</p>
        </li>
      </ul>
    </v-menu>
    <v-dialog v-model="dialogDelete" width="500">
      <v-card v-click-outside="handleCloseModalDelete">
        <div class="cs-modal-delete-post__content">
          <p class="cs-modal-delete-post__title">
            この投稿を削除してもよろしいですか？
          </p>
          <p class="cs-modal-delete-post__body">
            一度削除すると元に戻すことはできません。
          </p>
          <span @click="handleCloseModalDelete" class="cs-button-b--1-m"
            >キャンセル</span
          >&nbsp;&nbsp;<span @click.prevent="onDelete" class="cs-button-a--1-m"
            >削除する</span
          >
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogReport">
      <div
        style="width: 300px"
        class="cs-modal-report fx-fade is-active fx-in"
        v-click-outside="handleCloseModalReport"
      >
        <div class="cs-modal-report__content">
          <!-- ====================-->
          <!-- フォーム-->
          <div data-modal-report-type="init" class="isShow">
            <div class="cs-modal-report__heading">
              <div class="cs-modal-report__title">投稿の報告</div>
              <div class="cs-modal-report__body">
                「cs3
                grapql」内において、利用規約に違反する疑いがある投稿を発見された場合は、こちらより該当する理由を選択の上報告ください。
              </div>
              <!-- エラー（フォーム入力エラー）-->
              <div
                data-modal-report-el="form-error-text"
                class="cs-modal-report__form-error-text"
              >
                該当する理由を選択してください。
              </div>
            </div>
            <form id="js-modal-report-form" data-modal-report-el="form">
              <div
                data-modal-report-el="form-input-list"
                class="cs-modal-report__input-list"
              >
                <label class="cs-modal-report__label"
                  ><input
                    type="radio"
                    class="cs-modal-report__radio"
                    name="violate_type"
                    id="violate_type-1"
                    value="1"
                  /><span class="cs-modal-report__radio-text"
                    >宣伝、広告的な利用</span
                  ></label
                ><label class="cs-modal-report__label"
                  ><input
                    type="radio"
                    class="cs-modal-report__radio"
                    name="violate_type"
                    id="violate_type-2"
                    value="2"
                  /><span class="cs-modal-report__radio-text"
                    >投稿内容が重複している</span
                  ></label
                ><label class="cs-modal-report__label"
                  ><input
                    type="radio"
                    class="cs-modal-report__radio"
                    name="violate_type"
                    id="violate_type-3"
                    value="3"
                  /><span class="cs-modal-report__radio-text"
                    >不適切な投稿</span
                  ></label
                ><label class="cs-modal-report__label"
                  ><input
                    type="radio"
                    class="cs-modal-report__radio"
                    name="violate_type"
                    id="violate_type-4"
                    value="4"
                  /><span class="cs-modal-report__radio-text"
                    >カテゴリ違いの投稿</span
                  ></label
                ><label class="cs-modal-report__label"
                  ><input
                    type="radio"
                    class="cs-modal-report__radio"
                    name="violate_type"
                    id="violate_type-5"
                    value="5"
                  /><span class="cs-modal-report__radio-text"
                    >個人情報の掲載</span
                  ></label
                ><label class="cs-modal-report__label"
                  ><input
                    type="radio"
                    class="cs-modal-report__radio"
                    name="violate_type"
                    id="violate_type-6"
                    value="6"
                  /><span class="cs-modal-report__radio-text"
                    >悪質なリンク</span
                  ></label
                ><label class="cs-modal-report__label"
                  ><input
                    type="radio"
                    class="cs-modal-report__radio"
                    name="violate_type"
                    id="violate_type-7"
                    value="7"
                  /><span class="cs-modal-report__radio-text"
                    >不適切な画像の掲載</span
                  ></label
                ><label class="cs-modal-report__label"
                  ><input
                    type="radio"
                    class="cs-modal-report__radio"
                    name="violate_type"
                    id="violate_type-8"
                    value="8"
                  /><span class="cs-modal-report__radio-text"
                    >その他</span
                  ></label
                >
              </div>
              <div class="cs-modal-report__button-group">
                <span
                  @click.prevent="handleCloseModalReport"
                  data-csmodal="hide"
                  onclick="return false;"
                  class="cs-button-a--1-m"
                  >キャンセル</span
                >&nbsp;&nbsp;
                <input
                  @click.prevent="onReport"
                  type="submit"
                  value="報告する"
                  data-modal-report-el="submit"
                  class="cs-button-a--1-m white--text"
                />
              </div>
            </form>
          </div>
          <!-- ====================-->
          <!-- エラー （通信エラー等）-->
          <div data-modal-report-type="error">
            <div class="cs-modal-report__heading">
              <div class="cs-modal-report__title">投稿の報告</div>
              <div class="cs-modal-report__body">
                <div
                  data-modal-report-el="ajax-error-text"
                  class="cs-modal-report__error-text"
                >
                  通信に失敗しました。恐れ入りますがしばらくたってからやり直してください。
                </div>
              </div>
            </div>
            <div class="cs-modal-report__button-group">
              <span
                data-csmodal="hide"
                onclick="return false;"
                class="cs-button-a--1-m"
                >閉じる</span
              >
            </div>
          </div>
          <!-- ====================-->
          <!-- 完了-->
          <div data-modal-report-type="thanks">
            <div class="cs-modal-report__heading">
              <div class="cs-modal-report__title">
                ご協力ありがとうございました
              </div>
              <div class="cs-modal-report__body">
                ※報告者情報、報告内容については個人情報保護方針にて保護され、公開されることはありません。
              </div>
              <div class="cs-modal-report__note-title">注意事項</div>
              <div class="cs-modal-report__note">
                ご連絡に事務局が個別にお答えすることはありません。<br />ご連絡いただいた内容は、利用規約に照らし合わせて確認を行います。<br />ご連絡をいただいても違反が認められない場合には、対応・処理を実施しない場合もあります。
              </div>
            </div>
            <div class="cs-modal-report__button-group">
              <span
                data-csmodal="hide"
                onclick="return false;"
                class="cs-button-a--1-m"
                >閉じる</span
              >
            </div>
          </div>
          <!-- ====================-->
          <!-- スピナー-->
          <div data-modal-report-type="spinner">
            <div class="cs-modal-report__spinner">
              <div class="cs-spinner-a--m"></div>
            </div>
          </div>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import gql from "graphql-tag";
import commonMixins from "@/mixins/common";

export default {
  name: "EntryMenus",
  mixins: [commonMixins],
  props: {
    classContent: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      dialogDelete: false,
      dialogReport: false,
      reason: "",
    };
  },
  methods: {
    handleShowModalDelete() {
      this.dialogDelete = true;
    },
    handleCloseModalDelete() {
      this.dialogDelete = false;
    },
    handleShowModalReport() {
      this.dialogReport = true;
    },
    handleCloseModalReport() {
      this.dialogReport = false;
    },
    onDelete() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation MyMutation($entryId: Int!, $userId: Int!) {
              deleteEntry(entry_id: $entryId, user_id: $userId) {
                result_code
              }
            }
          `,
          variables: {
            entryId: 1,
            userId: 1,
          },
          update: () => {},
        })
        .then(() => {
          this.dialogDelete = false;
          this.$router.push({ name: "placegallery-list" });
          setTimeout(() => {
            this.newToast({
              type: "success",
              message: "Delete entry success",
            });
          }, 0);
        })
        .catch((error) => {
          this.dialogDelete = false;
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
    onReport() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation MyMutation(
              $entryId: Int!
              $userId: Int!
              $reason: String!
            ) {
              createEntryReport(
                input: { entry_id: $entryId, user_id: $userId, reason: $reason }
              ) {
                result_code
              }
            }
          `,
          variables: {
            entryId: 1,
            userId: 1,
            reason: this.reason,
          },
          update: () => {},
        })
        .then(() => {
          this.dialogReport = false;
          setTimeout(() => {
            this.newToast({
              type: "success",
              message: "Report success",
            });
          }, 0);
        })
        .catch((error) => {
          this.dialogReport = false;
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
