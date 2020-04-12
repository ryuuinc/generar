const path = require('path');

// add path for every item by the name and give folderName
const decoPath = (arr, folderName) => {
  arr.forEach((item) => {
    if (item.path == null) {
      item.path = path.resolve(__dirname, '../files', folderName, item.name);
    }
  });
};

// add url for for every item by the name and give baseUrl
const decoUrl = (arr, baseUrl) => {
  arr.forEach((item) => {
    item.url = baseUrl + item.name;
  });
};

// necessary urls
const N3RO_URL = 'https://nnn3ro.link/link/g5qkbSRs2U44K5bS';
const CLASH_RULE_URL = 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/';
const SHADOWR_RULE_URL = 'https://raw.githubusercontent.com/h2y/Shadowrocket-ADBlock-Rules/master/';

// clash config
const CLASH_GENERAL_PATH = path.resolve(__dirname, '../files/clash/general.yaml');
const CLASH_COMPLETE_PATH = path.resolve(__dirname, '../files/clash/complete.yaml');

// resource config
let resourceConfig = [
  {
    id: '7miiBr',
    url: N3RO_URL,
    name: 'SSR.txt'
  },
  {
    id: 'dEFEJN',
    url: N3RO_URL + '?mu=3',
    name: 'SSD.txt'
  },
  {
    id: 'H1itf2',
    url: SHADOWR_RULE_URL + 'sr_top500_whitelist.conf',
    name: 'WhiteList.conf'
  },
  {
    id: 'lvBG4c',
    name: 'ClashGeneral.yaml',
    path: CLASH_GENERAL_PATH
  },
  {
    id: 'rsgfUn',
    name: 'ClashComplete.yaml',
    path: CLASH_COMPLETE_PATH
  }
];

decoPath(resourceConfig, 'resources');

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
    mode: '🍎 苹果服务',
    name: 'Apple.list'
  },
  {
    mode: 'Ⓜ️ 微软服务',
    name: 'Microsoft.list'
  },
  {
    mode: '📲 电报服务',
    name: 'Telegram.list'
  },
  {
    mode: '📺 国外媒体',
    name: 'ProxyMedia.list'
  },
  {
    mode: '🎯 直连',
    name: 'GoogleCN.list'
  },
  {
    mode: '🔰 常见域名',
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

decoUrl(ruleSetConfig, CLASH_RULE_URL);
decoPath(ruleSetConfig, 'rulesets');

module.exports = {
  CLASH_GENERAL_PATH,
  CLASH_COMPLETE_PATH,
  resourceConfig,
  ruleSetConfig
};
