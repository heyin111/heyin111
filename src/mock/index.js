// 在这里可以做一些通用的配置
import Mock from "mockjs";

// 将所有的mock文件引入
require("@mock/test.mock.js");
require("@mock/login.mock.js");
require("@mock/permissions.mock.js");
require("@mock/product_users.mock.js");
require("@mock/products.mock.js");

// 设置所有ajax请求的超时时间，模拟网络传输耗时
Mock.setup({
  timeout: 0 - 200
});
