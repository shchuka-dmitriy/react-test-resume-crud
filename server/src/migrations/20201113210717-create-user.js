'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {

    const stringAttribute = {
      type: Sequelize.STRING,
      allowNull: false,
    };

    const textAttribute = {
      type: Sequelize.TEXT,
      allowNull: true,
    };

    return queryInterface.createTable( 'Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: stringAttribute,
      lastName: stringAttribute,
      password: stringAttribute,
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'anon.png',
      },
      role: {
        type: Sequelize.ENUM('user', 'admin'),
        allowNull: false,
      },
      resume: textAttribute,
      accessToken: textAttribute
    } );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable( 'Users' );
  }
};