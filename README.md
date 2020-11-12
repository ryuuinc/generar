# generar

[![Build Status](https://github.com/ryuuinc/generar/workflows/Docker/badge.svg)](https://github.com/ryuuinc/generar/actions)

## 介绍

通过机场订阅生成 `Clash` 专用的节点配置文件

## 使用

使用 `Swarm mode` 进行部署，需要提供 `SUB_URL`、`DP_USERNAME`、`DP_PASSWORD` 三个环境变量来运行容器

本地调试时自行添加 `.env` 文件和 `SOCKS_PROXY_AGENT` 参数
