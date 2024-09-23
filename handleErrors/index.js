const { UniqueConstraintError, ValidationError } = require("sequelize");
const ApplicationError = require("../errors/ApplicationError");

module.exports.handleErrors = (err, req, res, next) => {
  if (err instanceof UniqueConstraintError) {
    return res.status(409).send({
      errors: [{ detail: "email already in use" }],
    });
  }
  if (err instanceof ValidationError) {
    return res.status(409).send({
      errors: [{ detail: err.message }],
    });
  }
  if (err instanceof ApplicationError) {
    return res.status(err.status).send({
      errors: [{ detail: err.message }],
    });
  }
  const status = err.status || 500;
  return res.status(status).send({
    errors: [{ detail: err.message || "Server error" }],
  });
};
