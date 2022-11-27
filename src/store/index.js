import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import footerStatus from "@store/modules/footerStatus.js";
import collectionStatus from "@store/modules/collectionStatus.js";
import loginStatus from "@store/modules/login.js";
import manageStatus from "@store/modules/manageStatus.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    footerStatus,
    collectionStatus,
    login: loginStatus,
    manage: manageStatus
  },
  plugins: [
    createPersistedState({
      key: "admin_vuex",
      storage: window.sessionStorage
    })
  ]
});
