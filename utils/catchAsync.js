// function to intercept asynchronous errors

function catchAsync(fun) {
  return (req, res, next) => fun(req, res, next).catch((error) => next(error));
}
module.exports = catchAsync;
