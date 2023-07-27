const router = require('express').Router();

const { Readinglist, Blog, User } = require('../models');

router.get('/', async (req, res) => {
  const readinglist = await User.findAll({
    attributes: { exclude: [
      'createdAt',
      'updatedAt',
      'id'
    ] },
    include: [
    {
      model: Readinglist,
      attributes: {
        exclude: []
      }
    }]
  });
  
  res.json(readinglist);
});

module.exports = router;