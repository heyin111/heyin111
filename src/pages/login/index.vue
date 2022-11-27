<template>
  <div class="login-page">
    <h1>&nbsp;&nbsp;哈喽，这是马老师的小网站(三方链接)</h1>

    <div class="btn">登录融易通</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import PageHeader from "@components/header/index.vue";
import PageFooter from "@components/footer/index.vue";
import { LOGINAPIS } from "@apis/index.js";
import Tools from "@untils/index.js";

export default {
  name: "login",

  data() {
    return {

    };
  },

  created() {

  },

  mounted() {

  },

  computed: {

  },

  methods: {


    ...mapActions("login", ["setStateData"])
  },

  components: {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
//@import "./scss/index.scss";

.btn{
  background: blue;
  font-size: 20px;
  color: #fff;
  text-align: center;
  padding: 15px 0;
  border-radius: 7px;
  margin-top: 200px;
}
</style>
