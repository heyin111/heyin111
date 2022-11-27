<template>
  <div class="manage-page">
    <v-header :showUser="true"></v-header>
    <div class="manage-content">
      <div class="left-nav-content" v-if="menu.length">
        <span class="fold-btn" @click="isCollapse=!isCollapse">
          <i
            :class="['arrow-icon', !isCollapse?'el-ali-icon-arrow-left':'el-ali-icon-arrow-right']"
          ></i>
        </span>
        <div class="nav-content">
          <el-menu
            :unique-opened="true"
            :collapse="isCollapse"
            @select="selectNav"
            class="nav-menu-vertical"
            background-color="#1A233B"
            text-color="#fff"
            :default-active="$route.path"
            router
          >
            <MenuTree v-for="(item,index) in menu" :item-data="item" :key="index"/>
          </el-menu>
        </div>
      </div>
      <div class="right-list-content">
        <div class="page-title-line">
          <div class="titles-content">
            <div class="titles-area">
              <a
                v-for="(item, index) in MRoutes"
                :key="index"
                href="javascript:void(0);"
                :class="['item-title', {active: item.active}]"
                @click="routerPath(item.path)"
              >
                {{item.title}}
                <span class="close-x" @click.stop="deleteRoute(index)">x</span>
              </a>
            </div>
          </div>
        </div>
        <div class="list-content">
          <keep-alive>
            <router-view/>
          </keep-alive>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import PageHeader from "@components/header/index.vue";
import PageFooter from "@components/footer/index.vue";
import MenuTree from "@components/menu/index.vue";
import { mapGetters, mapActions } from "vuex";
import { MANAGEAPIS } from "@apis/index.js";
import Tools from "@untils/index.js";

export default {
  name: "managePage",
  inject: ["reloadPage"],
  data() {
    return {
      isCollapse: true,
      menu: []
    };
  },

  computed: {
    ...mapGetters("login", { userInfo: "getUserInfo" }),
    ...mapGetters("manage", { MRoutes: "getMRoutes" })
  },

  created() {
    this.routerPath = Tools.routerPath.bind(this);
  },

  mounted() {
    this.requestPermi();
    this.appendRoutes();
  },

  watch: {
    $route(to) {
      this.appendRoutes(to);
    }
  },

  methods: {
    ...mapActions("manage", ["setStateData"]),
    requestPermi() {
      let options = {
        ...MANAGEAPIS.permis,
        data: this.userInfo
      };
      this._req.ajax(options).then(data => {
        this.menu = data;
      });
    },

    selectNav(key) {
      this.routerPath(key);
    },

    async deleteRoute(index = null) {
      let data = [...this.MRoutes];

      if (data.length === 1 && data[0].path === "/manage/products") {
        return;
      }

      data.splice(index, 1);
      let path = data.length ? data[data.length - 1].path : "/manage/products";
      await this.setStateData({
        property: "m_routes",
        data
      });
      this.routerPath(path);
    },

    appendRoutes(route = null) {
      let data = [...this.MRoutes];
      let router = route || this.$route;
      let { path, meta } = router;
      let hasSome = false;
      let currentRoute = {
        path,
        title: meta.title
      };

      data.forEach(item => {
        item.active = false;
        if (item.path === currentRoute.path) {
          hasSome = true;
          item.active = true;
        }
      });

      if (!hasSome) {
        currentRoute.active = true;
        data.push(currentRoute);
      }

      this.setStateData({
        property: "m_routes",
        data
      });
    }
  },
  components: {
    "v-header": PageHeader,
    "v-footer": PageFooter,
    MenuTree: MenuTree
  }
};
</script>

<style lang="scss" scoped>
@import "./scss/index.scss";
</style>