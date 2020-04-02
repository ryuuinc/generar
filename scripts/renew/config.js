const urlConfig = require('../../configs/urlConfig');
const srcConfig = require('../../configs/srcConfig');

// renew config
const renewConfig = [
  {
    src: srcConfig.ssr,
    url: urlConfig.subscribe
  },
  {
    src: srcConfig.ssd,
    url: urlConfig.subscribe + '?mu=3'
  },
  {
    src: srcConfig.whiteList,
    url: urlConfig.shadowrocket + '/sr_top500_whitelist.conf'
  },
  {
    src: srcConfig.googleCN,
    url: urlConfig.aclRuleSet + '/GoogleCN.list'
  },
  {
    src: srcConfig.localAreaNetwork,
    url: urlConfig.aclRuleSet + '/LocalAreaNetwork.list'
  },
  {
    src: srcConfig.chinaDomain,
    url: urlConfig.aclRuleSet + '/ChinaDomain.list'
  },
  {
    src: srcConfig.chinaCompanyIp,
    url: urlConfig.aclRuleSet + '/ChinaCompanyIp.list'
  },
  {
    src: srcConfig.apple,
    url: urlConfig.aclRuleSet + '/Apple.list'
  },
  {
    src: srcConfig.microsoft,
    url: urlConfig.aclRuleSet + '/Microsoft.list'
  },
  {
    src: srcConfig.telegram,
    url: urlConfig.aclRuleSet + '/Telegram.list'
  },
  {
    src: srcConfig.proxyMedia,
    url: urlConfig.aclRuleSet + '/ProxyMedia.list'
  },
  {
    src: srcConfig.proxyLite,
    url: urlConfig.aclRuleSet + '/ProxyLite.list'
  }
];

module.exports = renewConfig;
