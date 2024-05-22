
import { onSaveFixedModeConfig, onGetFixedModeConfig } from '@uproxy/common/fixedMode.js'

export function set(key, value) {
  chrome.storage.local.set({[key]: value})
}
export function get(key) {
  return chrome.storage.local.get(key)
}

onSaveFixedModeConfig((config) => {
  console.log('onSaveFixedModeConfig', config)
  set('onSaveFixedModeConfig', config)
})

onGetFixedModeConfig((value, message, sender, sendResponse) => {
  get('onSaveFixedModeConfig').then(res => {
    const config = res.onSaveFixedModeConfig
    console.log('onGetFixedModeConfig', config)
    sendResponse(config)
  })
})

export function getFixModeConfig() {
  return get('onSaveFixedModeConfig').then(res => {
    const config = res.onSaveFixedModeConfig
    return config
  })
}

import { onSaveMode, onGetMode } from '@uproxy/common/openHandler.js'

onSaveMode(config => {
  console.log('onSaveMode', config)
  set('mode', config)
})

onGetMode((value, message, sender, sendResponse) => {
  get('mode').then(res => {
    const config = res.mode
    sendResponse(config)
  })
})

export function getMode() {
  return get('mode').then(res => {
    const config = res.mode
    return config
  })
}

import { onSavePacModeConfig, onGetPacModeConfig } from '@uproxy/common/pacMode.js'

onSavePacModeConfig((config) => {
  console.log('onSavePacModeConfig', config)
  set('onSavePacModeConfig', config)
})

onGetPacModeConfig((value, message, sender, sendResponse) => {
  get('onSavePacModeConfig').then(res => {
    const config = res.onSavePacModeConfig
    console.log('onGetPacModeConfig', config)
    sendResponse(config)
  })
})

export function getPacModeConfig() {
  return get('onSavePacModeConfig').then(res => {
    const config = res.onSavePacModeConfig
    return config
  })
}
