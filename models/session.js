const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../util/db');

class Session extends Model {};

Session.init({
  id: {
    type: DataTypes.TEXT,
    primaryKey: true,
    autoIncrement: true
  },
  seed: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    reference: { model: 'users', key: 'id'}
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'session'
});

module.exports = Session;