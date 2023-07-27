const router = require('express').Router();

const { User, Blog } = require('../models');

const userFinder = async (req, res, next) => {
  req.user = await User.findByPk(req.params.id);
  next();
};

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: [
        'userId',
        'createdAt',
        'updatedAt'
      ] }
    }
  });
  res.json(users);
});

router.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.get('/:id', userFinder, async (req, res) => {
  res.json(req.user);
});

router.delete('/:id', userFinder, async (req, res) => {
  await req.user.destroy();
  res.status(204).end();
});

module.exports = router;