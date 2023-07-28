const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context = queryInterface }) => {
    await queryInterface.createTable('sessions', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        
      }
    })
  }
}