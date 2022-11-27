import 'signalr/jquery.signalR.js';

const baseUrl = 'http://172.17.17.210:18084';
const $ = require('jquery');
const HUBNAME = 'serverHub';
var connection = $.hubConnection(baseUrl);
var chat = connection.createHubProxy(HUBNAME);
connection.logging = true;
connection.disconnectTimeout = 0;
var timer = null;

export function signalrConnect() {
  let obj = JSON.parse(sessionStorage.getItem('admin_vuex'));
  let bqdm = obj.login.wardInfo.BQDM;
  let ksdm = obj.login.wardInfo.KSDM;
  connection
    .start()
    .done(function () {
      console.log('Now connected, connection ID=' + connection.id);
      sessionStorage.setItem('wardinfos', JSON.stringify({
        bqdm,
        ksdm
      }));
      chat
        .invoke('login', bqdm, ksdm)
        .done(function () {
          console.log('执行 login  succeeded');
          console.log(bqdm, ksdm);
        })
        .fail(function (error) {
          console.log('执行 login Error: ' + error);
        })
    })
    .fail(function () {
      console.log('Could not connect');
    })
}

export function stop() {
  connection.stop()
}

export function connSignalR(callback1 = null, callback2 = null) {
  let obj = JSON.parse(sessionStorage.getItem('admin_vuex'));
  let bqdm = obj.login.wardInfo.BQDM;
  let ksdm = obj.login.wardInfo.KSDM;
  let wardinfos = JSON.parse(sessionStorage.getItem('wardinfos'));
  if (connection.id) {
    if (bqdm === wardinfos.bqdm && ksdm === wardinfos.ksdm) {
      return
    } else {
      console.log(connection.state, bqdm, ksdm)
      signalrConnect();
      return
    }
  }

  //onDataReady 触发 callback1
  chat.on('onDataReady', function (name, message) {
    callback1&&callback1(name, message)
  });

  //refresh 触发 callback2
  chat.on('refresh', function (name, message) {
    callback2&&callback2(name, message);
  });

  signalrConnect();

  connection.error(function (error) {
    console.log('SignalR error: ' + error);
  });

  connection.connectionSlow(function () {
    console.log('当客户端检测到缓慢或者不流畅的连接的时候执行')
  });

  connection.disconnected(function () {
    console.log('disconnected');
    sessionStorage.removeItem('key');
    sessionStorage.removeItem('wardinfos');

    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      signalrConnect()
    }, 5000)
  });

  connection.reconnecting(function () {
    console.log('reconnecting')
  });

  connection.reconnected(function () {
    console.log('reconnected');
    signalrConnect()
  })
}
