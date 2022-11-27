<template>
  <div class="page-container">
    <router-view v-if="relaod"></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  provide() {
    return {
      reloadPage: this.reloadPage
    };
  },
  data() {
    return {
      relaod: true
    };
  },
  methods: {
    async reloadPage() {
      this.relaod = false;
      await this.$netxTick();
      this.relaod = true;
    }
  }
};
</script>

<style lang="scss">
.page-container {
  width: 100%;
  height: 100%;
  & > div[class$="-page"] {
    width: 100%;
    height: 100%;
  }
}
</style>
