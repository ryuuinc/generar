const Koa = require('koa');
const Router = require('@koa/router');
const axios = require('axios');
require('dotenv').config();

// prepare
const { packPromise } = require('./utils');
const { uploadConfig, ruleSetConfig } = require('../configs/defaultConfig');

// core functions
const generate = require('./generate');
const upload = require('./upload');

// koa and router instance
const app = new Koa();
const router = new Router();

// build
router.post('/', async (ctx, next) => {
  try {
    // get newest node str
    let [error, response] = await packPromise(axios(process.env.SUB_URL));

    if (response) {
      generate(response.data);
      await upload(uploadConfig);
    } else {
      throw error;
    }

    ctx.body = { isDone: true };
  } catch (error) {
    console.log(error);
    ctx.body = { isDone: false };
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(50001);
