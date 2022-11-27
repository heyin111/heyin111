import { Message } from "element-ui";
import moment from "moment";
import Mock from "mockjs";

class Tools {
  // 返回指定个数的数组
  createArray(n) {
    return Array.from({ length: n }).map(
      (item, index) => new Date().getTime() + index
    );
  }

  // 提示
  tooltip(obj) {
    let {
      type = "error",
      message = "请传入提示语",
      duration = 2000,
      showClose = false,
      center = true,
      onClose = () => {
        return false;
      }
    } = obj;
    Message({
      type,
      message,
      duration,
      showClose,
      center,
      customClass: "tooltip",
      onClose
    });
  }
  // 存储
  storage(type = "session", name = "", data = {}) {
    if (!name) return;
    let storageData = JSON.stringify(data);
    type === "session"
      ? window.sessionStorage.setItem(name, storageData)
      : window.localStorage.setItem(name, storageData);
  }
  // 获取存储
  getStorage(type = "session", name = "") {
    if (!name) return;
    let data =
      type === "session"
        ? window.sessionStorage.getItem(name)
        : window.localStorage.getItem(name);
    if (!data || !Object.keys(data)) return null;
    return JSON.parse(data);
  }
  // 路由跳转
  routerPath(path) {
    if (!path) return false;
    this.$router.push(path);
  }
  // 时间格式化
  formatTime(value, format = "YYYY-MM-DD HH:mm:ss") {
    return moment(value).format(format);
  }
  // js暂停
  sleep(t) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, t * 1000);
    });
  }
  // 截取问号后的参数
  splitParmas(url) {
    let obj = {};
    let i = url.indexOf("?");
    if (i === -1) return obj;
    let params = url.substr(i + 1).split("&");
    params.forEach(item => {
      let itemSplit = item.split("=");
      let key = itemSplit[0];
      let val = itemSplit[1];
      obj[key] = val;
    });

    return obj;
  }

  // mock params
  mockParams(options) {
    let { type = "get", url = "", body = {} } = options;
    type = type.toLowerCase();
    let params =
      type === "get" || type === "delete"
        ? this.splitParmas(url)
        : JSON.parse(body);
    return params;
  }

  // module some mock data
  someStrucMock(options, struc = {}) {
    let { url, method } = options;
    let api = RegExp(url + ".*");
    let result = {
      code: 0,
      msg: "success"
    };
    let data = Mock.mock(struc);
    let keys = Object.keys(data);
    method = method.toLowerCase();
    if (keys.length === 1 && keys[0] === "data") {
      Object.assign(result, data);
    } else {
      Object.assign(result, { data });
    }
    let cb = o => {
      let requsetAgus =
        method === "get" || method === "delete"
          ? this.splitParmas(o.url)
          : this.mockParams(o);
      if (o.url === "/login") {
        result.data = requsetAgus;
      }
      console.log(
        `%c${o.url || ""}，${method}，参数：`,
        "background: rgba(0, 0, 0, .8); color: #bada55",
        requsetAgus
      );
      console.log(
        `%c${o.url || ""}，${method}, 结果：`,
        "background: rgba(0, 0, 0, .8); color: #bada55",
        result,
        "\n\n ----->"
      );
      return result;
    };
    return [api, method, cb];
  }
}

export default new Tools();
