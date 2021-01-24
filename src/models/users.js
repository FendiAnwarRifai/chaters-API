'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.users.hasOne(models.friends, {
        foreignKey: 'idFriend'
      })
    }
  };
  users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    bio: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    images: DataTypes.STRING,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING,
    status: DataTypes.STRING,
    id_socket: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};