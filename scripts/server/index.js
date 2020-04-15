const Koa = require('koa');
const Router = require('@koa/router');

// prepare
const axiosOption = require('../../configs/axiosOption');
const { username, password } = require('../../configs/droplrAccount');
const {
  CLASH_NODE_PATH,
  CLASH_GENERAL_PATH,
  CLASH_COMPLETE_PATH,
  resourceConfig,
  ruleSetConfig
} = require('../../configs/defaultConfig');
const renewConfig = [].concat(resourceConfig, ruleSetConfig);

// scripts
const renew = require('../renew');
const generate = require('../generate');
const upload = require('../upload');

// koa and router instance
const app = new Koa();
const router = new Router({ prefix: '/generar' });

// renew
router.get('/renew', async (ctx, next) => {
  const message = await renew(axiosOption, renewConfig);
  ctx.body = { renew: message };
});

// generate
router.get('/generate', async (ctx, next) => {
  const message = generate(CLASH_NODE_PATH, CLASH_GENERAL_PATH, CLASH_COMPLETE_PATH, ruleSetConfig);
  ctx.body = { generate: message };
});

// upload
router.get('/upload', async (ctx, next) => {
  const message = await upload(username, password, axiosOption, resourceConfig);
  ctx.body = { upload: message };
});

// build
router.get('/build', async (ctx, next) => {
  const renewMes = await renew(axiosOption, renewConfig);
  const generateMes = generate(
    CLASH_NODE_PATH,
    CLASH_GENERAL_PATH,
    CLASH_COMPLETE_PATH,
    ruleSetConfig
  );
  const uploadMes = await upload(username, password, axiosOption, resourceConfig);

  ctx.body = { renew: renewMes, generate: generateMes, upload: uploadMes };
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(50001);
