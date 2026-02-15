const { Sequelize } = require('sequelize');
const config = require('../config/config');
const setupModels = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const getURI = (dialect) => `${dialect}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const dialect = 'mysql';
// eslint-disable-next-line no-console
const sequelize = new Sequelize(getURI(dialect), {
  dialect,
  logging: config.isProd ? false : console.log,
});

setupModels(sequelize);

module.exports = sequelize;
