const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const Droplr = require('droplr-api');

// require own modules
const { await2js } = require('../util');
const { username, password } = require('../../configs/droplrConfig');
const axiosConfig = require('../../configs/axiosConfig');
const uploadConfig = require('./config');

// prepare phase
const tip = chalk.green.bold;
const client = new Droplr.Client({
  auth: new Droplr.BasicAuth(username, password),
  ...axiosConfig
});

/* upload */
const upload = async (config) => {
  // Upload Start
  console.log(tip('** Upload Start **'));

  let leng = config.length;
  for (let i = 0; i < leng; i++) {
    let { id, src } = config[i];
    let basename = path.basename(src);
    let content = fs.readFileSync(src, 'utf-8');

    let [error, response] = await await2js(
      client.drops.update(id, {
        content: content
      })
    );

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
