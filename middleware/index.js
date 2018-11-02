module.exports = {
  //  handle promise error (catch any error (async await))
  errorHandler: (fn) =>
    (req, res, next) => {
      Promise.resolve(fn(req, res, next))
        .catch(next);
    }
}