export function VOID() {}

/**
 * @returns {chrome.runtime | undefined}
 */
export function chromeRuntime() {
  return chrome?.runtime
}

/**
 * @function addSimpleListener
 * @param {string} type 消息类型
 * @param {function} callback
 * @param {any} callback.value
 * @param {any} callback.message
 * @param {chrome.runtime.MessageSender} callback.sender
 * @param {any} callback.sendResponse
 */
export function addSimpleListener(type, callback) {
  const runtime = chromeRuntime()
  if(!runtime) {
    console.error('addSimpleListener runtime 为空')
    return
  }
  runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.type === type) {
      callback(message.value, message, sender, sendResponse)
    }
    return true
  })
}

/**
 * 消息简单发送
 * @param type 消息类型
 * @param msg 消息数据
 * @param cb 回调函数
 */
export function sendMessage(type, msg, cb) {
  const runtime = chromeRuntime()
  if(!runtime) {
    console.error('sendMessage runtime 为空')
    return
  }
  return runtime.sendMessage({ type: type, value: msg }, cb)
}

export default {}
