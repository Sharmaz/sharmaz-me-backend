const config = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const getURI = (dialect) => `${dialect}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  development: {
    url: getURI('mysql'),
    dialect: 'mysql',
  },
  production: {
    url: getURI('mysql'),
    dialect: 'mysql',
  },
};
