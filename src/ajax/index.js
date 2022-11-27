import axios from "axios";
import Tools from "@untils/index.js";

const loading = document.querySelector("#page-loading");
const service = axios.create();
const isMock = process.env.NODE_ENV === "development";
// const isMock = false;
isMock && require("@mock/index.js");

// 全局请求拦截
service.interceptors.request.use(
  config => {
    void (config.loading === false ? 0 : (loading.style.display = "block"));
    let url = encodeURI(config.url);
    let temp = isMock
      ? ""
      : url.indexOf("?") > -1
      ? `&_t=${new Date().getTime()}`
      : `?_t=${new Date().getTime()}`;
    config.url = url + temp;
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// 全局相应拦截
service.interceptors.response.use(
  response => {
    loading.style.display = "none";
    return response;
  },
  err => {
    loading.style.display = "none";
    return Promise.reject(err);
  }
);

export default class Request {
  ajax(options) {
    return new Promise((resolve, reject) => {
      let baseUrl = isMock
        ? ""
        : "https://easy-mock.com/mock/5b95bea7dd236325f85bfa30/prevdata";
      // : "http://172.17.17.210:18084";
      service({
        baseURL: baseUrl,
        method: options.method || "get",
        url: options.url || "",
        params: options.params || null,
        data: options.data || null,
        timeout: options.timeout || null
      })
        .then(
          res => {
            let resData = res.data;

            if (baseUrl.indexOf("http://172.17") > -1) {
              resolve(resData);
              return;
            }

            if (resData.code === 0) {
              resolve(resData.data || resData);
            } else {
              reject(resData);
            }
          },
          err => {
            // 请求错误
            reject(err.response || err);
          }
        )
        .catch(err => {
          reject(err);
        });
    });
  }

  ajaxList(options, _this = null) {
    return new Promise((resolve, reject) => {
      let { paging = true } = options;
      this.ajax(options).then(
        data => {
          let list = data.list || [];
          //分页
          let pagination =
            list.length && paging
              ? {
                  currentPage: data.currentPage,
                  pageSize: data.pageSize,
                  total: data.totalCount
                }
              : {};
          if (_this) {
            _this.list = list;
            _this.pagination = pagination;
          }
          resolve(data);
        },
        err => {
          if (err.message) {
            Tools.tooltip({
              type: "error",
              message: `${err.message}，列表数据请求失败`
            });
          }
          reject(err);
        }
      );
    });
  }
}
