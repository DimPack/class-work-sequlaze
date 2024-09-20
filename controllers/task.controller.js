const _ = require("lodash");
const createError = require("http-errors");
const { Task } = require("../models");
const attrs = [
  "content",
  "deadline",
  "isDone",
];
module.exports.createTask = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    const values = _.pick(body, attrs);
    const newTask = await userInstance.createTask(values);
    if (!newTask) {
      return next(createError(400, "fix data"));
    }
    res.status(201).send({ data: newTask });
  } catch (error) {
    next(error);
  }
};

module.exports.findAllTasks = async (req, res, next) => {
  try {
    const { userInstance } = req;

    const tasks = await userInstance.getTasks();
    if (tasks.length === 0) {
      return next(createError(400, "List tasks is empty"));
    }
    res.status(200).send({ data: tasks });
  } catch (error) {
    next(error);
  }
};

module.exports.findTask = async (req, res, next) => {
  try {
    const { taskInstance } = req;
    res.status(200).send({ data: taskInstance });
  } catch (error) {
    next(error);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const { taskInstance, body } = req;

    res.status(200).send({ data: taskInstance });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const { taskInstance } = req;
    await taskInstance.destroy();
    res.status(200).send({ data: taskInstance });
  } catch (error) {
    next(error);
  }
};