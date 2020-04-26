const Koa = require('koa');
const Router = require('@koa/router');
require('dotenv').config();

// prepare
const { renewConfig, ruleSetConfig, uploadConfig } = require('../configs/defaultConfig');

// core functions
const renew = require('./renew');
const generate = require('./generate');
const upload = require('./upload');

// koa and router instance
const app = new Koa();
const router = new Router();

// build
router.post('/', async (ctx, next) => {
  try {
    await renew(renewConfig);
    generate(ruleSetConfig);
    await upload(uploadConfig);
    ctx.body = { isDone: true };
  } catch (error) {
    console.log(error);
    ctx.body = { isDone: false };
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(50001);
