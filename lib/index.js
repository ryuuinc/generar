const fs = require('fs');
const yaml = require('yaml');
const Koa = require('koa');
const Router = require('@koa/router');
const axios = require('axios');
require('dotenv').config();

const { packPromise, stringToProxy } = require('./utils');
const { nodeMaps, configMaps } = require('../configs/defaultConfig');

const app = new Koa();
const router = new Router();

router.get('/', async (ctx, next) => {
  // init
  let queryType = ctx.query.type;
  let queryName = ctx.query.name;
  ctx.set({
    'Content-Type': 'text/plain;charset=utf-8'
  });

  // type para is node
  if (queryType === 'node') {
    // check para is exist
    if (nodeMaps.has(queryName)) {
      let { fileUrl, fileName } = nodeMaps.get(queryName);
      let [error, response] = await packPromise(axios(fileUrl));
      ctx.set({
        'Content-Disposition': `attachment; filename=${fileName}`
      });

      // clash is special
      if (queryName === 'ssr') {
        ctx.body = yaml.stringify({ proxies: stringToProxy(response.data) });
      } else {
        ctx.body = response.data.files[fileName].content;
      }
    } else {
      ctx.body = { errMsg: 'Please provide something important!' };
    }
    // type para is config
  } else if (queryType === 'config') {
    if (configMaps.has(queryName)) {
      let fileName = configMaps.get(queryName);
      let [error, response] = await packPromise(axios(process.env.CONFIG_URL));

      ctx.set({
        'Content-Disposition': `attachment; filename=${fileName}`
      });
      ctx.body = response.data.files[fileName].content;
    } else {
      ctx.body = { errMsg: 'Please provide something important!' };
    }
  } else {
    ctx.body = { errMsg: 'Please provide your prefer type!' };
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(60001);
