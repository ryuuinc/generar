const fs = require('fs');
const yaml = require('yaml');

const padRuleSet = require('../utils/padRuleSet');
const strToProxy = require('../utils/strToProxy');
const {
  CLASH_GENERAL_PATH,
  CLASH_COMPLETE_PATH,
  ruleSetConfig
} = require('../../configs/defaultConfig');

/* generate Clash config */
const generate = (nodeStr) => {
  // General Clash Config
  let generalConf = yaml.parse(fs.readFileSync(CLASH_GENERAL_PATH, 'utf-8'));

  // [Rule]
  let rule = padRuleSet(ruleSetConfig);

  // [Proxy]
  let { proxyArr, iplcArr, relayArr } = strToProxy(nodeStr);

  // [Proxy Group]
  let proxyGroup = [
    { name: '🍎 Apple', type: 'select', proxies: ['DIRECT', 'IPLC'] },
    { name: '📲 Telegram', type: 'select', proxies: ['IPLC', 'RELAY'] },
    { name: '📺 Netflix', type: 'select', proxies: ['RELAY', 'IPLC'] },
    { name: '📺 Youtube', type: 'select', proxies: ['RELAY', 'IPLC'] },
    { name: '🌍 Media', type: 'select', proxies: ['RELAY', 'IPLC'] },
    { name: '🌍 Domain', type: 'select', proxies: ['RELAY', 'IPLC'] },
    { name: '🐟 Final', type: 'select', proxies: ['RELAY', 'IPLC'] },
    { name: 'IPLC', type: 'select', proxies: iplcArr },
    { name: 'RELAY', type: 'select', proxies: relayArr }
  ];

  generalConf['Proxy'] = proxyArr;
  generalConf['Proxy Group'] = proxyGroup;
  generalConf['Rule'] = rule.concat(generalConf['Rule']);
  fs.writeFileSync(CLASH_COMPLETE_PATH, yaml.stringify(generalConf));
};

module.exports = generate;
