const fs = require('fs');
const yaml = require('yaml');

const { parseString } = require('../utils');

/* generate proxies yaml */
const generate = (str) => {
  let proxies = {
    proxies: parseString(str)
  };

  return yaml.stringify(proxies);
};

module.exports = generate;
