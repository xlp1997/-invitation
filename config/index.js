var path = require('path');
module.exports = {
  build: {
    env: require('./prod.env'),
    // index: path.resolve(__dirname, '../redPacketShare/index.html'),
    index: path.resolve(__dirname, '../redPacketShare01/index.html'),
    // assetsRoot: path.resolve(__dirname, '../redPacketShare'),
    assetsRoot: path.resolve(__dirname, '../redPacketShare01'),
    assetsSubDirectory: 'static',
    // assetsPublicPath: '/redPacketShare/',
    assetsPublicPath: '/redPacketShare01/',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8087,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    cssSourceMap: false
  }
}
