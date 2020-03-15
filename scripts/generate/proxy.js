// require own modules
const { decodeBase64 } = require('../util');

/* str to node array */
const strToNodeArray = (str) => {
  let proxyArr = [];
  let iplcArr = [];
  let relayArr = [];

  let proxyObj = JSON.parse(decodeBase64(str.replace(/ssd:\/\//, '')));
  let { port, encryption, password, servers } = proxyObj;
  let leng = servers.length;

  for (let i = 0; i < leng; i++) {
    let { server, remarks } = servers[i];

    switch (true) {
      case /专线/.test(remarks):
        iplcArr.push(remarks);
        break;
      case /中继/.test(remarks):
        relayArr.push(remarks);
        break;
      default:
        break;
    }

    proxyArr.push({
      name: remarks,
      server: server,
      port: port,
      type: 'ss',
      cipher: encryption,
      password: password
    });
  }

  return {
    proxyArr,
    iplcArr,
    relayArr
  };
};

module.exports = strToNodeArray;
