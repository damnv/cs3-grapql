<template>
  <div class="pm-home">
    <div class="pm-home-pgl">
      <div class="d-flex justify-space-between align-center">
        <h3 class="mt-4 mb-5">Placegallery</h3>
        <div class="pm-home-detail-link">
          <router-link :to="{ name: 'placegallery-list' }"
            ><v-icon color="navy">mdi-arrow-right</v-icon></router-link
          >
        </div>
      </div>
      <Placegallery hidden-header-back></Placegallery>
    </div>
  </div>
</template>

<script>
import Placegallery from "@/pages/Placegallery/index";

export default {
  name: "Home",
  data() {
    return {
      entries: [],
      getListReaction: [],
    };
  },
  components: { Placegallery },
  props: {},
  watch: {},
  methods: {},
  apollo: {},
  created() {},
};
</script>

<style lang="scss"></style>
