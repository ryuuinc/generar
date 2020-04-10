const { tmpResolve } = require('../util');

// deal with all configs
let sourceConfig = {
  ssd: 'SSD.txt',
  clashTpl: 'ClashTpl.yaml',
  clashOwn: 'ClashOwn.yaml'
};

for (let name in sourceConfig) {
  sourceConfig[name] = tmpResolve(sourceConfig[name]);
}

let templateConfig = [
  {
    name: 'LocalAreaNetwork.list',
    mode: '🎯 直连'
  },
  {
    name: 'UnBan.list',
    mode: '🎯 直连'
  },
  {
    name: 'Apple.list',
    mode: '🍎 苹果'
  },
  {
    name: 'Microsoft.list',
    mode: 'Ⓜ️ 微软'
  },
  {
    name: 'Telegram.list',
    mode: '📲 电报'
  },
  {
    name: 'ProxyMedia.list',
    mode: '📺 媒体'
  },
  {
    name: 'GoogleCN.list',
    mode: '🎯 直连'
  },
  {
    name: 'ProxyLite.list',
    mode: '🔰 线路'
  },
  {
    name: 'ChinaDomain.list',
    mode: '🎯 直连'
  },
  {
    name: 'ChinaCompanyIp.list',
    mode: '🎯 直连'
  }
];

templateConfig.forEach((conf) => {
  conf.name = tmpResolve(conf.name);
});

module.exports = {
  sourceConfig,
  templateConfig
};
