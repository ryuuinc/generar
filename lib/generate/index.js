const fs = require('fs');
const yaml = require('yaml');

const { parseString } = require('../utils');

/* generate proxy yaml */
const generate = (str) => {
  let proxy = {
    proxy: parseString(str)
  };

  return yaml.stringify(proxy);
};

module.exports = generate;
