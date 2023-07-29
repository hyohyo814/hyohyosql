const { DataTypes } = require('sequelize');
const { sequelize } = require('../models/session');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('sessions', 'created_at', {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('NOW')
    });
    await queryInterface.addColumn('sessions', 'updated_at', {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('NOW')
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('sessions', 'created_at');
    await queryInterface.removeColumn('sessions', 'updated_at');
  }
}