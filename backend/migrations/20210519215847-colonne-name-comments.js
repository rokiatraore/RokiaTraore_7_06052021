'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
          queryInterface.addColumn('Comments', 'name', {
              type: Sequelize.STRING
          }, { transaction: t })
      ])
  })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
          queryInterface.removeColumn('Comments', 'name', { transaction: t }),
      ])
  })
  }
};