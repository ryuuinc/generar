const Koa = require('koa');
const Router = require('@koa/router');
const axios = require('axios');
require('dotenv').config();

const { packPromise } = require('./utils');

const generate = require('./generate');

const app = new Koa();
const router = new Router();

router.get('/', async (ctx, next) => {
  let querystring = ctx.querystring;

  if (querystring === 'type=airport') {
    let [error, response] = await packPromise(axios(process.env.SUB_URL));

    if (response) {
      ctx.set({
        'Content-Type': 'text/plain;charset=utf-8',
        'Content-Disposition': 'attachment; filename=clash-proxy.yaml'
      });
      ctx.body = generate(response.data);
    } else {
      ctx.body = { errMsg: 'Your subscribe link may be down.' };
    }
  } else {
    ctx.body = { errMsg: 'Please provide your prefer type.' };
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(55001);
