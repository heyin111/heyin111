const state = {
  collects: []
};

const getters = {
  renderCollects(state) {
    return state.collects;
  }
};

const mutations = {
  pushCollects(state, item) {
    state.collects.push(item);
  }
};

const actions = {
  invokePushItems(context, item) {
    return new Promise(resolve => {
      setTimeout(() => {
        context.commit("pushCollects", item);
        resolve(item);
      }, 3000);
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
