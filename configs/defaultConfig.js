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
    'vmess',
    {
      url: process.env.NODE_URL,
      type: 'VMess.txt'
    }
  ]
]);

// config map
let configMap = new Map([
  ['airport', 'Airport.yaml'],
  ['bandwagon', 'Bandwagon.yaml'],
  ['quantumultx', 'QuantumultX.conf']
]);

module.exports = {
  nodeMap,
  configMap
};
