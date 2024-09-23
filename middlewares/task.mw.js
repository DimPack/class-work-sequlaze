const NotFoundError = require("../errors/NotFoundError");

// const createError = require("http-errors");
module.exports.checkTask = async (req, res, next) => {
  try {
    const {
      userInstance,
      params: { taskId },
      body,
    } = req;
    const [taskInstance] = await userInstance.getTasks({
      where: { id: taskId },
    });
    if (!taskInstance) {
      // return next(createError(404, "Task not found"));
      return next(new NotFoundError("Task not found !!!!!!!")); //повертаємо власну помилку
    }
    req.taskInstance = taskInstance;
    next();
  } catch (error) {
    next(error);
  }
};
