const srcConfig = require('../../configs/srcConfig');

const templateConfig = [
  {
    src: srcConfig.localAreaNetwork,
    mode: '🎯 全球直连'
  },
  {
    src: srcConfig.microsoft,
    mode: 'Ⓜ️ 微软服务'
  },
  {
    src: srcConfig.apple,
    mode: '🍎 苹果服务'
  },
  {
    src: srcConfig.globalMedia,
    mode: '📺 国外媒体'
  },
  {
    src: srcConfig.telegram,
    mode: '📲 电报信息'
  },
  {
    src: srcConfig.googleCN,
    mode: '🎯 全球直连'
  },
  {
    src: srcConfig.proxyLite,
    mode: '🔰 线路选择'
  },
  {
    src: srcConfig.chinaDomain,
    mode: '🎯 全球直连'
  },
  {
    src: srcConfig.chinaCompanyIp,
    mode: '🎯 全球直连'
  }
];

module.exports = templateConfig;
