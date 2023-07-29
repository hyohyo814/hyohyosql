const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('users', 'sid', {
      type: DataTypes.INTEGER,
      allowNull: true,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'sid')
  }
}