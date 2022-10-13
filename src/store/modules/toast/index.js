import { DEFAULT_TOAST_DURATION } from "@/constants/common";

const state = () => ({
  toasts: [],
});

// getters
const getters = {};

// actions
const actions = {};

// mutations
const mutations = {
  NEW_TOAST(state, payload) {
    const toast = {
      id: new Date().getTime(),
      message: typeof payload === "string" ? payload : payload.message,
      type: payload.type || "success",
      duration: payload.duration || DEFAULT_TOAST_DURATION,
    };
    state.toasts.push({ ...toast });
  },
  REMOVE_TOAST(state, payload) {
    state.toasts = state.toasts.filter(({ id }) => id !== payload.id);
  },
  REMOVE_TOAST_LIST(state) {
    state.toasts = [];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
