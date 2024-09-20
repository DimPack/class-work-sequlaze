const { Router } = require("express");
const {
  createGroup,
  getAllGroups,
  getGroup,
  addUserToGroup,
  updateGroup,
} = require("../controllers/group-controller");
const { checkGroup } = require("../middlewares/group.mw");
const { singleUpload } = require("../middlewares/upload.mw");



const groupRouter = Router();
groupRouter.post("/", singleUpload('image'), createGroup);
groupRouter.get("/", getAllGroups);

groupRouter.get("/:groupId", getGroup);

groupRouter.post("/:groupId", checkGroup, addUserToGroup);
groupRouter.patch("/:groupId", checkGroup, singleUpload('image'), updateGroup); //image key in postman

module.exports = groupRouter;
