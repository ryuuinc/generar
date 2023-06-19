const fs = require('fs');
const yaml = require('yaml');
const Koa = require('koa');
const Router = require('@koa/router');
const axios = require('axios');
require('dotenv').config();

const axiosConfig = require('../configs/axiosConfig');
const { packPromise, cleanTags, filterNodes } = require('./utils');

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

const getList = (href, uri, array) => {
  let content = array.map((value, index) => {
    let { tag, key, fileName } = value;
    let link = `${href}/${uri}/${key}`;
    return {
      tag,
      link,
      fileName
    };
  });
  return content;
};

router.get('/list', async (ctx, next) => {
  // request setting
  let { href, configs, servers } = await getSetting();

  // init
  let list = {
    servers: getList(href, 'server', servers),
    configs: getList(href, 'config', configs)
  };

  // set content header
  ctx.set({
    'Content-Type': 'application/json;charset=utf-8'
  });

  // return matched list
  ctx.body = JSON.stringify(list, null, 2);
});

router.get('/server/:key', async (ctx, next) => {
  // request setting
  let { servers, nodes } = await getSetting();

  // get matched server
  for (let index = 0; index < servers.length; index++) {
    let { key, link, fileName, filterGroup, withNode } = servers[index];
    if (key === ctx.params.key) {
      // request link
      let [error, result] = await packPromise(instance(link));
      // yaml parse
      let proxies = yaml.parse(result.data).proxies;
      if (result != undefined) {
        // set content header
        ctx.set({
          'Content-Type': 'text/plain;charset=utf-8',
          'Content-Disposition': `attachment; filename=${fileName}`
        });

        // concat with nodes
        if (withNode) {
          proxies = nodes.concat(proxies);
        }

        // clean tags
        let clean = ctx.query.clean;
        if (clean === '1') {
          proxies = cleanTags(proxies);
        }

        // filter nodes
        let filter = ctx.query.filter;
        if (filter === '1') {
          let reg = new RegExp(filterGroup);
          proxies = filterNodes(proxies, reg);
        }

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

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
