const Koa = require('koa');
const Router = require('@koa/router');
const axios = require('axios');
require('dotenv').config();

const { packPromise } = require('./utils');
const { nodeMap, configMap } = require('../configs/defaultConfig');

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
    if (nodeMap.has(query.name)) {
      // deal with name
      let node = nodeMap.get(query.name);
      let [error, response] = await packPromise(axios(node.url));
      ctx.set({
        'Content-Disposition': `attachment; filename=${node.type}`
      });

      // clash is special
      if (query.name === 'clash') {
        ctx.body = generate(response.data);
      } else {
        ctx.body = response.data.files[node.type].content;
      }
    } else {
      ctx.body = { errMsg: 'Please provide something important!' };
    }
  } else if (query.type === 'config') {
    // type is config
    if (configMap.has(query.name)) {
      // deal with name
      let fileName = configMap.get(query.name);
      let [error, response] = await packPromise(axios(process.env.CONFIG_URL));
      ctx.set({
        'Content-Disposition': `attachment; filename=${fileName}`
      });

      // deal with content
      let content = response.data.files[fileName].content;
      ctx.body = content;
    } else {
      ctx.body = { errMsg: 'Please provide something important!' };
    }
  } else {
    // need query
    ctx.body = { errMsg: 'Please provide your prefer type!' };
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(55001);
