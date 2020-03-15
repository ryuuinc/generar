const srcConfig = require('../../configs/srcConfig');
const droplrConfig = require('../../configs/droplrConfig');

const uploadConfig = [
  {
    id: droplrConfig.drops.ssr,
    src: srcConfig.ssr
  },
  {
    id: droplrConfig.drops.ssd,
    src: srcConfig.ssd
  },
  {
    id: droplrConfig.drops.clashOwn,
    src: srcConfig.clashOwn
  },
  {
    id: droplrConfig.drops.whiteList,
    src: srcConfig.whiteList
  }
];

module.exports = uploadConfig;
