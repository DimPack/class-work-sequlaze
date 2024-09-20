const { Op, where } = require("sequelize");
const createError = require("http-errors");
const { User } = require("../models");
const _ = require("lodash");
const attrs = [
  "firstName",
  "lastName",
  "email",
  "password",
  "birthday",
  "isMale",
];

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const values = _.pick(body, attrs);
    const newUser = await User.create(values);
    if (!newUser) {
      return next(createError(400, "fix data"));
    }
    newUser.dataValues.password = undefined;
    res.status(201).send({ data: newUser });
  } catch (error) {
    next(error);
  }
};

module.exports.findAllUsers = async (req, res, next) => {
  try {
    const { pagination } = req;
    const allUsers = await User.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
      ...pagination,
    });
    if (!allUsers.length === 0) {
      return next(createError(404, "list empty"));
    }
    res.status(201).send({ data: allUsers });
  } catch (error) {
    next(error);
  }
};

module.exports.findUserByPk = async (req, res, next) => {
  try {
    const { userInstance } = req;
    userInstance.dataValues.password = undefined;
    res.status(200).send({ data: userInstance });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserByPk = async (req, res, next) => {
  try {
    const { userInstance } = req;
    userInstance.dataValues.password = undefined;
    const result = await userInstance.destroy();
    res.status(200).send({ data: userInstance });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserByPk = async (req, res, next) => {
  try {
    const { userInstance, body } = req;
    const values = _.pick(body, attrs);
    const updateUser = await userInstance.update(values);
    updateUser.dataValues.password = undefined;
    res.status(200).send({ data: updateUser });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserByPkStatic = async (req, res, next) => {
  try {
    const {
      params: { userId },
      body,
    } = req;
    const [, [upadateUser]] = await User.update(body, {
      where: { id: userId },
      returning: true,
    });

    return res.status(201).send({ data: upadateUser });
  } catch (error) {
    next(error);
  }
};
