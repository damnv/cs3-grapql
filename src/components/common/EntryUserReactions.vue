<template>
  <div class="cs-liked-list" v-if="users.length">
    <div class="cs-liked-list__header">
      <span data-cslike-counter="12345">{{ total }}</span
      >人のメンバーがいいね！と言ってます
    </div>
    <ul class="cs-liked-list__members cs-reaction-list-a">
      <li
        v-for="(user, index) in users"
        :key="index"
        v-bind:style="{
          'background-image': 'url(' + user.profile_img + ')',
        }"
        class="cs-liked-list__avatar"
      >
        <i data-csreaction-icon="3" class="cs-button-reaction-a__icon"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "EntryUserReactions",
  props: {
    users: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: () => 0,
    },
  },
};
</script>

<style></style>
