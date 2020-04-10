const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const droplr = require('droplr-api');

// require own modules
const { packPromise } = require('../util');
const { accountConfig, uploadConfig } = require('./config');
const axiosConfig = require('../../configs/axiosConfig');

// prepare phase
const tip = chalk.green.bold;
const { username, password } = accountConfig;
const client = new droplr.Client({
  auth: new droplr.BasicAuth(username, password),
  ...axiosConfig
});

/* upload */
const upload = async (config) => {
  // Upload Start
  console.log(tip('** Upload Start **'));

  let leng = config.length;
  for (let i = 0; i < leng; i++) {
    let { id, name } = config[i];
    let content = fs.readFileSync(name, 'utf-8');

    let [error, response] = await packPromise(
      client.drops.update(id, {
        content: content
      })
    );

    let basename = path.basename(name);
    if (error) {
      console.log(tip(`╳ ${basename}`));
    } else {
      console.log(tip(`✓ ${basename}`));
    }
  }

  // Upload End
  console.log(tip('** Upload End **'));
};

upload(uploadConfig);
