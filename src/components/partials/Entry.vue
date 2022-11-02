<template>
  <div class="entry" v-if="entry">
    <div class="entry-header d-flex justify-space-between">
      <div class="entry-header__info d-flex">
        <v-avatar
          class="entry-avatar"
          color="primary"
          size="50"
          v-if="entry.user.profile_img"
        >
          <img :src="`${entry.user.profile_img}`" alt="John" />
        </v-avatar>
        <div class="ml-4">
          <p class="ma-0 fs-13">{{ entry.user.nickname }}</p>
          <p class="ma-0 fs-12">{{ entry.user.created | convertDateTime }}</p>
        </div>
      </div>
      <div class="entry-header__action">
        <v-icon>mdi-dots-horizontal</v-icon>
      </div>
    </div>
    <div class="entry-content mt-2">
      <router-link
        :to="{ name: 'placegallery-detail', params: { id: entry.id } }"
      >
        <v-img
          :src="`${entry.img_thumbnail || entry.img}`"
          :lazy-src="`https://picsum.photos/10/6?image=1`"
          aspect-ratio="1"
          class="grey lighten-2"
        ></v-img>
      </router-link>
    </div>
    <div class="entry-footer mt-1 pa-3">
      <div class="entry-footer__desc">
        {{ entry.description }}
      </div>
      <div class="entry-footer__actions d-flex justify-space-between mt-2">
        <div class="entry-footer__actions-like fs-12">
          <v-icon color="gray200">mdi-heart</v-icon> {{ entry.num_good }}
        </div>
        <div class="entry-footer__actions-comment fs-12">
          <v-icon color="gray200">mdi-comment</v-icon> {{ entry.num_comment }}
        </div>
        <div class="entry-footer__actions-view fs-12">
          {{ entry.num_view || 0 }} views
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Entry",
  props: {
    entry: {
      type: Object,
      default: () => {},
    },
  },
  watch: {},
  methods: {},
};
</script>

<style lang="scss"></style>
