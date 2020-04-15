const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const chalk = require('chalk');

// require own modules
const padRuleSet = require('./padRuleSet');
const strToNodeGroup = require('./strToNodeGroup');
const {
  CLASH_GENERAL_PATH,
  CLASH_COMPLETE_PATH,
  ruleSetConfig
} = require('../../configs/defaultConfig');

// prepare phase
const tip = chalk.green.bold;
const SSD_PATH = path.resolve(__dirname, '../../files/resources/SSD.txt');

// get Clash 'Rule'
let ruleSet = padRuleSet(ruleSetConfig);

// get Clash 'Proxy'
let ssdStr = fs.readFileSync(SSD_PATH, 'utf-8').toString();
let { entireArr, iplcArr, relayArr } = strToNodeGroup(ssdStr);

// get Clash 'Proxy Group'
let proxyGroup = [
  { name: 'Ⓜ️ 微软', type: 'select', proxies: ['🎯 直连', '🚀 专线'] },
  { name: '🍎 苹果', type: 'select', proxies: ['🚀 专线', '🎯 直连'] },
  { name: '📲 电报', type: 'select', proxies: ['🚀 专线', '✈️ 中继'] },
  { name: '📺 流媒体', type: 'select', proxies: ['✈️ 中继', '🚀 专线'] },
  { name: '🔰 黑名单', type: 'select', proxies: ['🚀 专线', '✈️ 中继'] },
  { name: '🐟 漏网之鱼', type: 'select', proxies: ['🚀 专线', '✈️ 中继', '🎯 直连'] },
  { name: '🚀 专线', type: 'select', proxies: iplcArr },
  { name: '✈️ 中继', type: 'select', proxies: relayArr },
  { name: '🎯 直连', type: 'select', proxies: ['DIRECT'] },
  { name: '🛑 拦截', type: 'select', proxies: ['REJECT'] }
];

/* generate Clash config */
const generate = () => {
  // Generate Start
  console.log(tip('** Generate Start **'));

  // Clash General
  let generalConf = yaml.parse(fs.readFileSync(CLASH_GENERAL_PATH, 'utf-8'));

  // generate Clash Complete config
  generalConf['Proxy'] = entireArr;
  generalConf['Proxy Group'] = proxyGroup;
  generalConf['Rule'] = ruleSet.concat(generalConf['Rule']);
  fs.writeFileSync(CLASH_COMPLETE_PATH, yaml.stringify(generalConf));
  console.log(tip('✓ Clash Complete Config'));

  // Generate End
  console.log(tip('** Generate End **'));
};

generate();
