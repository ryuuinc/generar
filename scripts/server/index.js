const Koa = require('koa');
const Router = require('@koa/router');
require('dotenv').config();

// prepare
const { renewConfig, ruleSetConfig, uploadConfig } = require('../../configs/defaultConfig');

// scripts
const renew = require('../renew');
const generate = require('../generate');
const upload = require('../upload');
let errorList = { count: 0 };

// koa and router instance
const app = new Koa();
const router = new Router();

// build
router.post('/build', async (ctx, next) => {
  await renew(renewConfig, errorList);
  generate(ruleSetConfig, errorList);
  await upload(uploadConfig, errorList);

  // depend on count
  ctx.body = { isDone: errorList.count === 0 ? true : false };
});

// retry
router.post('/retry', async (ctx, next) => {
  let newErrorList = { count: 0 };
  for (let item in errorList) {
    let config = errorList.item;
    switch (item) {
      case 'renew':
        await renew(config, newErrorList);
        break;
      case 'generate':
        await generate(config, newErrorList);
        break;
      case 'upload':
        await await upload(config, newErrorList);
        break;
      default:
        break;
    }
  }
  errorList = newErrorList;

  // depend on count
  ctx.body = { isDone: errorList.count === 0 ? true : false };
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(50001);
