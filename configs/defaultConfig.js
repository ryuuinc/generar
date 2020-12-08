// node map
let nodeMap = new Map([
  [
    'clash',
    {
      url: process.env.SUB_URL,
      type: 'Clash-Node.yaml'
    }
  ],
  [
    'v2ray',
    {
      url: process.env.NODE_URL,
      type: 'V2Ray.txt'
    }
  ]
]);

// config map
let configMap = new Map([
  ['n3ro', 'N3RO.yaml'],
  ['linode', 'Linode.yaml'],
  ['bandwagon', 'Bandwagon.yaml'],
  ['quantumultx', 'QuantumultX.conf']
]);

module.exports = {
  nodeMap,
  configMap
};
