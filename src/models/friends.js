'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class friends extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.friends.belongsTo(models.users, {
        foreignKey: 'idFriend'
      })
    }
  };
  friends.init({
    idLogin: DataTypes.STRING,
    idFriend: DataTypes.STRING,
    message: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'friends',
  });
  return friends;
};