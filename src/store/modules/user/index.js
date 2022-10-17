import apiService from "@/services/apiService";

const getDefaultState = () => {
  return {
    user: [],
  };
};

const state = () => getDefaultState();

const getters = {};

const actions = {
  getUsers({ commit }) {
    return new Promise((resolve, reject) => {
      // Do something here... lets say, a http call using vue-resource
      apiService
        .get("user")
        .then((response) => {
          commit("SET_USER", response.data);
          resolve(response); // Let the calling function know that http is done. You may send some data back
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  testCallApi({ commit }, data) {
    return new Promise((resolve, reject) => {
      apiService
        .post("", data)
        .then((response) => {
          console.log(response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const mutations = {
  RESET_STATE(state) {
    Object.assign(state, getDefaultState());
  },
  SET_USER(state, data) {
    state.user = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
