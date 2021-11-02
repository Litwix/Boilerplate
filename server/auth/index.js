const router = require('express').Router();
const { User } = require('../db');

router.post('/login', async function (req, res, next) {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (error) {
    next(error);
  }
});

router.post('/signup', async function (req, res, next) {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(error);
    }
  }
});

router.get('/me', async function (req, res, next) {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
