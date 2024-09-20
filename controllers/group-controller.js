const _ = require("lodash");
const createError = require("http-errors");
const { User, Group } = require("../models");
const attrs = ["name", "imagePath", "description"];

module.exports.updateGroup = async (req, res, next) => {
  try {
    const { groupInstance, file, body } = req;

    let values = _.pick(body, attrs);
    if (file) {
      values = { ...values, imagePath: file.filename };
    }

    const updateedGroup = await groupInstance.update(values);

    res.status(201).send({ data: updateedGroup });
  } catch (error) {
    next(error);
  }
};

module.exports.createGroup = async (req, res, next) => {
  try {
    const { body, userInstance, file } = req;
    let values = _.pick(body, attrs);
    if (file) {
      values = { ...values, imagePath: file.filename };
    }
    const newGroup = await userInstance.createGroup(values);
    if (!newGroup) {
      return next(createError(400, "fix grop data"));
    }
    res.status(201).send({ data: newGroup });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllGroups = async (req, res, next) => {
  try {
    const { userInstance } = req;
    const allGroups = await userInstance.getGroups({
      // through: {
      //   where: { groupId: 1 },
      // },
    });

    res.status(200).send({ data: allGroups });
  } catch (error) {
    next(error);
  }
};

module.exports.getGroup = async (req, res, next) => {
  try {
    const {
      userInstance,
      params: { groupId },
    } = req;

    // const [group] = await userInstance.getGroups({
    //   through: {
    //     where: { groupId },
    //   },
    // });
    const group = await Group.findByPk(groupId, {
      include: [
        {
          model: User,
          attributes: ["id", "email"],
          through: { attributes: [] },
        },
      ],
    });
    if (!group) {
      return next(createError(404, "Group not found"));
    }

    res.status(200).send({ data: group });
  } catch (error) {
    next(error);
  }
};

module.exports.addUserToGroup = async (req, res, next) => {
  try {
    const { userInstance, groupInstance, body } = req;
    if (body.idUser) {
      const user = await User.findByPk(body.idUser);
      if (!user) {
        return next(createError(404, "User not found"));
      }
      await groupInstance.addUser(body.idUser);
    } else {
      await groupInstance.addUser(userInstance.id);
    }
    res.status(201).send({ data: "add user success" });
    // next();
  } catch (error) {
    next(error);
  }
};
