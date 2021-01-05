const register = require('react-server-dom-webpack/node-register');
register();
const babelRegister = require('@babel/register');

babelRegister({
  ignore: [/\/(build|server|node_modules)\//],
  presets: [['react-app', { runtime: 'automatic' }]],
  plugins: ['@babel/transform-modules-commonjs'],
});

require('./reactServer');
