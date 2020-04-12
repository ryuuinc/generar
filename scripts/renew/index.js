const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// require own modules
const axiosOption = require('../../configs/axiosOption');
const { resourceConfig, ruleSetConfig } = require('../../configs/defaultConfig');
const { packPromise } = require('../util');

// prepare phase
const tip = chalk.green.bold;
const axios = require('axios').create(axiosOption);
const renewConfig = [].concat(resourceConfig, ruleSetConfig);

/* renew */
const renew = async (config) => {
  // Renew Start
  console.log(tip(`** Renew Start **`));

  let leng = config.length;
  for (let i = 0; i < leng; i++) {
    let conf = config[i];
    if (conf.url == null) continue;

    let { url, name, path } = conf;
    let [error, response] = await packPromise(axios.get(url));

    if (error) {
      console.log(tip(`╳ ${name}`));
    } else {
      fs.writeFileSync(path, response.data);
      console.log(tip(`✓ ${name}`));
    }
  }

  // Renew End
  console.log(tip(`** Renew End **`));
};

renew(renewConfig);
