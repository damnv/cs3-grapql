<template>
  <div class="cs-pane">
    <div class="cs-pane__inner--a">
      <div id="activity-list" class="pm-usr-2-activity">
        <div class="pm-usr-2-activity__header">
          <div class="pm-usr-2-activity__header-title">アクティビティ</div>
        </div>
        <div class="pm-usr-2-activity__list">
          <div class="pm-usr-2-activity__list-header">
            <div class="cs-nav-a">
              <ul class="cs-nav-a__list">
                <li class="cs-nav-a__item">
                  <a href="#" class="cs-nav-a__link is-active">自分の投稿</a>
                </li>
                <li class="cs-nav-a__item">
                  <a
                    href="user-home-2-action.html#activity-list"
                    class="cs-nav-a__link"
                    >アクション履歴</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div
            data-cscomments="root"
            id="js-usr-2-post-list"
            class="pm-usr-2-activity__items-container"
            v-if="entries.length"
          >
            <div data-cscomments="container" class="pm-usr-2-activity__items">
              <EntryBlock
                v-for="(entry, index) in entries"
                :key="index"
                :entry="entry"
              ></EntryBlock>
            </div>
            <div class="pm-usr-2-activity__button-more" v-if="loadmore">
              <div
                data-cscomments="indicator"
                class="pm-usr-2-activity__button-more__indicator is-hidden"
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
</template>

<script>
import EntryBlock from "../common/EntryBlock.vue";
export default {
  name: "UserActivity",
  props: {
    entries: {
      type: Array,
      default: () => [],
    },
    loadmore: {
      type: Boolean,
      default: () => false,
    },
    total: {
      type: Number,
      default: () => 0,
    },
  },
  components: { EntryBlock },
};
</script>

<style></style>
