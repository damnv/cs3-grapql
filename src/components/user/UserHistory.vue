<template>
  <div class="cs-pane">
    <div class="cs-pane__inner--a">
      <div class="pm-usr-2-history">
        <div class="pm-usr-2-history__header">
          <div class="pm-usr-2-history__header-title">閲覧履歴</div>
        </div>
        <div class="pm-usr-2-clip__list" v-if="entries.length">
          <div class="cs-list-scroll--type-g">
            <div class="cs-list-scroll--type-g__inner">
              <a
                href="#"
                class="cs-list-scroll--type-g__item"
                v-for="(entry, index) in entries"
                :key="index"
              >
                <div
                  v-bind:style="{
                    'background-image': 'url(' + entry.img + ')',
                  }"
                  class="cs-list-scroll--type-g__image"
                ></div>
                <div class="cs-list-scroll--type-g__title">
                  {{ entry.caption }}
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserHistory",
  props: {
    entries: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style></style>
