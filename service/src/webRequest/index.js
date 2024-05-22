import { timeoutRequestHost } from '@uproxy/common/proxyHandler.js'
import { onOpen } from '@uproxy/common/openHandler.js'
let currentTimeoutHost = ''
chrome.webRequest.onBeforeRequest.addListener((beforeDetails) => {
  const timer = setTimeout(() => {
    console.log('请求超时', beforeDetails.url)
    const url = new URL(beforeDetails.url)
    const idx1 = url.host.lastIndexOf('.')
    const idx2 = url.host.lastIndexOf('.', idx1 - 1)
    const levelOneDomain = url.host.substring(idx2 + 1)
    currentTimeoutHost = levelOneDomain
    timeoutRequestHost(levelOneDomain)
  }, 2000)
  chrome.webRequest.onCompleted.addListener((completedDetails) => {
    clearTimeout(timer)
    const url = new URL(completedDetails.url)
    const idx1 = url.host.lastIndexOf('.')
    const idx2 = url.host.lastIndexOf('.', idx1 - 1)
    const levelOneDomain = url.host.substring(idx2 + 1)
    if (currentTimeoutHost === levelOneDomain) {
      currentTimeoutHost = ''
    }
  }, { urls: ["<all_urls>"] })
}, { urls: ["<all_urls>"] })


onOpen(() => {
  if (currentTimeoutHost) {
    timeoutRequestHost(currentTimeoutHost)
  }
})

export function clear() {
  currentTimeoutHost = ''
}