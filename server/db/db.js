const Sequelize = require('sequelize');
const pkg = require('../../package.json');

const dbName = pkg.name;
const db = new Sequelize(`postgres://localhost:5432/${dbName}`, {
  logging: false,
});

module.exports = db;
