const { tmpResolve } = require('../util');
const { username, password, drops } = require('../../configs/droplrConfig');

// deal with all configs
let accountConfig = {
  username,
  password
};

const { ssr, ssd, whiteList, clashOwn } = drops;

let uploadConfig = [
  {
    id: ssr,
    name: 'SSR.txt'
  },
  {
    id: ssd,
    name: 'SSD.txt'
  },
  {
    id: whiteList,
    name: 'WhiteList.conf'
  },
  {
    id: clashOwn,
    name: 'ClashOwn.yaml'
  }
];

uploadConfig.forEach((conf) => {
  conf.name = tmpResolve(conf.name);
});

// const uploadConfig = [
//   {
//     id: droplrConfig.drops.ssr,
//     src: srcConfig.ssr
//   },
//   {
//     id: droplrConfig.drops.ssd,
//     src: srcConfig.ssd
//   },
//   {
//     id: droplrConfig.drops.clashOwn,
//     src: srcConfig.clashOwn
//   },
//   {
//     id: droplrConfig.drops.whiteList,
//     src: srcConfig.whiteList
//   }
// ];

module.exports = {
  accountConfig,
  uploadConfig
};
