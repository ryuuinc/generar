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
    { name: '🔰 Apple', type: 'select', proxies: ['DIRECT', 'IPLC'] },
    { name: '🔰 OneDrive', type: 'select', proxies: ['DIRECT', 'IPLC'] },
    { name: '📮 Telegram', type: 'select', proxies: ['IPLC', 'RELAY'] },
    { name: '📺 Netflix', type: 'select', proxies: ['RELAY', 'IPLC'] },
    { name: '📺 Youtube', type: 'select', proxies: ['RELAY', 'IPLC'] },
    { name: '📺 Bahamut', type: 'select', proxies: ['RELAY', 'IPLC'] },
    { name: '🌍 Media', type: 'select', proxies: ['RELAY', 'IPLC'] },
    { name: '🌍 Domain', type: 'select', proxies: ['IPLC', 'RELAY'] },
    { name: '🗑️ Final', type: 'select', proxies: ['IPLC', 'RELAY', 'DIRECT'] },
    { name: 'IPLC', type: 'select', proxies: iplcArr },
    { name: 'RELAY', type: 'select', proxies: relayArr }
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
