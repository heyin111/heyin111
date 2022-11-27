const state = {
  m_routes: []
};

const getters = {
  getMRoutes(state) {
    return state.m_routes;
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
