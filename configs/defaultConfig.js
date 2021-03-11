let nodeMaps = new Map([
  [
    'ssr',
    {
      fileUrl: process.env.SSR_URL,
      fileName: 'SSR.yaml'
    }
  ],
  [
    'vless',
    {
      fileUrl: process.env.VLESS_URL,
      fileName: 'VLESS.txt'
    }
  ]
]);

let configMaps = new Map([
  ['airport', 'Airport.yaml'],
  ['gateway', 'Gateway.yaml'],
  ['quantumultx', 'QuantumultX.conf']
]);

module.exports = {
  nodeMaps,
  configMaps
};
