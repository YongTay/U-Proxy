import { addSimpleListener, sendMessage} from './common.js'

const defaultPacModeConfig = {
  customProxy: [],
  customsRules: [],
  url: '',
  script: ''
}
let configCache = Object.assign({}, defaultPacModeConfig)
export function savePacModeConfig(config) {
  if (!config) {
    config = defaultPacModeConfig
  }
  config = {
    ...defaultPacModeConfig,
    ...configCache,
    ...config
  }
  configCache = {
    ...config
  }
  sendMessage('savePacModeConfig', config)
}
export function onSavePacModeConfig(cb) {
  addSimpleListener('savePacModeConfig', cb)
}

export function getPacModeConfig(cb) {
  sendMessage('getPacModeConfig', '', config => {
    configCache = {
      ...configCache,
      ...config
    }
    cb(configCache)
  })
}
export function onGetPacModeConfig(cb) {
  addSimpleListener('getPacModeConfig', cb)
}
