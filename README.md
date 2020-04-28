# generar

[![Build Status](https://github.com/ryuuinc/generar/workflows/Build/badge.svg)](https://github.com/ryuuinc/generar/actions)

## 介绍

根据机场的订阅以及规则文件集生成 `Clash` 使用的配置文件，然后上传到 `Droplr`

## 使用

使用 `Swarm mode` 进行部署，需要提供 `SUB_URL`、`DP_DROPID`、`DP_USERNAME`、`DP_PASSWORD` 四个环境变量来运行容器

本地调试时自行添加 `.env` 文件和 `SOCKS_PROXY_AGENT` 参数
