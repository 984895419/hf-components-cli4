// @ is an alias to /src
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

const Socket = {
  /**
   * 生成请求头
   * @param ticket
   * @returns {{ticket: *}}
   */
  header(ticket) {
    return {
      ticket: ticket
    }
  },
  /**
   * 连接
   * @param url
   * @param ticket
   * @param showLog
   * @param successHandler
   * @param retry 是否自动重连，默认是
   * @returns {{}}
   */
  connect(url, ticket, showLog, successHandler, retry) {
    let canRetry = retry || true
    const log = this.doLog(showLog)
    const socket = new SockJS(url)
    const stompClient = Stomp.over(socket)
    log('开始连接................')
    const _this = this
    /**
     * 发送消息
     * @param topic
     * @param data
     */
    const sendMsg = function(topic, data) {
      log('正在往主题: ' + topic + '上发送消息, 数据：' + JSON.stringify(data))
      if (data instanceof String) {
        stompClient.send(topic, _this.header(ticket), data)
      } else {
        stompClient.send(topic, _this.header(ticket), JSON.stringify(data))
      }
    }
    /**
     * 订阅主题
     * @param topic 主题
     * @param callback 回调
     */
    const subscribe = function(topic, callback) {
      log('订阅主题: ' + topic)
      if (topic == null) {
        throw new Error('订阅的主题不存在')
      }
      if (callback == null) {
        throw new Error('回调函数不存在')
      }
      stompClient.subscribe(topic, function(greeting) {
        const body = JSON.parse(greeting.body)
        log('订阅主题: ' + topic + ',返回内容为：' + body)
        callback(body)
      })
    }
    /**
     * 断开连接
     */
    const disConnection = function(flag) {
      canRetry = flag
      log('开始断开连接..............begin.....')
      stompClient.disconnect(() => {
      }, _this.header(ticket))
      log('开始断开连接..............end.....')
    }
    // 开始连接
    stompClient.connect(this.header(ticket), function(conn) {
      log('连接成功..............')
      if (successHandler) {
        successHandler({ sendMsg, subscribe, disConnection })
      }
    }, function(msg) {
      // 开始重试
      if (stompClient == null || !stompClient.connected) {
        log('连接失败..................' + msg)
        if (canRetry === true) {
          // 间隔500毫秒后重新连接
          setTimeout(function() {
            try {
              disConnection(canRetry)
            } catch (e) {
              log('断开连接异常：' + e)
            }
            _this.connect(url, ticket, showLog, successHandler, canRetry)
          }, 500)
        }
      }
    })
  },
  doLog(flag) {
    return (msg) => {
      if (flag) {
        console.log(msg)
      }
    }
  }
}

export default Socket
