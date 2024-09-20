const { Router } = require("express");
const {
  createTask,
  findAllTasks,
  updateTask,
  deleteTask,
  findTask,
} = require("../controllers/task.controller");

const { checkTask } = require("../middlewares/task.mw");
const { pagination } = require("../middlewares/paginate.mw");

const taskRouter = Router();

taskRouter.post("/", createTask);
taskRouter.get("/", pagination, findAllTasks);

taskRouter
  .route("/:taskId")
  .all(checkTask)
  .get(findTask)
  .patch(updateTask)
  .delete(deleteTask);

module.exports = taskRouter;