const fs = require('fs');
const droplr = require('droplr-api');

// prepare
const { packPromise } = require('../util');
const axiosOption = require('../../configs/axiosOption');
// const { username, password } = require('../../configs/droplrAccount');
const username = process.env.DP_USER;
const password = process.env.DP_PASS;

/* upload */
const upload = async (uploadConfig, errorList) => {
  // initial Droplr
  const client = new droplr.Client({
    auth: new droplr.BasicAuth(username, password),
    ...axiosOption
  });

  let leng = uploadConfig.length;
  for (let i = 0; i < leng; i++) {
    let conf = uploadConfig[i];
    let { id, name, path } = conf;
    let content = fs.readFileSync(path, 'utf-8');

    let [error, response] = await packPromise(
      client.drops.update(id, {
        content: content
      })
    );

    if (error) {
      errorList.count++;
      if (errorList.upload == null) {
        errorList.upload = [];
      }
      errorList.upload.push(conf);
    }
  }
};

module.exports = upload;
