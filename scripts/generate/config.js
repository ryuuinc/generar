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
    mode: '🍎 苹果服务'
  },
  {
    name: 'Microsoft.list',
    mode: 'Ⓜ️ 微软服务'
  },
  {
    name: 'Telegram.list',
    mode: '📲 电报服务'
  },
  {
    name: 'ProxyMedia.list',
    mode: '📺 国外媒体'
  },
  {
    name: 'GoogleCN.list',
    mode: '🎯 直连'
  },
  {
    name: 'ProxyLite.list',
    mode: '🔰 常见域名'
  },
  {
    name: 'ChinaDomain.list',
    mode: '🎯 直连'
  },
  {
    name: 'ChinaCompanyIp.list',
    mode: '🎯 直连'
  },
  {
    name: 'Download.list',
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
