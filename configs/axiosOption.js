const os = require('os');
const socksProxyAgent = require('socks-proxy-agent');

let axiosOption = {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36'
  }
};

// identify current system platform
if (os.platform() === 'win32') {
  axiosOption = Object.assign(axiosOption, {
    proxy: false,
    httpsAgent: new socksProxyAgent('socks://127.0.0.1:7891')
  });
}

module.exports = axiosOption;
