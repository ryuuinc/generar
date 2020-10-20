const path = require('path');

const CLASH_GENERAL_PATH = path.resolve(__dirname, '../files/clash/general.yaml');
const CLASH_COMPLETE_PATH = path.resolve(__dirname, '../files/clash/complete.yaml');

const defaultConfig = {
  CLASH_GENERAL_PATH,
  CLASH_COMPLETE_PATH,
  drops: [
    {
      id: process.env.DP_DROPID,
      name: 'complete.yaml',
      path: CLASH_COMPLETE_PATH
    }
  ]
};

module.exports = defaultConfig;
