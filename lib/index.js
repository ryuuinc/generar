const Koa = require('koa');
const Router = require('@koa/router');
const axios = require('axios');
require('dotenv').config();

const { packPromise } = require('./utils');

const generate = require('./generate');

const app = new Koa();
const router = new Router();

router.get('/', async (ctx, next) => {
  // init
  let query = ctx.query;
  ctx.set({
    'Content-Type': 'text/plain;charset=utf-8'
  });

  if (query.type === 'node') {
    // type is node
    let [error, response] = await packPromise(axios(process.env.SUB_URL));

    if (response) {
      ctx.set({
        'Content-Disposition': 'attachment; filename=clash-proxy.yaml'
      });
      ctx.body = generate(response.data);
    } else {
      ctx.body = { errMsg: 'Your subscribe link may be down.' };
    }
  } else if (query.type === 'config') {
    // type is config
    let envurl;
    ctx.set({
      'Content-Disposition': 'attachment; filename=clash-config.yaml'
    });

    // different config name
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
    let files = response.data.files;
    let fileNames = Object.keys(files);
    let configName = fileNames[0];
    ctx.body = files[configName].content;
  } else {
    // need query
    ctx.body = { errMsg: 'Please provide your prefer type.' };
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(55001);
