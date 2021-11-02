const Sequelize = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 5;

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;

// Instance methods:
User.prototype.correctPassword = function (candidatePwd) {
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, 'secretKey'); // want to replace 'secretKey' with process.env.JWT
};

// Class methods:
User.authenticate = async function ({ username, password }) {
  const user = await User.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error('Incorrect username and/or password');
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, 'secretKey'); // want to replace 'secretKey' with process.env.JWT
    const user = User.findByPk(id);
    if (!user) {
      throw 'User not found';
    } else {
      return user;
    }
  } catch (ex) {
    const error = Error('Bad token');
    error.status = 401;
    throw error;
  }
};

// Hooks
async function hashPassword(user) {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
}

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
