const router = require('express').Router();

const { User, Blog, UsersBlogs, Readinglist } = require('../models');

const userFinder = async (req, res, next) => {
  req.user = await User.findByPk(req.params.id);
  next();
};

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: {
      exclude: [
        'id',
        'createdAt',
        'updatedAt'
      ]
    },
    include: {
      model: Readinglist,
      attributes: { exclude: ['seed'] },
      through: {
        attributes: []
      },
      include: {
        model: Blog,
        attributes: {
          exclude: [
            'userId',
            'createdAt',
            'updatedAt'
          ]
        },
        through: {
          attributes: []
        }
      }
    }
  });
  res.json(users);
});

router.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.get('/:id', userFinder, async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: {
      exclude: [
        'createdAt',
        'updatedAt',
        'id'
      ]
    },
    include: {
      model: Readinglist,
      attributes: { exclude: ['seed'] },
      include: [
        {
          model: Blog,
          attributes: {
            exclude: [
              'userId',
              'createdAt',
              'updatedAt'
            ]
          },
          through: {
            attributes: []
          }
        }
      ],
      attributes: {
        exclude: [
          'blogId',
          'read',
        ]
      },
      through: {
        attributes: []
      }

    }
  })

  res.json(user);
});

router.delete('/:id', userFinder, async (req, res) => {
  await req.user.destroy();
  res.status(204).end();
});

module.exports = router;