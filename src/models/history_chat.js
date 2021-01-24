'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class history_chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  history_chat.init({
    senderId: DataTypes.STRING,
    receiverId: DataTypes.STRING,
    messages: DataTypes.TEXT,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'history_chat',
  });
  return history_chat;
};