'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Comment.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
         
        }, 
        onDelete: 'cascade'
      }),
      models.Comment.belongsTo(models.Message, {
        foreignKey: 'messageId',
        as: 'post',
        onDelete: 'cascade'
      })
    }
  };
  Comment.init({
    messageId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};