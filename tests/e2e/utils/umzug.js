const { Umzug, SequelizeStorage } = require('umzug');
const sequelize = require('../../../src/libs/sequelize');

const umzug = new Umzug({
  migrations: { glob: './src/db/seeders/*.js'},
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: undefined,
});

const upSeed = async() => {
  try {
    await sequelize.sync({ force: true });
    await umzug.up();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

const downSeed = async () => {
  await sequelize.drop();
}

module.exports = { upSeed, downSeed };
