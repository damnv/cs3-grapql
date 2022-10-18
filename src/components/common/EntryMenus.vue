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
        <li class="cs-context-menu__item">
          <p
            data-csmodal="trigger"
            data-target="#js-modal-delete-9999999"
            class="cs-context-menu__link cs-context-menu__link"
          >
            削除する
          </p>
        </li>
        <li class="cs-context-menu__item">
          <p class="cs-context-menu__link">報告する</p>
        </li>
      </ul>
    </v-menu>
    <div id="js-modal-delete-9999999" class="cs-modal-delete-post">
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
        >&nbsp;&nbsp;<span onclick="location.href='#'" class="cs-button-a--1-m"
          >削除する</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EntryMenus",
  props: {
    classContent: {
      type: String,
      default: () => "",
    },
  },
};
</script>

<style></style>
