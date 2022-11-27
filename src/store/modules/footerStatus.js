const state = {
  showFooter: true,
  changableNum: 0
};

const getters = {
  isShow(state) {
    return state.showFooter;
  },
  getChangedNum(state) {
    return state.changableNum;
  }
};

const mutations = {
  show(state) {
    state.showFooter = true;
  },

  hide(state) {
    state.showFooter = false;
  },

  newNum(state, sum) {
    state.changableNum += sum;
  }
};

const actions = {
  hideFooter(context) {
    context.commit("hide");
  },

  showFooter(context) {
    context.commit("show");
  },

  getNewNum(context, num) {
    return new Promise(resolve => {
      setTimeout(() => {
        context.commit("newNum", num);
        resolve(num);
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
