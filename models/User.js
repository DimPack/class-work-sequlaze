'use strict';
const { Model } = require('sequelize');
const { isBefore } = require('date-fns');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Task, {
        foreignKey: 'userId'
      });
      User.belongsToMany(models.Group, {
        through: 'users_to_groups',
        foreignKey: 'userId'
      })
    }
  }
  User.init(
    {
      firstName: {
        field: 'first_name',
        allowNull: false,
        type: DataTypes.STRING(32),
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      lastName: {
        field: 'last_name',
        allowNull: false,
        type: DataTypes.STRING(32),
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      email: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING(128),
        validate: {
          notNull: true,
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        field: 'password_hash',
        allowNull: false,
        type: DataTypes.TEXT,
        set(value) {
          this.setDataValue('password', 'hash_password_' + value);
        },
      },
      birthday: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        validate: {
          isDate: true,
          isValidDate(value){
            if (isBefore(new Date(), new Date(value))) {
              throw new Error('Error: check birthday');
            }
          }
        },
      },
      isMale: {
        field: 'is_male',
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      avatar: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true,
    }
  );
  return User;
};
