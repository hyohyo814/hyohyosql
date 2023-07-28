const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('readinglists', {
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
    });
    await queryInterface.createTable('usersblogs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: { model: 'users', key: 'id' }
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: { model: 'blogs', key: 'id' }
      },
      readinglist_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        reference: { model: 'readinglists', key: 'id' }
      }
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('usersblogs');
    await queryInterface.dropTable('readinglists');
  }
};