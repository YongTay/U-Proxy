import { sendMessage, addSimpleListener } from './common'
import { DIRECT, FIXED, SYSTEM, PAC } from './proxyType.js'

const directType = DIRECT
const systemType = SYSTEM
const fixedType = FIXED
const PacType = PAC

export function directMode() {
  sendMessage(directType)
}
export function onDirectMode(cb) {
  addSimpleListener(directType, cb)
}

export function systemMode() {
  sendMessage(systemType)
}
export function onSystemMode(cb) {
  addSimpleListener(systemType, cb)
}

export function fixedMode() {
  sendMessage(fixedType)
}
export function onFixedMode(cb) {
  addSimpleListener(fixedType, cb)
}

export function pacMode() {
  sendMessage(PacType)
}
export function onPacMode(cb) {
  addSimpleListener(PacType, cb)
}

const timeoutRequestHostType = 'TIMEOUTREQUESTHOSTTYPE'
export function timeoutRequestHost(config) {
  sendMessage(timeoutRequestHostType, config)
}
export function onTimeoutRequestHost(cb) {
  addSimpleListener(timeoutRequestHostType, cb)
}
export default {}
