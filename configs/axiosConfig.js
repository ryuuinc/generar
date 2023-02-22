const { SocksProxyAgent } = require('socks-proxy-agent');

let axiosConfig = {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
  }
};

if (process.env.PRODUCTION != 'true') {
  axiosConfig = Object.assign(axiosConfig, {
    proxy: false,
    httpsAgent: new SocksProxyAgent(process.env.SOCKS_PROXY)
  });
}

module.exports = axiosConfig;
