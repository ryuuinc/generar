const fs = require('fs');
const yaml = require('yaml');
const Koa = require('koa');
const Router = require('@koa/router');
const axios = require('axios');
require('dotenv').config();

const { packPromise, stringToProxy } = require('./utils');

const app = new Koa();
const router = new Router();

router.get('/sub', async (ctx, next) => {
  let type = ctx.query.name;

  if (type != undefined) {
    let [error, summa] = await packPromise(axios(process.env.CONFIG_URL));
    if (summa != undefined) {
      let content = summa.data.files[process.env.CONFIG_NAME].content;
      let { sub, url, nodes } = JSON.parse(content);

      // process
      let [error, response] = await packPromise(axios(url));
      if (response != undefined && type in sub) {
        // filename
        let fileName = sub[type];
        ctx.set({
          'Content-Type': 'text/plain;charset=utf-8',
          'Content-Disposition': `attachment; filename=${fileName}`
        });

        switch (type) {
          case 'proto':
            ctx.body = response.data;
            break;
          case 'mixed':
            let proxies = nodes.concat(stringToProxy(response.data));
            ctx.body = yaml.stringify({ proxies });
            break;
        }
      }
    }
  }
});

router.get('/conf', async (ctx, next) => {
  let type = ctx.query.name;

  if (type != undefined) {
    let [error, summa] = await packPromise(axios(process.env.CONFIG_URL));
    if (summa != undefined) {
      let content = summa.data.files[process.env.CONFIG_NAME].content;
      let { conf } = JSON.parse(content);

      // process
      let [error, response] = await packPromise(axios(process.env.TEMPLATE_URL));
      if (response != undefined && type in conf) {
        // filename
        let fileName = conf[type];
        ctx.set({
          'Content-Type': 'text/plain;charset=utf-8',
          'Content-Disposition': `attachment; filename=${fileName}`
        });

        ctx.body = response.data.files[fileName].content;
      }
    }
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
