module.exports.handleErrors = (err, req, res, next) => {
  const status = err.status || 500;
  return res.status(status).send({
    errors: [{detail: err.message || 'Server error'}]
  });
};
