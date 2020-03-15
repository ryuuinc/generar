const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// require own modules
const axiosConfig = require('../../configs/axiosConfig');
const renewConfig = require('./config');
const { await2js } = require('../util');

// prepare phase
const tip = chalk.green.bold;
const axios = require('axios').create(axiosConfig);

/* renew */
const renew = async (config) => {
  // Renew Start
  console.log(tip(`** Renew Start **`));

  let leng = config.length;
  for (let i = 0; i < leng; i++) {
    let { src, url } = config[i];
    let basename = path.basename(src);

    let [error, response] = await await2js(axios.get(url));

    if (error) {
      console.log(tip(`╳ ${basename}`));
    } else {
      fs.writeFileSync(src, response.data);
      console.log(tip(`✓ ${basename}`));
    }
  }

  // Renew End
  console.log(tip(`** Renew End **`));
};

renew(renewConfig);
