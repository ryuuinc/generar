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
  // 🎯 全球直连
  localAreaNetwork: pathResolve('../tmp/LocalAreaNetwork.list'),
  // Ⓜ️ 微软服务
  microsoft: pathResolve('../tmp/Microsoft.list'),
  // 🍎 苹果服务
  apple: pathResolve('../tmp/Apple.list'),
  // 📺 国外媒体（神机）
  globalMedia: pathResolve('../tmp/GlobalMedia.list'),
  // 📲 电报信息（神机）
  telegram: pathResolve('../tmp/Telegram.list'),
  // 🎯 全球直连
  googleCN: pathResolve('../tmp/GoogleCN.list'),
  // 🔰 线路选择
  proxyLite: pathResolve('../tmp/ProxyLite.list'),
  // 🎯 全球直连
  chinaDomain: pathResolve('../tmp/ChinaDomain.list'),
  // 🎯 全球直连
  chinaCompanyIp: pathResolve('../tmp/ChinaCompanyIp.list')
};
