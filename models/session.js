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
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'session'
});

module.exports = Session;