const fs = require('fs');
const path = require('path');
const axios = require('axios');

// prepare
const { packPromise } = require('../util');

/* renew */
const renew = async (axiosOption, renewConfig) => {
  // message
  let message = [];

  // axios instance
  const instance = axios.create(axiosOption);

  let leng = renewConfig.length;
  for (let i = 0; i < leng; i++) {
    let conf = renewConfig[i];
    if (conf.url == null) continue;

    let { url, name, path } = conf;
    let [error, response] = await packPromise(instance.get(url));

    if (error) {
      message.push(`╳ ${name}`);
    } else {
      fs.writeFileSync(path, response.data);
      message.push(`✓ ${name}`);
    }
  }

  return message;
};

module.exports = renew;
