const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

// prepare
const padRuleSet = require('./padRuleSet');
const strToProxy = require('./strToProxy');
const CLASH_NODE_PATH = path.resolve(__dirname, '../../files/resources/SSD.txt');
const CLASH_GENERAL_PATH = path.resolve(__dirname, '../../files/clash/general.yaml');
const CLASH_COMPLETE_PATH = path.resolve(__dirname, '../../files/clash/complete.yaml');

/* generate Clash config */
const generate = (ruleSetConfig) => {
  // gen 'Proxy'
  let nodeStr = fs.readFileSync(CLASH_NODE_PATH, 'utf-8').toString();
  let { entireArr, iplcArr, relayArr } = strToProxy(nodeStr);

  // gen 'Proxy Group'
  let proxyGroup = [
    { name: 'Ⓜ️ 微软云盘', type: 'select', proxies: ['🎯 直连', '🚀 专线'] },
    { name: '🍎 苹果服务', type: 'select', proxies: ['🎯 直连', '🚀 专线'] },
    { name: '📲 电报消息', type: 'select', proxies: ['🚀 专线', '✈️ 中继'] },
    { name: '📹 油管视频', type: 'select', proxies: ['✈️ 中继', '🚀 专线'] },
    { name: '🎥 网飞视频', type: 'select', proxies: ['✈️ 中继', '🚀 专线'] },
    { name: '📺 巴哈姆特', type: 'select', proxies: ['✈️ 中继', '🚀 专线'] },
    { name: '🌏 国外媒体', type: 'select', proxies: ['✈️ 中继', '🚀 专线'] },
    { name: '🔰 黑色名单', type: 'select', proxies: ['🚀 专线', '✈️ 中继'] },
    { name: '🐟 漏网之鱼', type: 'select', proxies: ['🚀 专线', '✈️ 中继', '🎯 直连'] },
    { name: '🚀 专线', type: 'select', proxies: iplcArr },
    { name: '✈️ 中继', type: 'select', proxies: relayArr },
    { name: '🎯 直连', type: 'select', proxies: ['DIRECT'] },
    { name: '🛑 拦截', type: 'select', proxies: ['REJECT'] }
  ];

  // gen 'Rule'
  let ruleSet = padRuleSet(ruleSetConfig);

  // generate Clash Complete config
  let generalConf = yaml.parse(fs.readFileSync(CLASH_GENERAL_PATH, 'utf-8'));
  generalConf['Proxy'] = entireArr;
  generalConf['Proxy Group'] = proxyGroup;
  generalConf['Rule'] = ruleSet.concat(generalConf['Rule']);
  fs.writeFileSync(CLASH_COMPLETE_PATH, yaml.stringify(generalConf));
};

module.exports = generate;
