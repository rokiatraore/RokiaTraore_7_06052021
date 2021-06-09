module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('Messages', 'attachment', {
              type: Sequelize.STRING,
              allowNull: true,
          }, )
      ])
  },

  down: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('Messages', 'attachment', {
              type: Sequelize.STRING,
              allowNull: true,
          }, )
      ])
  }
};
