# generar

[![Build Status](https://github.com/ryuuinc/generar/workflows/Docker/badge.svg)](https://github.com/ryuuinc/generar/actions)

## 介绍

通过机场订阅和 `Gist` 配合生成代理软件配置文件

## 使用

使用 `Docker` 进行部署，需要提供如下环境变量：

```bash
PRODUCTION=true
SETTING_NAME=generar.json
SETTING_URL='xxxx'
```

本地调试需要提供 `SOCKS_PROXY` 且 `PRODUCTION` 为 `false`

部署时需要在 `Actions secrets` 中添加如下环境变量：

```bash
DOCKERHUB_USERNAME='xxxx'
DOCKERHUB_IMAGENAME='xxxx'
DOCKERHUB_TOKEN ='xxxx'
```
