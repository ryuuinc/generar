const path = require('path');

// add path for every item by the name and give folderName
const decoPath = (arr, folderName) => {
  arr.forEach((item) => {
    item.path = path.resolve(__dirname, '../files', folderName, item.name);
  });
};

// add url for for every item by the name and give baseUrl
const decoUrl = (arr, baseUrl) => {
  arr.forEach((item) => {
    item.url = baseUrl + item.name;
  });
};

// necessary urls
// const SUB_URL = 'https://nnn3ro.link/link/g5qkbSRs2U44K5bS';
const SUB_URL = process.env.SUB_URL;
const CLASH_RULE_URL = 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/';
const SHADOWR_RULE_URL = 'https://raw.githubusercontent.com/h2y/Shadowrocket-ADBlock-Rules/master/';

// clash config
let clashConfig = [
  {
    id: 'lvBG4c',
    name: 'general.yaml'
  },
  {
    id: 'rsgfUn',
    name: 'complete.yaml'
  }
];

// resource config
let resourceConfig = [
  {
    id: '7miiBr',
    url: SUB_URL,
    name: 'SSR.txt'
  },
  {
    id: 'dEFEJN',
    url: SUB_URL + '?mu=3',
    name: 'SSD.txt'
  },
  {
    id: 'H1itf2',
    url: SHADOWR_RULE_URL + 'sr_top500_whitelist.conf',
    name: 'WhiteList.conf'
  }
];

// ruleSet config
let ruleSetConfig = [
  {
    mode: '🎯 直连',
    name: 'LocalAreaNetwork.list'
  },
  {
    mode: '🎯 直连',
    name: 'UnBan.list'
  },
  {
    mode: '🍎 苹果',
    name: 'Apple.list'
  },
  {
    mode: 'Ⓜ️ 微软',
    name: 'Microsoft.list'
  },
  {
    mode: '📲 电报',
    name: 'Telegram.list'
  },
  {
    mode: '📺 流媒体',
    name: 'ProxyMedia.list'
  },
  {
    mode: '🎯 直连',
    name: 'GoogleCN.list'
  },
  {
    mode: '🔰 黑名单',
    name: 'ProxyLite.list'
  },
  {
    mode: '🎯 直连',
    name: 'ChinaDomain.list'
  },
  {
    mode: '🎯 直连',
    name: 'ChinaCompanyIp.list'
  },
  {
    mode: '🎯 直连',
    name: 'Download.list'
  }
];

decoPath(clashConfig, 'clash');
decoPath(resourceConfig, 'resources');
decoPath(ruleSetConfig, 'rulesets');
decoUrl(ruleSetConfig, CLASH_RULE_URL);

let renewConfig = [].concat(resourceConfig, ruleSetConfig);
let uploadConfig = [].concat(clashConfig, resourceConfig);

module.exports = {
  renewConfig,
  ruleSetConfig,
  uploadConfig
};
