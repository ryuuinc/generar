const fs = require('fs');
const yaml = require('yaml');
const Koa = require('koa');
const Router = require('@koa/router');
const axios = require('axios');
require('dotenv').config();

const axiosConfig = require('../configs/axiosConfig');
const { packPromise, stringToProxy } = require('./utils');

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

router.get('/server', async (ctx, next) => {
  // get query type
  let type = ctx.query.type;

  // request setting
  let { servers } = await getSetting();

  // get matched server
  for (let index = 0; index < servers.length; index++) {
    let server = servers[index];
    if (type === server.name) {
      let { fileName, link } = server;
      let extra = 'extra' in server ? server.extra : null;

      // request link
      let [error, result] = await packPromise(instance(link));
      if (result != undefined) {
        // set content header
        ctx.set({
          'Content-Type': 'text/plain;charset=utf-8',
          'Content-Disposition': `attachment; filename=${fileName}`
        });

        // extra deal
        if (extra == null) {
          ctx.body = result.data;
        } else {
          let proxies = extra.concat(yaml.parse(result.data).proxies);
          ctx.body = yaml.stringify({ proxies });
        }
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

router.get('/config', async (ctx, next) => {
  // get query type
  let type = ctx.query.type;

  // request setting
  let { configs } = await getSetting();

  // get matched config
  for (let index = 0; index < configs.length; index++) {
    let config = configs[index];
    if (type === config.name) {
      let { fileName } = config;

      // request link
      let [error, result] = await packPromise(instance(process.env.TEMPLATE_URL));
      if (result != undefined) {
        // set content header
        ctx.set({
          'Content-Type': 'text/plain;charset=utf-8',
          'Content-Disposition': `attachment; filename=${fileName}`
        });

        // return matched config
        ctx.body = result.data.files[fileName].content;
      }
    }
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
