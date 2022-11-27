import Mock from "mockjs";
import Tools from "@untils/index.js";
import { MANAGEAPIS } from "@apis/index.js";

// permis Mock数据结构
let permisData = [
  {
    id: 1,
    parent_id: 0,
    menu_name: "用户管理",
    icon: "el-ali-icon-role_icon",
    childrens: [
      { id: 2, parent_id: 1, menu_name: "产品列表", path: "/manage/products" },
      { id: 3, parent_id: 1, menu_name: "用户列表", path: "/manage/users" }
    ]
  },
  {
    id: 4,
    parent_id: 0,
    menu_name: "角色管理",
    icon: "el-ali-icon-institute",
    path: "/manage/roles"
  },
  {
    id: 5,
    parent_id: 0,
    menu_name: "权限管理",
    icon: "el-ali-icon-quanxian",
    path: "/manage/permission"
  },
  {
    id: 6,
    parent_id: 0,
    menu_name: "机构管理",
    icon: "el-ali-icon-LC_icon_user_group_line",
    path: "/manage/orgs"
  }
];

// 获取所有医院信息
Mock.mock(...Tools.someStrucMock(MANAGEAPIS.permis, permisData));
