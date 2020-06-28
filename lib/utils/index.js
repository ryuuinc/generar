const fs = require('fs');

/* decodeBase64 */
const decodeBase64 = (base64Str) => {
  return new Buffer.from(base64Str, 'base64').toString();
};

/* handle promise */
const packPromise = (promise) => {
  return promise.then((result) => [undefined, result]).catch((error) => [error, undefined]);
};

/* padding snippets to rules */
const padSnippets = (snippets) => {
  let rules = [];

  for (let i = 0; i < snippets.length; i++) {
    let { mode, name, path } = snippets[i];
    let snippet = fs.readFileSync(path, 'utf-8').toString();
    let noResolveReg = /no-resolve/;

    snippet = snippet.match(/^(?=IP|DOMAIN)+.*$/gm);

    for (let j = 0; j < snippet.length; j++) {
      let rule = snippet[j];

      if (noResolveReg.test(rule)) {
        rules.push(rule.replace(noResolveReg, (match) => `${mode},${match}`));
      } else {
        rules.push(`${rule},${mode}`);
      }
    }
  }

  return rules;
};

/* parse encode string to proxies */
const parseString = (str) => {
  let proxies = [];
  let ssdObj = JSON.parse(decodeBase64(str.replace(/ssd:\/\//, '')));
  let { port, encryption, password, servers } = ssdObj;
  let leng = servers.length;

  for (let i = 0; i < leng; i++) {
    let { server, remarks } = servers[i];

    proxies.push({
      name: remarks,
      type: 'ss',
      server,
      port,
      password,
      cipher: encryption
    });
  }

  return proxies;
};

module.exports = {
  decodeBase64,
  packPromise,
  padSnippets,
  parseString
};
