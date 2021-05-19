'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Message.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        }
      });

      models.Message.hasMany(models.Comment, {
        as:"comments"
      });
    }
  };
  Message.init({
    title: DataTypes.STRING,
    attachment: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};