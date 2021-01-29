'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(80)
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      phone: {
        type: Sequelize.STRING(13)
      },
      bio: {
        type: Sequelize.STRING(100)
      },
      username: {
        type: Sequelize.STRING(8)
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(80)
      },
      images: {
        type: Sequelize.STRING(100)
      },
      lat: {
        type: Sequelize.STRING(100)
      },
      lng: {
        type: Sequelize.STRING(100)
      },
      status: {
        type: Sequelize.STRING(100)
      },
      id_socket: {
        type: Sequelize.STRING(100)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};