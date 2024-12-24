// key.js
const devConfig = require('./dev');
const prodConfig = require('./prod');

let config;
if (process.env.NODE_ENV === 'production') {
  console.log('prod');
  config = prodConfig;
} else {
  console.log('dev');
  config = devConfig;
}
// const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

module.exports = config;
