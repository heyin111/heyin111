import Mock from "mockjs";
import Tools from "@untils/index.js";
import { LOGINAPIS } from "@apis/index.js";

// 当前用户登录信息
let currentUserMsg = {
  name: "",
  pwd: ""
};

// 获取当前用户信息
Mock.mock(...Tools.someStrucMock(LOGINAPIS.login, currentUserMsg));
