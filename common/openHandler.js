import { sendMessage, addSimpleListener, chromeRuntime } from './common'

export function openOptionsPage() {
  const runtime = chromeRuntime()
  if (runtime) {
    return runtime.openOptionsPage()
  }
  return Promise.resolve()
}

export function saveMode(mode) {
  sendMessage('saveMode', mode)
}
export function onSaveMode(cb) {
  addSimpleListener('saveMode', cb)
}

export function getMode(cb) {
  sendMessage('getMode', '', cb)
}
export function onGetMode(cb) {
  addSimpleListener('getMode', cb)
}


export default {}
