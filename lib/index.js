const Koa = require('koa');
const Router = require('@koa/router');
const axios = require('axios');
const CronJob = require('cron').CronJob;
require('dotenv').config();

// prepare
const { packPromise } = require('./utils');
const { uploadConfig, ruleSetConfig } = require('../configs/defaultConfig');

// core functions
const renew = require('./renew');
const generate = require('./generate');
const upload = require('./upload');

// koa and router instance
const app = new Koa();
const router = new Router();

// cron job
new CronJob('0 0 0 * * *', renew(ruleSetConfig), null, true, 'America/Chicago');

// build
router.post('/', async (ctx, next) => {
  try {
    // get newest node str
    const [error, response] = await packPromise(axios(process.env.SUB_URL));

    if (response) {
      generate(response.data);
      await upload(uploadConfig);
    } else {
      throw error;
    }

    ctx.body = { isDone: true };
  } catch (error) {
    ctx.body = { isDone: false };
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(50001);
