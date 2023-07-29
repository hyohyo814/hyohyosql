const router = require('express').Router();
const { Op } = require('sequelize');

const { User, Blog, UsersBlogs, Readinglist, Session } = require('../models');

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

router.get('/:id', async (req, res) => {
  const where = {};

  if (req.query.read) {
    console.log(`=============${req.query.read}=============`)
    where.read = {
      [Op.eq]: req.query.read
    }

    console.log(where)
  }

  const user = await User.findByPk(req.params.id, {
    attributes: {
      exclude: [
        'id',
        'createdAt',
        'updatedAt'
      ]
    },
    include: [
      { 
        model: Readinglist,
        through: {
          attributes: []
        },
        include: [
          {
            attributes: {
              exclude: [
                'blogId',
                'seed'
              ]
            },
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
          },
        ]
      },
    ]
  });

  res.json(user);
});

router.delete('/:id', userFinder, async (req, res) => {
  await req.user.destroy();
  res.status(204).end();
});

module.exports = router;