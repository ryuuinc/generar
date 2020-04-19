/* decodeBase64 */
const decodeBase64 = (base64Str) => {
  return new Buffer.from(base64Str, 'base64').toString();
};

/* handle promise */
const packPromise = (promise) => {
  return promise.then((result) => [undefined, result]).catch((error) => [error, undefined]);
};

module.exports = {
  decodeBase64,
  packPromise
};
