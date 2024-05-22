import { getPacModeConfig } from '../storage.js'

function createPacScript(options) {
  return `
   pacTestFn.push((url, host) => {
    const domains = [${options.domain.split(';').filter(i => i.trim()).map(i => `"${i}"`).join(',')}];
    const proxy = "${options.proxy}";
    for (let i=0; i<domains.length; i++) {
      if (host.endsWith(domains[i])) {
        return proxy;
      }
    }
  });
  `
}

async function createCustomPacConfig() {
  const config = await getPacModeConfig()
  const script = config?.script || ''
  const customsRules = config?.customsRules || []
  const customPacScripts = []
  customsRules.forEach(item => {
    customPacScripts.push(createPacScript(item))
  })
  return {
    mode: 'pac_script',
    pacScript: {
      data: `
        function FindProxyForURL(url, host) {
          var pacTestFn = [];
          function FindProxyForURL(url, host) {
            return 'DIRECT';
          }
          ${script};
          pacTestFn.push((url, host) => {
            return 'DIRECT';
          })
          pacTestFn.push((url, host) => FindProxyForURL(url, host));
          ${customPacScripts.join(';')};
          return function (url, host) {
            for(let i=pacTestFn.length-1; i>0; i--) {
              const res = pacTestFn[i](url, host);
              if(res) {
                return res;
              }
            }
            return 'DIRECT';
          }(url, host);
        }
      `
    }
  }
}

const defaultConfig = {
  mode: 'pac_script',
  pacScript: {
    data: "function FindProxyForURL(url, host) {\n" +
      "  const proxy = 'PROXY 127.0.0.1:7890; SOCKS5 127.0.0.1:7890; SOCKS 127.0.0.1:7890;';\n"+
      "  if (host === 'www.google.com') {" +
      "    return proxy;\n" +
      "  }" +
      "  return 'DIRECT';" +
      "}"
  }
};

export function createConfig() {
  return createCustomPacConfig().then(config => {
    return config || defaultConfig
  })
}

export default defaultConfig
