<template>
  <v-row class="pa-3 my-1">
    <v-col class="pa-1" cols="4" md="3" v-for="tag in tags" :key="tag.id">
      <v-chip
        class="d-block tag-chip hover-effects"
        label
        @click="goTo(`/search?keyword=${escapeStr(tag.name)}`)"
      >
        {{ tag.name }}
      </v-chip>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "TagsBlock",
  data() {
    return {
      assetBaseUrl: process.env.assetBaseUrl,
    };
  },
  props: {
    goTo: Function,
    tags: Array,
  },
  methods: {
    escapeStr(str) {
      return escape(str);
    },
  },
};
</script>

<style lang="scss" scoped>
.tag-chip {
  border: 2px dashed #757575 !important;
  background-color: #fcfcfc !important;
  border-radius: 0 !important;
  height: 50px !important;
}
</style>
