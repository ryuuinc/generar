const fs = require('fs');
const yaml = require('yaml');

const { padSnippets } = require('../utils');
const { parseString } = require('../utils');
const {
  CLASH_GENERAL_PATH,
  CLASH_COMPLETE_PATH,
  snippets
} = require('../../configs/defaultConfig');

/* generate Clash config */
const generate = (str) => {
  // General Clash Config
  let generalConfig = yaml.parse(fs.readFileSync(CLASH_GENERAL_PATH, 'utf-8'));

  let proxies = parseString(str);
  // customize
  let iplcLines = [];
  let relayLines = [];
  for (let i = 0; i < proxies.length; i++) {
    const { name } = proxies[i];
    switch (true) {
      case /专线/.test(name):
        iplcLines.push(name);
        break;
      case /中继/.test(name):
        relayLines.push(name);
        break;
      default:
        break;
    }
  }
  let proxyGroups = [
    { name: 'MEDIA', type: 'select', proxies: ['RELAY', 'IPLC'] },
    { name: 'DOMAIN', type: 'select', proxies: ['IPLC', 'RELAY'] },
    { name: 'FISHNET', type: 'select', proxies: ['IPLC', 'RELAY'] },
    { name: 'IPLC', type: 'select', proxies: iplcLines },
    { name: 'RELAY', type: 'select', proxies: relayLines }
  ];
  let rules = padSnippets(snippets);

  generalConfig['proxies'] = proxies;
  generalConfig['proxy-groups'] = proxyGroups;
  generalConfig['rules'] = rules.concat(generalConfig['rules']);
  fs.writeFileSync(CLASH_COMPLETE_PATH, yaml.stringify(generalConfig));
};

module.exports = generate;
