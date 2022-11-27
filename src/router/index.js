import Vue from "vue";
import VueRouter from "vue-router";

/* // 非路由懒加载 引入路由
import Login from '@pages/login/index.vue';
import Home from '@pages/home/index.vue';
import Intr from '@pages/intr/index.vue';
import Manage from '@pages/manage/index.vue';
import Products from '@pages/products/index.vue';
import ProductUser from '@pages/product_users/index.vue';
import Users from '@pages/users/index.vue';
import Orgs from '@pages/orgs/index.vue';
import Permission from '@pages/permission/index.vue';
import Roles from '@pages/roles/index.vue';
import Test from '@pages/test/index.vue'; */

Vue.use(VueRouter);

const debug = process.env.NODE_ENV !== "production";

/* // 非路由懒加载 路由的创建
const routes = [
    {
        path: '/login',
        component: Login,
        alias: '/lg'
    },{
        path: '/home',
        component: Home
    },{
        path: '/intr',
        component: Intr
    },{
        path: '/test',
        component: Test
    },{
        path: '/manage',
        component: Manage,
        children: [{
            path: 'products',
            component: Products
        },{
            path: 'product_users/:id',
            component: ProductUser
        },{
            path: 'users',
            component: Users
        },{
            path: 'orgs',
            component: Orgs
        },{
            path: 'permission',
            component: Permission
        },{
            path: 'roles',
            component: Roles
        },{
            path: '',
            redirect: '/manage/products'
        }]
    },{
        path: '/',
        redirect: '/login',
    }
]; */

// splitRouter
const splitRouter = [
  {
    path: "/login",
    component: resolve => require(["@pages/login/index.vue"], resolve),
    meta: { title: "login" },
    alias: "/lg"
  },
  {
    path: "/home",
    component: resolve => require(["@pages/home/index.vue"], resolve),
    meta: { title: "home" }
  },
  {
    path: "/intr",
    component: resolve => require(["@pages/intr/index.vue"], resolve),
    meta: { title: "intr" }
  },
  {
    path: "/test",
    component: resolve => require(["@pages/test/index.vue"], resolve),
    meta: { title: "test" }
  },
  {
    path: "/manage",
    component: resolve => require(["@pages/manage/index.vue"], resolve),
    children: [
      {
        path: "products",
        component: resolve => require(["@pages/products/index.vue"], resolve),
        meta: { title: "products" }
      },
      {
        path: "product_users/:id",
        component: resolve =>
          require(["@pages/product_users/index.vue"], resolve),
        meta: { title: "product_users" }
      },
      {
        path: "users",
        component: resolve => require(["@pages/users/index.vue"], resolve),
        meta: { title: "users" }
      },
      {
        path: "orgs",
        component: resolve => require(["@pages/orgs/index.vue"], resolve),
        meta: { title: "orgs" }
      },
      {
        path: "permission",
        component: resolve => require(["@pages/permission/index.vue"], resolve),
        meta: { title: "permission" }
      },
      {
        path: "roles",
        component: resolve => require(["@pages/roles/index.vue"], resolve),
        meta: { title: "roles" }
      },
      {
        path: "",
        redirect: "/manage/products"
      }
    ]
  },
  {
    path: "/",
    redirect: "/login"
  }
];

if (!debug) {
  // routes.splice(3, 1);
  splitRouter.splice(3, 1);
}

export default new VueRouter({
  mode: "hash",
  routes: splitRouter
});
