// prepare
const { decodeBase64 } = require('../utils');

/* str to 'Proxy' */
const strToProxy = (str) => {
  let entireArr = [];
  let iplcArr = [];
  let relayArr = [];

  let entireObj = JSON.parse(decodeBase64(str.replace(/ssd:\/\//, '')));
  let { port, encryption, password, servers } = entireObj;
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

    entireArr.push({
      name: remarks,
      server: server,
      port: port,
      type: 'ss',
      cipher: encryption,
      password: password
    });
  }

  return {
    entireArr,
    iplcArr,
    relayArr
  };
};

module.exports = strToProxy;
