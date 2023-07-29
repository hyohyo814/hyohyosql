const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('sessions', 'active', {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('sessions', 'active');
  }
};