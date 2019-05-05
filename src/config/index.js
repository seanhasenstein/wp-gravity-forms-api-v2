const merge = require('lodash.merge');
const env = process.env.NODE_ENV || 'development';

const baseConfig = {
  env,
  isDev: env === 'development',
  isTest: env === 'testing',
  port: 3000,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '100d'
  }
};

let envConfig = {};

switch (env) {
  case 'dev':
  case 'development':
    envConfig = require('./dev');
    break;
  case 'test':
  case 'testing':
    envConfig = require('./testing');
    break;
  default:
    envConfig = require('./dev');
}

module.exports = merge(baseConfig, envConfig);
