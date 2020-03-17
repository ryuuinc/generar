const srcConfig = require('../../configs/srcConfig');

const templateConfig = [
  {
    src: srcConfig.localAreaNetwork,
    mode: '🎯 直连'
  },
  {
    src: srcConfig.apple,
    mode: '🍎 苹果'
  },
  {
    src: srcConfig.microsoft,
    mode: 'Ⓜ️ 微软'
  },
  {
    src: srcConfig.telegram,
    mode: '🔰 线路'
  },
  {
    src: srcConfig.globalMedia,
    mode: '📺 媒体'
  },
  {
    src: srcConfig.googleCN,
    mode: '🎯 直连'
  },
  {
    src: srcConfig.proxyLite,
    mode: '🔰 线路'
  },
  {
    src: srcConfig.chinaDomain,
    mode: '🎯 直连'
  },
  {
    src: srcConfig.chinaCompanyIp,
    mode: '🎯 直连'
  }
];

module.exports = templateConfig;
