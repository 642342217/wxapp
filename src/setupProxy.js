const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://wctest.mynatapp.cc',
      changeOrigin: true,
      secure: true,
      logLevel: 'debug'
    })
  );
};