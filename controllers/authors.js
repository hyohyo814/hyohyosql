const router = require('express').Router();
const sequelize = require('sequelize');

const { Blog, User } = require('../models');

router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('author')), 'articles'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
    ],
    order: [
      ['likes', 'DESC']
    ],
    group: 'author'
  });

  res.json(authors);
});

module.exports = router;