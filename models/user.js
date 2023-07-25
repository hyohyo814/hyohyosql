const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../util/db');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  username: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'user'
});

module.exports = User