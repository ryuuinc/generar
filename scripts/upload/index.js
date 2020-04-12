const fs = require('fs');
const chalk = require('chalk');
const droplr = require('droplr-api');

// require own modules
const { packPromise } = require('../util');
const axiosOption = require('../../configs/axiosOption');
const { resourceConfig } = require('../../configs/defaultConfig');
const { username, password } = require('../../configs/droplrAccount');

// prepare phase
const tip = chalk.green.bold;
const client = new droplr.Client({
  auth: new droplr.BasicAuth(username, password),
  ...axiosOption
});

/* upload */
const upload = async (config) => {
  // Upload Start
  console.log(tip('** Upload Start **'));

  let leng = config.length;
  for (let i = 0; i < leng; i++) {
    let { id, name, path } = config[i];
    let content = fs.readFileSync(path, 'utf-8');

    let [error, response] = await packPromise(
      client.drops.update(id, {
        content: content
      })
    );

    if (error) {
      console.log(tip(`╳ ${name}`));
    } else {
      console.log(tip(`✓ ${name}`));
    }
  }

  // Upload End
  console.log(tip('** Upload End **'));
};

upload(resourceConfig);
