const router = require('express').Router();

// Add base routes in following format:
// router.use('/token', require('./token'));

router.use(function (req, res, next) {
  const err = new Error('API route not found!');
  err.status = 404;
  next(err);
});

module.exports = router;
