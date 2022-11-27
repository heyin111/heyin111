import "babel-polyfill";
import promise from "es6-promise";
import Vue from "vue";
import App from "@/index.vue";
import ElementUi from "element-ui";

import router from "@router/index.js";
import Request from "@ajax/index.js";
import store from "@store/index.js";
import "signalr/jquery.signalR.js";

import "element-ui/lib/theme-chalk/index.css";
import "@assets/style/reset.scss";
// import '@assets/style/iconfont.css';
promise.polyfill();

Vue.config.productionTip = false;
Vue.prototype._req = new Request();
Vue.use(ElementUi);

new Vue({
  store: store,
  render: h => h(App),
  router
}).$mount("#app");
