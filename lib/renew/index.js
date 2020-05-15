const fs = require('fs');
const path = require('path');
const axios = require('axios');

const { packPromise } = require('../utils');
const axiosConfig = require('../../configs/axiosConfig');

/* renew */
const renew = async (renewConfig) => {
  const instance = axios.create(axiosConfig);

  let leng = renewConfig.length;
  for (let i = 0; i < leng; i++) {
    let conf = renewConfig[i];
    let { url, path } = conf;
    let [error, response] = await packPromise(instance.get(url));

    if (response) {
      fs.writeFileSync(path, response.data);
    } else {
      throw error;
    }
  }
};

module.exports = renew;
