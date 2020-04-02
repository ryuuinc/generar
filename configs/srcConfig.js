const { pathResolve } = require('../scripts/util');

module.exports = {
  // SSR Nodes
  ssr: pathResolve('../tmp/SSR.txt'),
  // SSD Nodes
  ssd: pathResolve('../tmp/SSD.txt'),
  // Clash Tpl
  clashTpl: pathResolve('../tmp/ClashTpl.yaml'),
  // Clash Own
  clashOwn: pathResolve('../tmp/ClashOwn.yaml'),
  // White List(Shadowrocket)
  whiteList: pathResolve('../tmp/WhiteList.conf'),
  // Clash PROXY parts
  telegram: pathResolve('../tmp/Telegram.list'),
  proxyMedia: pathResolve('../tmp/ProxyMedia.list'),
  proxyLite: pathResolve('../tmp/ProxyLite.list'),
  // Clash DIRECT parts
  apple: pathResolve('../tmp/Apple.list'),
  microsoft: pathResolve('../tmp/Microsoft.list'),
  googleCN: pathResolve('../tmp/GoogleCN.list'),
  localAreaNetwork: pathResolve('../tmp/LocalAreaNetwork.list'),
  chinaDomain: pathResolve('../tmp/ChinaDomain.list'),
  chinaCompanyIp: pathResolve('../tmp/ChinaCompanyIp.list')
};
