const path = require('path');

/* handle promise */
const await2js = (promise) => {
  return promise.then((result) => [undefined, result]).catch((error) => [error, undefined]);
};

/* resolve path */
const pathResolve = (src) => path.resolve(__dirname, src);

/* decodeBase64 */
const decodeBase64 = (base64Str) => {
  return new Buffer.from(base64Str, 'base64').toString();
};

module.exports = {
  await2js,
  pathResolve,
  decodeBase64
};
