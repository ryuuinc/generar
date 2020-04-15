const fs = require('fs');
const droplr = require('droplr-api');

// prepare
const { packPromise } = require('../util');

/* upload */
const upload = async (username, password, axiosOption, resourceConfig) => {
  // message
  let message = [];

  // initial Droplr
  const client = new droplr.Client({
    auth: new droplr.BasicAuth(username, password),
    ...axiosOption
  });

  let leng = resourceConfig.length;
  for (let i = 0; i < leng; i++) {
    let { id, name, path } = resourceConfig[i];
    let content = fs.readFileSync(path, 'utf-8');

    let [error, response] = await packPromise(
      client.drops.update(id, {
        content: content
      })
    );

    if (error) {
      message.push(`╳ ${name}\n`);
    } else {
      message.push(`✓ ${name}\n`);
    }
  }

  return message;
};

module.exports = upload;
