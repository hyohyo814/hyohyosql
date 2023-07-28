const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../util/db');

class Usersblogs extends Model {};

Usersblogs.init({
  id: {
    type:DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'blogs', key: 'id' }
  },
  readinglist_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    reference: { model: 'readinglists', key: 'id' }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'usersblogs'
});

module.exports = Usersblogs;