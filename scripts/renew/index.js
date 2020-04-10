const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// require own modules
const axiosConfig = require('../../configs/axiosConfig');
const renewConfig = require('./config');
const { packPromise } = require('../util');

// prepare phase
const tip = chalk.green.bold;
const axios = require('axios').create(axiosConfig);

/* renew */
const renew = async (config) => {
  // Renew Start
  console.log(tip(`** Renew Start **`));

  let leng = config.length;
  for (let i = 0; i < leng; i++) {
    let { name, url } = config[i];
    let [error, response] = await packPromise(axios.get(url));

    let basename = path.basename(name);
    if (error) {
      console.log(tip(`╳ ${basename}`));
    } else {
      fs.writeFileSync(name, response.data);
      console.log(tip(`✓ ${basename}`));
    }
  }

  // Renew End
  console.log(tip(`** Renew End **`));
};

renew(renewConfig);
