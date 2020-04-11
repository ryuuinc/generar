const { tmpResolve } = require('../util');
const urlConfig = require('../../configs/urlConfig');

// deal with all configs
const { ssrSub, ssdSub, whiteList, ruleSet } = urlConfig;

let subConf = [
  {
    name: 'SSR.txt',
    url: ssrSub
  },
  {
    name: 'SSD.txt',
    url: ssdSub
  }
];

let listConf = [
  {
    name: 'WhiteList.conf',
    url: whiteList
  }
];

let setList = [
  'LocalAreaNetwork.list',
  'UnBan.list',
  'GoogleCN.list',
  'Microsoft.list',
  'Apple.list',
  'Telegram.list',
  'ProxyMedia.list',
  'ProxyLite.list',
  'ChinaDomain.list',
  'ChinaCompanyIp.list',
  'Download.list'
];

let setConf = setList.map((name) => {
  return {
    name,
    url: ruleSet + name
  };
});

let renewConfig = [].concat(subConf, listConf, setConf);

renewConfig.forEach((conf) => {
  conf.name = tmpResolve(conf.name);
});

module.exports = renewConfig;
