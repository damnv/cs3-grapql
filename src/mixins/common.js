import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState({
      isLoading: (state) => state.loading.isLoading,
      isUploading: (state) => state.loading.isUploading,
      user: (state) => state.user.currentUser,
    }),
  },
  methods: {
    ...mapMutations({
      setLoading: "loading/SET_LOADING",
      setLoadingToast: "loading/SET_LOADING_TOAST",
      newToast: "toast/NEW_TOAST",
    }),
  },
  mounted() {},
};
