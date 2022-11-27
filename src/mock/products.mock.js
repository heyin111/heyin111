import Mock from "mockjs";
import Tools from "@untils/index.js";
import { PRODUCT } from "@apis/index.js";

// 产品列表 Mock数据结构
let hospitaiMsg = {
  "data|10-25": [
    {
      id: "@id",
      online_num: "@integer(30, 60)",
      product_image: "@image(36x36)",
      "product_name|2": "@string",
      total_num: "@integer(80, 100)"
    }
  ]
};

// 产品列表
Mock.mock(...Tools.someStrucMock(PRODUCT.list, hospitaiMsg));
