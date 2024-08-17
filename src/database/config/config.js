require('dotenv').config();

module.exports = {
  development: {
    storage: process.env.DB_FILE,
    dialect: 'sqlite',
    seederStorage: 'sequelize',
    benchmark: true,
    logQueryParameters: true,
    typeValidation: true,
  },
  testing: {
    dialect: 'postgres',
    dialectOptions: { ssl: { require: true } },
    host: process.env.PGHOST,
  },
  production: {
    dialect: 'postgres',
    dialectOptions: { ssl: { require: true } },
    host: process.env.PGHOST,
  },
};
