const fs = require('fs');
const path = require('path');
const axios = require('axios');

// prepare
const { packPromise } = require('../utils');
const axiosOption = require('../../configs/axiosOption');

/* renew */
const renew = async (renewConfig) => {
  // axios instance
  const instance = axios.create(axiosOption);

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
