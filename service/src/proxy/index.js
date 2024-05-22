import { createConfig as createFixedConfig } from './fixedProxy.js'
import { createConfig as createPacConfig } from './pacProxy.js';
import {
  onDirectMode,
  onSystemMode,
  onFixedMode,
  onPacMode,
} from '@uproxy/common/proxyHandler.js'
import { getMode } from '../storage.js'
import { FIXED, DIRECT, SYSTEM, PAC } from '@uproxy/common/proxyType.js'
const directConfig = {
  mode: 'direct'
};
const systemConfig = {
  mode: 'system'
}

function switchDirect() {
    chrome.proxy.settings.set(
        { value: directConfig, scope: 'regular' },
        function () {
            console.log('direct mode')
        }
    );
}
onDirectMode(switchDirect)

function switchSystem() {
    chrome.proxy.settings.set(
        { value: systemConfig, scope: 'regular' },
        function () {
            console.log('system mode')
        }
    );
}
onSystemMode(switchSystem)

async function switchFixed() {
    const config = await createFixedConfig()
    if (!config) return
    chrome.proxy.settings.set(
        { value: config, scope: 'regular' },
        function () {
            console.log('fixed mode')
        }
    );
}
onFixedMode(switchFixed)

function switchPac() {
  createPacConfig().then(config => {
    chrome.proxy.settings.set(
      { value: config, scope: 'regular' },
      function () {
        console.log('pac mode')
      }
    );
  })
}
onPacMode(switchPac)

function reloadProxyConfig() {
    console.log('reload config')
    getMode().then(mode => {
        const handlerMap = {
            [FIXED]: switchFixed,
            [DIRECT]: switchDirect,
            [SYSTEM]: switchSystem,
            [PAC]: switchPac
        }
        const handler = handlerMap[mode]
        if (handler) handler()
    })
}


