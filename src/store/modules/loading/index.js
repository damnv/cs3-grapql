const state = () => ({
  isLoading: false,
});

// getters
const getters = {};

// actions
const actions = {};

// mutations
const mutations = {
  SET_LOADING(state, data) {
    state.isLoading = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
