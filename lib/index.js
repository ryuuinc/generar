const fs = require('fs');
const yaml = require('yaml');
const Koa = require('koa');
const Router = require('@koa/router');
const axios = require('axios');
require('dotenv').config();

const axiosConfig = require('../configs/axiosConfig');
const { packPromise, removeUselessTag } = require('./utils');

const app = new Koa();
const router = new Router();

const instance = axios.create({
  timeout: 5000,
  ...axiosConfig
});

const getSetting = async () => {
  let [error, result] = await packPromise(instance(process.env.SETTING_URL));
  if (result != undefined) {
    let content = result.data.files[process.env.SETTING_NAME].content;
    return JSON.parse(content);
  }
};

router.get('/config/:key', async (ctx, next) => {
  // request setting
  let { configs } = await getSetting();

  // get matched config
  for (let index = 0; index < configs.length; index++) {
    let { key, link, fileName, serverKey } = configs[index];
    if (key === ctx.params.key) {
      // request link
      let [error, result] = await packPromise(instance(link));
      if (result != undefined) {
        // set content header
        ctx.set({
          'Content-Type': 'text/plain;charset=utf-8',
          'Content-Disposition': `attachment; filename=${fileName}`
        });

        // replace SERVERKEY
        let content = result.data.files[fileName].content;
        content = content.replace(/SERVERKEY/g, serverKey);

        // return matched config
        ctx.body = content;
      }
    }
  }
});

router.get('/server/:key', async (ctx, next) => {
  // request setting
  let { servers } = await getSetting();

  // get matched server
  for (let index = 0; index < servers.length; index++) {
    let { key, link, fileName, extra } = servers[index];
    if (key === ctx.params.key) {
      // request link
      let [error, result] = await packPromise(instance(link));
      if (result != undefined) {
        // set content header
        ctx.set({
          'Content-Type': 'text/plain;charset=utf-8',
          'Content-Disposition': `attachment; filename=${fileName}`
        });

        // remove useless tag
        let proxies = extra.concat(removeUselessTag(result.data));

        // return matched server
        ctx.body = yaml.stringify({ proxies });
      } else {
        // link respond with empty content or error
        ctx.status = 500;
        ctx.body = {
          message: 'airport is down'
        };
      }
    }
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
