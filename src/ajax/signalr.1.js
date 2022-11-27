import "signalr/jquery.signalR.js";
import configs from "@assets/static/configs.js";

const TRYTIME = 3;
let obj = JSON.parse(sessionStorage.getItem("admin_vuex")) || {};
let { BQDM, KSDM } = obj.login.wardInfo;

class SignalrJS {
  constructor() {
    this.timer = null;
    this.reTimes = TRYTIME;
  }

  // 连接
  connect() {
    return new Promise((resolve, reject) => {
      this.connection
        .start()
        .done(() => {
          sessionStorage.setItem(
            "wardinfos",
            JSON.stringify({
              BQDM,
              KSDM
            })
          );
          console.log(`connection ID：${this.connection.id} 连接成功`);
          resolve();
        })
        .fail(() => {
          this.reConnect();
          reject();
        });
    });
  }

  // 重新连接
  reConnect() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (!this.reTimes) {
        this.reTimes = TRYTIME;
        clearTimeout(this.timer);
        console.log(
          `connection ID：${this.connection.id} 连接失败，请尝试刷新进行恢复！`
        );
      } else {
        this.reConnect();
        this.reTimes -= 1;
        console.log(
          `connection ID：${
            this.connection.id
          }连接失败， 正在尝试连接第${TRYTIME - this.reTimes}次`
        );
      }
    }, 1000);
  }

  // 登录
  async login() {
    await this.connect();
    return new Promise((resolve, reject) => {
      this.chat
        .invoke("login", BQDM, KSDM)
        .done(() => {
          console.log(`BQDM：${BQDM}, KSDM：${KSDM}, 登录成功`);
          resolve();
        })
        .fail(() => {
          this.relogin();
          reject();
        });
    });
  }

  // 重新登录
  relogin() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (!this.reTimes) {
        this.reTimes = TRYTIME;
        clearTimeout(this.timer);
        console.log(
          `BQDM：${BQDM}, KSDM：${KSDM}, 登录失败，请尝试刷新进行恢复！`
        );
      } else {
        this.login();
        this.reTimes -= 1;
        console.log(
          `BQDM：${BQDM}, KSDM：${KSDM},登录失败， 正在尝试连第${this.tryTimes -
            this.reTimes}次`
        );
      }
    }, 1000);
  }

  // 监听变化
  connSignalR() {
    let listens = [...arguments];
    listens.forEach(item => {
      this[item.name] = item.Fn;
      this.chat.on(item.name, () => {
        item.Fn && item.Fn();
      });
    });
  }

  // 初始化
  async init(config = configs.serve) {
    this.connection = $.hubConnection(config.baseUrl);
    this.chat = this.connection.createHubProxy(config.hubName);
    this.connection.logging = true;
    this.connection.disconnectTimeout = 0;
    await this.connect();
    await this.login();
    return new Promise(resolve => resolve(this));
  }

  // 停止
  stop() {
    this.connection.stop();
  }

  // 检测
  detections() {
    let events = [
      {
        type: "stop",
        txt: "stop"
      },
      {
        type: "error",
        txt: "error"
      },
      {
        type: "connectionSlow",
        txt: "connectionSlow"
      },
      {
        type: "disconnected",
        txt: "disconnected"
      },
      {
        type: "reconnecting",
        txt: "reconnecting"
      },
      {
        type: "reconnected",
        txt: "reconnected"
      }
    ];

    events.forEach(item, () => {
      this.connection[item.type] = () => {
        console.log(item.txt);
      };
    });
  }
}

export default new SignalrJS();
