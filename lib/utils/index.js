const fs = require('fs');
const yaml = require('yaml');

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

/* clean tags */
const cleanTags = (str) => {
  let content = yaml.parse(str);
  let proxies = content.proxies;

  for (let index = 0; index < proxies.length; index++) {
    let proxy = proxies[index];
    let newStr = proxy.name.replace(/\[.*?\]/g, '');
    proxy.name = newStr;
  }

  return proxies;
};

/* filter nodes */
const filterNodes = (proxies, reg) => {
  let newArr = [];
  for (let index = 0; index < proxies.length; index++) {
    let node = proxies[index];
    let name = node.name;
    if (reg.test(name)) {
      newArr.push(node);
    }
  }

  return newArr;
};

/* transform encode ssr str to standard proxy array */
const ssrStringToProxy = (str) => {
  let nodes = decodeBase64(str).match(/(?<=ssr:\/\/).*/g);
  let proxies = [];

  for (let i = 0; i < nodes.length; i++) {
    let node = decodeBase64(nodes[i]);
    let config = node.split('/?');
    let basicPart = config[0].split(':');
    let extraPart = config[1].split('&');
    let extraObj = {};

    for (let j = 0; j < basicPart.length; j++) {
      let part = basicPart[j];
      if (j === basicPart.length - 1) {
        // decode passwd
        part = decodeBase64(part);
      }
      basicPart[j] = part;
    }

    for (let k = 0; k < extraPart.length; k++) {
      let part = extraPart[k].split('=');
      extraObj[part[0]] = decodeBase64(part[1]);
    }

    proxies.push({
      type: 'ssr',
      server: basicPart[0],
      port: basicPart[1],
      protocol: basicPart[2],
      cipher: basicPart[3],
      obfs: basicPart[4],
      password: basicPart[5],
      name: extraObj.remarks,
      'obfs-param': extraObj.obfsparam,
      'protocol-param': extraObj.protoparam
    });
  }

  return proxies;
};

module.exports = {
  decodeBase64,
  packPromise,
  padSnippets,
  cleanTags,
  filterNodes,
  ssrStringToProxy
};
