<template>
  <div class="test">
    <div class="time-wrap">
      <ul class="time-pointers">
        <li
          class="item-pointer"
          v-for="(item, index) in pointers"
          :key="index"
          :style="'-webkit-transform: rotate('+(item*6)+'deg)'"
        >
          <span class="time-val">{{item%5===0?item/5:''}}</span>
        </li>
      </ul>

      <div class="cc-icon">
        <span class="h-pointer" :style="'-webkit-transform: rotate('+hh+')'"></span>
        <span class="m-pointer" :style="'-webkit-transform: rotate('+mm+')'"></span>
        <span class="s-pointer" :style="'-webkit-transform: rotate('+ss+')'"></span>
      </div>
    </div>
    <div style="font-size: 60px;" @click="changeName">{{userInfo.username}}</div>
  </div>
</template>

<script>
import { TESTAPIS } from "@apis/index.js";
import { mapState, mapActions, mapGetters } from "vuex";
// import SignalrJS from "@ajax/signalr.1.js";
export default {
  name: "test",

  data() {
    return {
      hh: "0deg",
      mm: "0deg",
      ss: "0deg",
      pointers: Array.from({ length: 60 }).map((item, index) => index),
      time: null
    };
  },

  computed: {
    ...mapGetters("login", {
      userInfo: "getUserInfo", // renderCollects 是collectionStatus--modules中getters内的方法
      wardInfo: "getWardInfo"
    }),

    ...mapState({
      login: state => state.login
    })
  },

  mounted() {
    this.computedTime();
    this.asyncData();
  },
  methods: {
    computedTime() {
      clearTimeout(this.time);
      let oDate = new Date();
      let iSec = oDate.getSeconds();
      let iMin = oDate.getMinutes() + iSec / 60;
      let iHour = oDate.getHours() + iMin / 60;
      this.hh = `${iHour * 30}deg`;
      this.mm = `${iMin * 6}deg`;
      this.ss = `${iSec * 6}deg`;
      this.time = setTimeout(this.computedTime, 1000);
      this.changeName();
    },

    changeName() {
      let data = Object.assign({}, this.userInfo);
      data.username = "秒：" + new Date().getSeconds();
      let obj = {
        property: "userInfo",
        data
      };
      this.setStateData(obj);
    },

    async asyncData() {
      // let options = Object.assign({}, TESTAPIS.getUserInfo, {
      //   params: { name: "aa" }
      // });
      // let userInfo = await this._req.ajax(options);
      // let userInfoObj = {
      //   property: "userInfo",
      //   data: userInfo
      // };
      let allWardInfos = await this._req.ajax(TESTAPIS.getAllWardInfos);
      let allWardObj = {
        property: "wardInfo",
        data: allWardInfos.WardInfos[0]
      };
      await this.setStateData(allWardObj);
      // console.log(SignalrJS.stop);
      // let signalr = await SignalrJS.init();

      // signalr.connSignalR({
      //   name: "refresh",
      //   Fn: () => {
      //     console.log(this);
      //   }
      // });
      // await this.setStateData(userInfoObj);
      // this.signalrInit();
    },

    ...mapActions("login", ["setStateData"]),

    signalrInit() {
      signalr.connSignalR(
        () => {
          console.log("init");
        },
        () => {
          console.log("refresh");
        }
      );
    }
  },
  destroyed() {
    clearTimeout(this.time);
    // SignalrJS.stop();
  }
};
</script>

<style lang="scss" scoped>
@import "./scss/index.scss";
</style>