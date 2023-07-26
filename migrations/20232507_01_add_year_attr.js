const { DataTypes, QueryInterface } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      validate: {
        min: 1991,
        max: 2023
      }
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year');
  }
};