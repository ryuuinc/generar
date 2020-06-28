const socksProxyAgent = require('socks-proxy-agent');

let axiosConfig = {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36'
  }
};

if (process.env.SOCKS_PROXY_AGENT != null) {
  axiosConfig = Object.assign(axiosConfig, {
    proxy: false,
    httpsAgent: new socksProxyAgent(process.env.SOCKS_PROXY_AGENT)
  });
}

module.exports = axiosConfig;
