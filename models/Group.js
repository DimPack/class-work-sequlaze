"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
 
    static associate(models) {
      Group.belongsToMany(models.User, {
        through: 'users_to_groups',
        foreignKey: 'groupId'
      })
    }
  }
  Group.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING(64),
        unique: true,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      imagePath: { type: DataTypes.TEXT },
      description: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "Group",
      tableName: "groups",
      underscored: true,
    }
  );
  return Group;
};
