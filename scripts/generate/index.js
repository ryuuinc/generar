const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const chalk = require('chalk');

// require own modules
const templateToRule = require('./rule');
const strToNodeArray = require('./proxy');
const { sourceConfig, templateConfig } = require('./config');

// prepare phase
const { ssd, clashTpl, clashOwn } = sourceConfig;
const tip = chalk.green.bold;

// get Clash 'Rule'
let rule = templateToRule(templateConfig);

// get Clash 'Proxy'
let proxyStr = fs.readFileSync(ssd, 'utf-8').toString();
let { proxyArr, iplcArr, relayArr } = strToNodeArray(proxyStr);

// get Clash 'Proxy Group'
let proxyGroup = [
  { name: '🔰 常见域名', type: 'select', proxies: ['🚀 专线', '✈️ 中继'] },
  { name: '📺 国外媒体', type: 'select', proxies: ['✈️ 中继', '🚀 专线'] },
  { name: '📲 电报服务', type: 'select', proxies: ['🚀 专线', '✈️ 中继'] },
  { name: '🍎 苹果服务', type: 'select', proxies: ['🚀 专线', '🎯 直连'] },
  { name: 'Ⓜ️ 微软服务', type: 'select', proxies: ['🎯 直连', '🚀 专线'] },
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

  // Clash Template
  let clashTemplate = yaml.parse(fs.readFileSync(clashTpl, 'utf-8'));

  // generate Clash Own config
  clashTemplate['Proxy'] = proxyArr;
  clashTemplate['Proxy Group'] = proxyGroup;
  clashTemplate['Rule'] = rule.concat(clashTemplate['Rule']);
  fs.writeFileSync(clashOwn, yaml.stringify(clashTemplate));
  console.log(tip('✓ Clash Own Config'));

  // Generate End
  console.log(tip('** Generate End **'));
};

generate();
