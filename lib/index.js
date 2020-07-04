const Koa = require('koa');
const Router = require('@koa/router');
const axios = require('axios');
require('dotenv').config();

const { packPromise } = require('./utils');
const { drops } = require('../configs/defaultConfig');

const generate = require('./generate');
const upload = require('./upload');

const app = new Koa();
const router = new Router();

router.post('/', async (ctx, next) => {
  try {
    let [error, response] = await packPromise(axios(process.env.SUB_URL));

    if (response) {
      generate(response.data);
      await upload(drops);
    } else {
      throw error;
    }

    ctx.body = { isDone: true };
  } catch (error) {
    ctx.body = { isDone: false };
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(55001);
