<template>
  <div :class="`${baseClass}`">
    <div :class="`${baseClass}__header`">
      <div class="cs-avatar-2" v-if="entry.user">
        <a
          href="#"
          v-bind:style="{
            'background-image': 'url(' + entry.user.profile_img + ')',
          }"
          class="cs-avatar-2__photo"
        ></a>
        <div class="cs-avatar-2__info" v-if="entry.user">
          <div class="cs-avatar-2__name-group">
            <a href="#" class="cs-avatar-2__name">{{ entry.user.nickname }}</a>
          </div>
          <div class="cs-avatar-2__opt">{{ entry.created }}</div>
        </div>
      </div>
      <div :class="`${baseClass}__header-right`">
        <EntryMenus></EntryMenus>
      </div>
    </div>
    <a href="#" class="pm-pla-list-item__image-link">
      <div
        class="pm-pla-list-item__image-list pm-pla-list-item__image-list--items-1"
      >
        <div
          v-bind:style="{
            'background-image': 'url(' + entry.img + ')',
          }"
          class="pm-pla-list-item__image"
        ></div></div></a
    ><a href="#" class="pm-pla-list-item__text-link">
      <div class="pm-pla-list-item__text">
        {{ entry.caption }}
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
        <EntryPlus :count="entry.num_good"></EntryPlus>
        <EntryComment :count="entry.num_comment"></EntryComment>
      </div>
      <div class="pm-pla-list-item__response-group-right">
        <EntryView :count="entry.num_view"></EntryView>
      </div>
    </div>
  </div>
</template>

<script>
import EntryMenus from "./EntryMenus.vue";
import EntryPlus from "./EntryPlus.vue";
import EntryView from "./EntryView.vue";
import EntryComment from "./EntryComment.vue";
export default {
  name: "EntryBlock",
  props: {
    entry: {
      type: Object,
      default: () => {},
    },
    baseClass: {
      type: String,
      default: () => "pm-pla-list-item",
    },
  },
  components: { EntryMenus, EntryPlus, EntryView, EntryComment },
};
</script>

<style></style>
