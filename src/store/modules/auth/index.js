import apiService from "@/services/apiService";
const getDefaultState = () => {
  return {
    accessToken: "",
  };
};

const state = () => getDefaultState();

const getters = {};

const actions = {
  login({ commit }, payload) {
    const { email, password } = payload;
    return new Promise((resolve, reject) => {
      apiService
        .post("auth/login", { email, password })
        .then((res) => {
          commit("SET_TOKEN", res.accessToken);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const mutations = {
  SET_TOKEN(state, payload) {
    state.accessToken = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
