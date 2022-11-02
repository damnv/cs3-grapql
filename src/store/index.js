import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/modules/user";
import loading from "@/store/modules/loading";
import toast from "@/store/modules/toast";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    loading,
    toast,
  },
});
