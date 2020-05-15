const fs = require('fs');
const droplr = require('droplr-api');

const { packPromise } = require('../utils');
const axiosConfig = require('../../configs/axiosConfig');

/* upload */
const upload = async (uploadConfig) => {
  const client = new droplr.Client({
    auth: new droplr.BasicAuth(process.env.DP_USERNAME, process.env.DP_PASSWORD),
    ...axiosConfig
  });

  let leng = uploadConfig.length;
  for (let i = 0; i < leng; i++) {
    let conf = uploadConfig[i];
    let { id, path } = conf;
    let content = fs.readFileSync(path, 'utf-8');

    let [error, response] = await packPromise(
      client.drops.update(id, {
        content: content
      })
    );

    if (error) {
      throw error;
    }
  }
};

module.exports = upload;
