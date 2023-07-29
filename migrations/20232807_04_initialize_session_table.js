const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('sessions', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      seed: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('sessions');
  }
};