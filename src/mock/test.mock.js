import Mock from "mockjs";
import Tools from "@untils/index.js";
import { TESTAPIS } from "@apis/index.js";

// 所有医院信息 Mock数据结构
let hospitaiMsg = {
  "WardInfos|1": [
    {
      BQDM: /\d{4}/,
      KSDM: /\d{4}/,
      BQMC: "心内科一病区新区",
      KSMC: "心血管内科新区",
      DisplayName: "卫宁未来医院 · 心血管一病区"
    }
  ]
};

// 当前用户信息 Mock数据结构
let currentUserMsg = {
  fullName: "@CNAME",
  userId: "@id",
  username: "@name",
  "TaskGroups|1-7": [
    {
      "GroupID|+1": 7,
      "GroupName|1": "关注",
      "Tasks|0-10": [
        {
          "TaskID|+1": 30,
          "TaskName|1": "化疗",
          "SubPageMode|+1": 30
        }
      ]
    }
  ]
};

Mock.mock(...Tools.someStrucMock(TESTAPIS.getUserInfo, currentUserMsg));
// 获取所有医院信息
Mock.mock(...Tools.someStrucMock(TESTAPIS.getAllWardInfos, hospitaiMsg));
