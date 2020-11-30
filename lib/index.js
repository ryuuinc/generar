const Koa = require('koa');
const Router = require('@koa/router');
const axios = require('axios');
require('dotenv').config();

const { packPromise } = require('./utils');

const generate = require('./generate');

const app = new Koa();
const router = new Router();

router.get('/', async (ctx, next) => {
  let query = ctx.query;

  if (query.type === 'node') {
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
  } else if (query.type === 'config') {
    ctx.set({
      'Content-Type': 'text/plain;charset=utf-8',
      'Content-Disposition': 'attachment; filename=clash-config.yaml'
    });

    let envurl;
    switch (query.name) {
      case 'bwg':
        envurl = process.env.BWG_URL;
        break;
      case 'air':
        envurl = process.env.AIR_URL;
        break;
      default:
        ctx.body = { errMsg: 'Please provide a correct name.' };
        break;
    }

    let [error, response] = await packPromise(axios(envurl));
    ctx.body = generate(response.data);
  } else {
    ctx.body = { errMsg: 'Please provide your prefer type.' };
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(55001);
