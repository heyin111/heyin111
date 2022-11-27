<template>
  <el-submenu v-if="itemData.childrens&&itemData.childrens.length" :index="itemData.id+''">
    <template slot="title">
      <i v-if="itemData.icon" :class="['mange-icon', itemData.icon]"></i>
      <span slot="title">{{itemData.menu_name}}</span>
    </template>
    <MenuTree v-for="(item, index) in itemData.childrens" :item-data="item" :key="index"/>
  </el-submenu>
  <el-menu-item v-else :index="itemData.path">
    <i v-if="itemData.icon" :class="['mange-icon', itemData.icon]"></i>
    <span slot="title">{{itemData.menu_name}}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: "MenuTree",
  data() {
    return {};
  },

  props: {
    itemData: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style lang="scss">
body {
  .nav-menu-vertical {
    border-right: none;
    &:not(.el-menu--collapse) {
      border-right: none;
      width: 200px;
    }

    .el-submenu__icon-arrow {
      margin-top: -5px;
    }

    span {
      margin-left: 15px;
    }
  }

  .el-menu--popup {
    padding: 0;
    margin: 5px;
  }
}
</style>