<template>
  <div class="login_home_layout">
    <v-header :show-user="showUser" :user-msg="userMsg"></v-header>
    <div class="layout-router-view">
      <router-view class="ly-router-view" :user-login="userLogin" :display-footer="disPlayFooter"></router-view>
    </div>
    <v-footer v-if="showFooter"></v-footer>
  </div>
</template>

<script>
import PageHeader from "@components/header/index.vue";
import PageFooter from "@components/footer/index.vue";

export default {
  name: "lh_layout",

  data() {
    return {
      userMsg: {},
      showUser: false,
      showFooter: true
    };
  },

  methods: {
    userLogin(show = false, userMsg = {}) {
      this.showUser = show;
      this.userMsg = userMsg;
    },
    disPlayFooter(show) {
      this.showFooter = show;
    }
  },
  components: {
    "v-header": PageHeader,
    "v-footer": PageFooter
  }
};
</script>

<style lang="scss" scoped>
.login_home_layout {
  width: 100%;
  height: 100%;
  background-color: $bg0;
  @include flex_layout(column, flex-start, flex-start);

  .layout-router-view {
    width: 100%;
    flex: 1;
    @include position();

    .ly-router-view {
      width: 100%;
      height: 100%;
      @include position(absolute, left, top, 0, 0);
    }
  }
}
</style>