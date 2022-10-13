import { mapState, mapMutations } from "vuex";
import { CSV_UPLOAD } from "@/constants/common";

export default {
  computed: {
    ...mapState({
      isLoading: (state) => state.loading.isLoading,
      isUploading: (state) => state.loading.isUploading,
      user: (state) => state.user.currentUser,
    }),
    isAdmin() {
      return !(
        this.user.userGroup &&
        this.user.userGroup.length === 1 &&
        this.user.userGroup.includes(CSV_UPLOAD)
      );
    },
  },
  methods: {
    ...mapMutations({
      setLoading: "loading/SET_LOADING",
      setLoadingToast: "loading/SET_LOADING_TOAST",
      newToast: "toast/NEW_TOAST",
    }),
    handleError(errors) {
      errors.forEach(({ message }) => {
        this.newToast({
          message: message,
          type: "error",
        });
      });
    },
  },
};
