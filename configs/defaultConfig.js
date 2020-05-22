const path = require('path');

const CLASH_GENERAL_PATH = path.resolve(__dirname, '../files/clash/general.yaml');
const CLASH_COMPLETE_PATH = path.resolve(__dirname, '../files/clash/complete.yaml');

let uploadConfig = [
  {
    id: process.env.DP_DROPID,
    name: 'complete.yaml',
    path: CLASH_COMPLETE_PATH
  }
];

let ruleSetConfig = [
  {
    mode: 'DIRECT',
    name: 'LocalAreaNetwork.list'
  },
  {
    mode: 'DIRECT',
    name: 'UnBan.list'
  },
  {
    mode: '🔰 Apple',
    name: 'Apple.list'
  },
  {
    mode: '📮 Telegram',
    name: 'Telegram.list'
  },
  {
    mode: '📺 Youtube',
    name: 'YouTube.list'
  },
  {
    mode: '📺 Netflix',
    name: 'Netflix.list'
  },
  {
    mode: '📺 Bahamut',
    name: 'Bahamut.list'
  },
  {
    mode: '🌍 Media',
    name: 'ProxyMedia.list'
  },
  {
    mode: 'DIRECT',
    name: 'GoogleCN.list'
  },
  {
    mode: '🌍 Domain',
    name: 'ProxyLite.list'
  },
  {
    mode: 'DIRECT',
    name: 'ChinaDomain.list'
  },
  {
    mode: 'DIRECT',
    name: 'ChinaCompanyIp.list'
  },
  {
    mode: 'DIRECT',
    name: 'Download.list'
  }
];

ruleSetConfig.forEach((item) => {
  item.url = process.env.RULE_URL + item.name;
  item.path = path.resolve(__dirname, '../files/rulesets/', item.name);
});

module.exports = {
  CLASH_GENERAL_PATH,
  CLASH_COMPLETE_PATH,
  uploadConfig,
  ruleSetConfig
};
