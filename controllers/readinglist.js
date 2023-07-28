const { client_encoding } = require('pg/lib/defaults');
const { uuid } = require('uuidv4');
const router = require('express').Router();

const { Readinglist, Blog, User, UsersBlogs } = require('../models');

const { tokenExtractor } = require('../util/middleware');

router.get('/', async (req, res) => {
  const readinglist = await Readinglist.findAll({
    attributes: [
      'read',
      'id'
    ],
    include: {
      model: UsersBlogs,
      attributes: [
        'userId',
        'blogId',
      ]
    }
  });

  res.json(readinglist);
});

router.post('/', tokenExtractor, async (req, res) => {
  const userjson = await User.findByPk(req.decodedToken.id);
  const user = userjson.toJSON();
  const { body } = req;

  if (!user) {
    throw new Error('Must be valid user');
  }

  const newRecord = await Readinglist.create({ seed: uuid() });

  const usersblogs = {
    userId: user.id,
    blogId: body.blogId,
    readinglistId: newRecord.id
  };

  const usersblogsEntry = await UsersBlogs.create(usersblogs);

  res.json(usersblogsEntry);
});

router.put('/:id', tokenExtractor, async (req, res) => {
  const userjson = await User.findByPk(req.decodedToken.id);
  const user = userjson.toJSON();
  const { body } = req;

  if (!user) {
    throw new Error('Must be valid user');
  }

  const updRecord = await Readinglist.findByPk(req.params.id, {
    include: {
      model: UsersBlogs
    }
  });
  
  console.log(updRecord.toJSON());

  console.log(user.id)
  console.log(updRecord.toJSON().usersblogs[0].userId)
  if (user.id !== updRecord.usersblogs[0].userId) {
    throw new Error('Invalid user action!')
  }

  if (!updRecord) {
    res.status(404).end();
  }

  updRecord.read = body.read;
  await updRecord.save();
  
  res.json(updRecord);
})

module.exports = router;