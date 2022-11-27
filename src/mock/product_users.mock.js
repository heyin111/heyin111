import Mock from "mockjs";
import Tools from "@untils/index.js";
import { PRODUCTUSERS } from "@apis/index.js";

// 用户列表信息 mock数据结构
let productUser = PRODUCTUSERS.list('');
let userList = {
  "totalCount": 100,
  "currentPage": 1,
  "pageSize": 10,
  "list|10":[{
      "id": "@id",
      "name": "@name",
      "createTime": "@date(yyyy-MM-dd)",
      "lastLogin": "@datetime",
      "updataTime": "@now"
    }]
};

// 获取当前用户信息
Mock.mock(...Tools.someStrucMock(productUser, userList));
