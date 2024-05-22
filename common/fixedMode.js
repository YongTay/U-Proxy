
import { addSimpleListener, sendMessage} from './common.js'

export const defaultFixedModeConfig = {
  socks5: '',
  bypassList: ''
}

let configCache = Object.assign({}, defaultFixedModeConfig)

export function saveFixedModeConfig(config) {
  if (!config) {
    config = defaultFixedModeConfig
  }
  config = {
    ...defaultFixedModeConfig,
    ...configCache,
    ...config
  }
  configCache = {
    ...config
  }
  sendMessage('saveFixedModeConfig', config)
}

export function onSaveFixedModeConfig(cb) {
  addSimpleListener('saveFixedModeConfig', cb)
}

export function getFixedModeConfig(cb) {
  sendMessage('getFixedModeConfig', '', config => {
    configCache = {
      ...configCache,
      ...config
    }
    cb(configCache)
  })
}

export function onGetFixedModeConfig(cb) {
  addSimpleListener('getFixedModeConfig', cb)
}