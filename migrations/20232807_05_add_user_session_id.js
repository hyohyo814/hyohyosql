const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('users', 'session_id', {
      type: DataTypes.INTEGER,
      reference: { model: 'sessions', key: 'id' }
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'session_id');
  }
};