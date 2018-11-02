module.exports = {
  //  handle promise error (catch any error (async await))
  asyncErrorHandler: (fn) =>
    (req, res, next) => {
      Promise.resolve(fn(req, res, next))
        .catch(next);
    }
}