const fs = require('fs')
const yaml = require('yaml')
const Koa = require('koa')
const Router = require('@koa/router')
const axios = require('axios')
require('dotenv').config()

const axiosConfig = require('../configs/axiosConfig')
const { packPromise, cleanTags, filterNodes } = require('./utils')

const app = new Koa()
const router = new Router()

const gitQuest = axios.create({
  timeout: 5000,
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  ...axiosConfig
})

const jaxQuest = axios.create({
  timeout: 5000,
  ...axiosConfig
})

const getSetting = async () => {
  let [error, result] = await packPromise(gitQuest(process.env.SETTING_URL))
  if (result != undefined) {
    let content = result.data.files[process.env.SETTING_NAME].content
    return JSON.parse(content)
  }
}

const getList = (href, uri, array) => {
  let content = array.map((value, index) => {
    let { tag, type, key, fileName } = value
    let link = `${href}/${uri}/${key}`
    return {
      tag,
      type,
      link,
      fileName
    }
  })
  return content
}

router.get('/page', async (ctx, next) => {
  // request setting
  let { href, configs, servers } = await getSetting()

  // init
  let list = {
    servers: getList(href, 'server', servers),
    configs: getList(href, 'config', configs)
  }

  // set content header
  ctx.set({
    'Content-Type': 'application/json; charset=utf-8'
  })

  // return matched list
  ctx.body = JSON.stringify(list, null, 2)
})

router.get('/server/:key', async (ctx, next) => {
  // request setting
  let { servers, nodes } = await getSetting()

  // get matched server
  for (let index = 0; index < servers.length; index++) {
    let { type, key, link, fileName } = servers[index]
    if (key === ctx.params.key) {
      if (type === 'raw') {
        // request link
        let [error, result] = await packPromise(jaxQuest(link))
        if (result != undefined) {
          // set content header
          ctx.set({
            'Content-Type': 'application/octet-stream; charset=utf-8',
            'Content-Disposition': `attachment; filename=${fileName}`
          })

          // return raw data
          ctx.body = result.data
        }
      } else if (type === 'yaml') {
        // request link
        let [error, result] = await packPromise(jaxQuest(link))
        // yaml parse
        let proxies = yaml.parse(result.data).proxies
        if (result != undefined) {
          // set content header
          ctx.set({
            'Content-Type': 'application/octet-stream; charset=utf-8',
            'Content-Disposition': `attachment; filename=${fileName}`
          })

          // clean tags
          let clean = ctx.query.clean
          if (clean === 'true') {
            proxies = cleanTags(proxies)
          }

          // filter nodes
          if (ctx.query.filter != null) {
            let filter = decodeURIComponent(ctx.query.filter).replace(/-/g, '|')
            let reg = new RegExp(filter)
            proxies = filterNodes(proxies, reg)
          }

          // concat nodes
          let concat = ctx.query.concat
          if (concat === 'true') {
            proxies = nodes.concat(proxies)
          }

          // return matched server
          ctx.body = yaml.stringify({ proxies })
        }
      } else {
        // link respond with empty content or error
        ctx.status = 500
        ctx.body = {
          message: 'airport is down'
        }
      }
    }
  }
})

router.get('/config/:key', async (ctx, next) => {
  // request setting
  let { configs } = await getSetting()

  // get matched config
  for (let index = 0; index < configs.length; index++) {
    let { key, link, fileName, serverKey } = configs[index]
    if (key === ctx.params.key) {
      // request link
      let [error, result] = await packPromise(gitQuest(link))
      if (result != undefined) {
        // set content header
        ctx.set({
          'Content-Type': 'text/plain;charset=utf-8',
          'Content-Disposition': `attachment; filename=${fileName}`
        })

        // deal params and judge empty string
        let params = Object.entries(ctx.query)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join('&')
        let padString = serverKey
        if (params !== '') {
          padString = serverKey + '?' + params
        }
        let content = result.data.files[fileName].content

        // replace SERVERKEY
        content = content.replace(/SERVERKEY/g, padString)

        // return matched config
        ctx.body = content
      }
    }
  }
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)
