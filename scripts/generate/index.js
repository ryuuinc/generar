const fs = require('fs');
const yaml = require('yaml');

// prepare
const padRuleSet = require('./padRuleSet');
const strToProxy = require('./strToProxy');

/* generate Clash config */
const generate = (clashNodePath, clashGeneralPath, clashCompletePath, ruleSetConfig) => {
  // message
  let message = [];

  // gen 'Proxy'
  let nodeStr = fs.readFileSync(clashNodePath, 'utf-8').toString();
  let { entireArr, iplcArr, relayArr } = strToProxy(nodeStr);

  // gen 'Proxy Group'
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

  // gen 'Rule'
  let ruleSet = padRuleSet(ruleSetConfig);

  // generate Clash Complete config
  let generalConf = yaml.parse(fs.readFileSync(clashGeneralPath, 'utf-8'));
  generalConf['Proxy'] = entireArr;
  generalConf['Proxy Group'] = proxyGroup;
  generalConf['Rule'] = ruleSet.concat(generalConf['Rule']);
  fs.writeFileSync(clashCompletePath, yaml.stringify(generalConf));
  message.push('✓ Clash Complete Config');

  return message;
};

module.exports = generate;
