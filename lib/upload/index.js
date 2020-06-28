const fs = require('fs');
const droplr = require('droplr-api');

const { packPromise } = require('../utils');
const axiosConfig = require('../../configs/axiosConfig');

/* upload */
const upload = async (drops) => {
  const client = new droplr.Client({
    auth: new droplr.BasicAuth(process.env.DP_USERNAME, process.env.DP_PASSWORD),
    ...axiosConfig
  });

  for (let i = 0; i < drops.length; i++) {
    let drop = drops[i];
    let { id, path } = drop;
    let content = fs.readFileSync(path, 'utf-8');

    let [error, response] = await packPromise(
      client.drops.update(id, {
        content
      })
    );

    if (error) {
      throw error;
    }
  }
};

module.exports = upload;
