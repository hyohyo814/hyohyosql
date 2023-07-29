const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('users', 'sid', {
      type: DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('sessions', 'token', {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'sid')
  }
}