<template>
  <div>{{ getListReaction }}</div>
</template>

<script>
import gql from "graphql-tag";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      getListReaction: [],
    };
  },
  props: {},
  watch: {},
  methods: {
    ...mapActions({
      getData: "user/testCallApi",
    }),
  },
  apollo: {
    getListReaction: gql`
    query getListReaction {
      getListReaction {
        caption
        id
        img
      }
    }
    `,
  },
  created(){
    const graphqlQuery = {
          "operationName": "MyQuery",
          "query": "query MyQuery($user_id: Int!, $caption: String) {\n getEntriesByUserId(user_id: $user_id, caption: $caption) {\n    id\n    caption\n    reactions {\n      caption\n      id\n      num_reaction\n      img\n    }\n  }\n}\n",
          "variables": {user_id: 1, caption: "abc"}
      };
    this.getData(graphqlQuery);
  }
};
</script>

<style lang="scss"></style>
