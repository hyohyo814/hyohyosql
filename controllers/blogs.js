const { tokenExtractor } = require('../util/middleware');
const router = require('express').Router();
const { Op } = require('sequelize');

const { Blog, User } = require('../models');

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get('/', async (req, res) => {
  let where = {};

  if (req.query.search) {
      where = {
        [Op.or]: [
          {
            title: {
              [Op.substring]: req.query.search
            }
          },
          {
            author: {
              [Op.substring]: req.query.search
            }
          }
        ]
      }
  };

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where
  });
  console.log(`============================================================`)
  blogs.forEach(v => {
    const { dataValues } = v;
    console.log(`${dataValues.author}: ${dataValues.title}, ${dataValues.likes} likes`);
  })
  console.log(`============================================================`)
  res.json(blogs);
});

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end();
  };
});

router.post('/', tokenExtractor, async (req, res) => {
  console.log(req.body);
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({ ...req.body, userId: user.id, date: new Date() });
  return res.json(blog);
});

router.put('/:id', blogFinder, async (req, res) => {
  if (!req.body.likes) {
    throw new Error('Malformatted property');
  }
  req.blog.likes = req.body.likes;
  await req.blog.save();
  res.json({ likes: req.blog.likes });
});

router.delete('/:id', blogFinder, tokenExtractor, async (req, res) => {
  if (!req.blog) {
    throw new Error('Blog does not exist');
  }
  await req.blog.destroy();
  res.status(204).end();
});

module.exports = router;