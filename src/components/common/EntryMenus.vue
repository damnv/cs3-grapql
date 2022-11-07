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
        <li class="cs-context-menu__item" v-if="!hiddenEdit">
          <p class="cs-context-menu__link" @click="onEdit">編集する</p>
        </li>
        <li
          class="cs-context-menu__item"
          @click="handleShowModalDelete"
          v-if="!hiddenDelete"
        >
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
          v-if="!hiddenReport"
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
              <div class="cs-modal-report__title">
                投稿の報告 {{ reportValue }}
              </div>
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
                v-if="reportList.length"
              >
                <label
                  class="cs-modal-report__label"
                  v-for="(report, index) in reportList"
                  :key="index"
                >
                  <input
                    @click="handleReport(report)"
                    type="radio"
                    class="cs-modal-report__radio"
                    name="violate_type"
                    :id="report.key"
                    :value="report.type"
                  /><span class="cs-modal-report__radio-text">{{
                    report.name
                  }}</span></label
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
import commonMixins from "@/mixins/common";
import { DELETE_ENTRY_MUTATION, REPORT_MUTATION } from "@/graphql/mutations";

export default {
  name: "EntryMenus",
  mixins: [commonMixins],
  props: {
    classContent: {
      type: String,
      default: () => "",
    },
    entryId: {
      type: Number,
      default: () => 0,
    },
    userId: {
      type: Number,
      default: () => 0,
    },
    customReport: {
      type: Function,
    },
    customDetele: {
      type: Function,
    },
    isCustomDelete: {
      type: Boolean,
      default: () => false,
    },
    hiddenReport: {
      type: Boolean,
      default: () => false,
    },
    hiddenDelete: {
      type: Boolean,
      default: () => false,
    },
    hiddenEdit: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      dialogDelete: false,
      dialogReport: false,
      reportValue: {},
      reportList: [
        {
          name: "宣伝、広告的な利用",
          key: "violate_type-1",
          type: 1,
        },
        {
          name: "宣伝、広告的な利用",
          key: "violate_type-2",
          type: 2,
        },
        {
          name: "投稿内容が重複している",
          key: "violate_type-3",
          type: 3,
        },
        {
          name: "不適切な投稿",
          key: "violate_type-4",
          type: 4,
        },
        {
          name: "カテゴリ違いの投稿",
          key: "violate_type-5",
          type: 5,
        },
        {
          name: "個人情報の掲載",
          key: "violate_type-6",
          type: 6,
        },
        {
          name: "悪質なリンク",
          key: "violate_type-7",
          type: 7,
        },
        {
          name: "不適切な画像の掲載",
          key: "violate_type-8",
          type: 8,
        },
        {
          name: "その他",
          key: "violate_type-9",
          type: 9,
        },
      ],
    };
  },
  methods: {
    handleReport(value) {
      this.reportValue = value;
    },
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
    onEdit(){
      this.$router.push({name: 'placegallery-edit', params:{ id: this.entryId}})
    },
    onDelete() {
      if (this.isCustomDelete) {
        this.customDetele();
        // this.dialogDelete = false;
      } else {
        this.$apollo
          .mutate({
            mutation: DELETE_ENTRY_MUTATION,
            variables: {
              entryId: this.entryId,
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
      }
    },
    onReport() {
      if (this.isCustomReport) this.customReport();
      else {
        this.$apollo
          .mutate({
            mutation: REPORT_MUTATION,
            variables: {
              entryId: this.entryId,
              targetTable: "",
              violateDetail: this.reportValue.name,
              violateType: this.reportValue.type,
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
      }
    },
  },
};
</script>

<style></style>
