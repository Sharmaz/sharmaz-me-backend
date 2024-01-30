const { Sequelize } = require('sequelize');
const config = require('../config/config');
const setupModels = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const getURI = (dialect) => `${dialect}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

let sequelize;

if (config.isProd || config.isEnd2End || config.isCi) {
  const dialect = 'mysql';
  sequelize = new Sequelize(getURI(dialect), {
    dialect,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    logging: false,
  });

  setupModels(sequelize);
} else {
  const dialect = 'postgres';
  sequelize = new Sequelize(getURI(dialect), {
    dialect,
    // eslint-disable-next-line no-console
    logging: console.log,
  });
  setupModels(sequelize);
}

module.exports = sequelize;
