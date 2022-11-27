const state = {
  wardInfo: {},
  userInfo: {}
};

const getters = {
  getWardInfo(state) {
    return state.wardInfo;
  },
  getUserInfo(state) {
    return state.userInfo;
  }
};

const mutations = {
  newData(state, obj) {
    let { property, data } = obj;
    if (!data || !property) return;
    state[property] = data;
  }
};

const actions = {
  setStateData(context, obj) {
    return new Promise(resolve => {
      context.commit("newData", obj);
      resolve(obj.data);
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
