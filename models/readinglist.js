const { DataTypes, Model } = require('sequelize')

const { sequelize } = require('../util/db');

class Readinglist extends Model {};

Readinglist.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  seed: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false,
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'readinglist'
});

module.exports = Readinglist;