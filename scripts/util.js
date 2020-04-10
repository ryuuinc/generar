const path = require('path');

/* handle promise */
const packPromise = (promise) => {
  return promise.then((result) => [undefined, result]).catch((error) => [error, undefined]);
};

/* resolve path */
const tmpResolve = (src) => path.resolve(__dirname, '../tmp', src);

/* decodeBase64 */
const decodeBase64 = (base64Str) => {
  return new Buffer.from(base64Str, 'base64').toString();
};

module.exports = {
  packPromise,
  tmpResolve,
  decodeBase64
};
