const fs = require('fs');
const path = require('path');
const axios = require('axios');

// prepare
const { packPromise } = require('../util');
const axiosOption = require('../../configs/axiosOption');

/* renew */
const renew = async (renewConfig, errorList) => {
  // axios instance
  const instance = axios.create(axiosOption);

  let leng = renewConfig.length;
  for (let i = 0; i < leng; i++) {
    let conf = renewConfig[i];
    let { url, name, path } = conf;
    let [error, response] = await packPromise(instance.get(url));

    if (error) {
      errorList.count++;
      if (errorList.renew == null) {
        errorList.renew = [];
      }
      errorList.renew.push(conf);
    } else {
      fs.writeFileSync(path, response.data);
    }
  }
};

module.exports = renew;
