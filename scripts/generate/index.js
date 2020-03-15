const fs = require('fs');
const path = require('path');
const YAML = require('yaml');
const chalk = require('chalk');

// require own modules
const templateToRule = require('./rule');
const strToNodeArray = require('./proxy');
const { ssd, clashTpl, clashOwn } = require('../../configs/srcConfig');
const templateConfig = require('./config');

// prepare phase
const tip = chalk.green.bold;

// get Clash 'Rule'
let rule = templateToRule(templateConfig);

// get Clash 'Proxy'
let proxyStr = fs.readFileSync(ssd, 'utf-8').toString();
let { proxyArr, iplcArr, relayArr } = strToNodeArray(proxyStr);

// get Clash 'Proxy Group'
let proxyGroup = [
  { name: '🔰 线路选择', type: 'select', proxies: ['🚀 IPLC', '✈️ RELAY'] },
  { name: '📲 电报信息', type: 'select', proxies: ['🚀 IPLC', '✈️ RELAY'] },
  { name: '📺 国外媒体', type: 'select', proxies: ['✈️ RELAY', '🚀 IPLC'] },
  { name: 'Ⓜ️ 微软服务', type: 'select', proxies: ['🎯 全球直连', '🚀 IPLC'] },
  { name: '🍎 苹果服务', type: 'select', proxies: ['🎯 全球直连', '🚀 IPLC'] },
  {
    name: '🐟 漏网之鱼',
    type: 'select',
    proxies: ['🔰 线路选择', '🚀 IPLC', '✈️ RELAY', '🎯 全球直连']
  },
  { name: '🚀 IPLC', type: 'select', proxies: iplcArr },
  { name: '✈️ RELAY', type: 'select', proxies: relayArr },
  { name: '🎯 全球直连', type: 'select', proxies: ['DIRECT'] }
];

/* generate Clash config */
const generate = () => {
  // Generate Start
  console.log(tip('** Generate Start **'));

  // Clash Template
  let clashTemplate = YAML.parse(fs.readFileSync(clashTpl, 'utf-8'));

  // generate Clash Own config
  clashTemplate['Proxy'] = proxyArr;
  clashTemplate['Proxy Group'] = proxyGroup;
  clashTemplate['Rule'] = rule.concat(clashTemplate['Rule']);
  fs.writeFileSync(clashOwn, YAML.stringify(clashTemplate));
  console.log(tip('✓ Clash Own Config'));

  // Generate End
  console.log(tip('** Generate End **'));
};

generate();
