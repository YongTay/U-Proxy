
import { getFixModeConfig } from '../storage.js'

/**
 * 创建不走代理的域名/地址
 */
function createBypassList(fixedBypassConfig) {
  if (!fixedBypassConfig) return []
  const lines = fixedBypassConfig.split(/\r?\n/)
  const len = lines.length
  for (let i=0; i<len; i++) {
    const line = lines[i]
    if (line.includes('//')) {
      lines[i] = ''
    }
  }
  try {
    const list = JSON.parse(lines.join(''))
    return list.map(s => {
      if (s[0] !== '*') {
        return '*' + s
      }
    })
  } catch (e) {
    console.log(e)
    return []
  }
}
async function createCustomFixedConfig() {
  const config = await getFixModeConfig()
  const socks5 = config.socks5
  if (!socks5) return
  const parse = (str = '') => {
    return str.split(':')
  }
  const bypassObj = config.bypassList
  const fixedBypassConfig =  bypassObj.fixedBypassConfig
  const bypassList = createBypassList(fixedBypassConfig)
  const [socks5Ip, socks5Port = '1080'] = parse(socks5)
  return {
    mode: "fixed_servers",
    rules: {
      singleProxy: {
        scheme: "socks5",
        host: socks5Ip,
        port: parseInt(socks5Port)
      },
      bypassList: bypassList // 不走代理的连接，其它连接走代理
    }
  }
}

const defaultConfig = {
  mode: "fixed_servers",
  rules: {
    singleProxy: {
      scheme: "socks5",
      host: "127.0.0.1",
      port: 1080
    },
    // bypassList: createBypassList()
    // bypassList: ['*google.com'] // 不走代理的连接，其它连接走代理
  }
};

export function createConfig() {
  return createCustomFixedConfig().then(config => {
    console.log(JSON.stringify(config))
    return config || defaultConfig
  })
}

export default defaultConfig
