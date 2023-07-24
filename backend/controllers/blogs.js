const blogsRouter = require('express').Router();
const User = require('../models/user');
const Blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

  res.json(blogs);
});

blogsRouter.get('/:id', async (req, res) => {
  const returnedBlog = await Blog.findById(req.params.id);
  if (returnedBlog !== undefined || null) {
    res.json(returnedBlog);
  } else {
    res.status(404).end();
  }
});

blogsRouter.post('/', userExtractor, async (req, res) => {
  const blog = new Blog(req.body);

  // console.log(req.user)
  const { user } = req;
  blog.user = user.id;
  // console.log(blog)

  if (!blog.title || !blog.url) {
    res.status(400).end();
  }
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();
  savedBlog = await Blog.findById(savedBlog.id).populate('user')
  res.status(201).json(savedBlog);
});

blogsRouter.post('/:id/comments', async (req, res) => {
  const { comment } = req.body
  const target = await Blog.findById(req.params.id)
  target.comments = target.comments.concat(comment)
  await target.save();
  res.status(201).json(target)
})

blogsRouter.put('/:id', async (req, res) => {
  const { title, url, author, likes } = req.body

  const update = await Blog.findByIdAndUpdate(req.params.id, { title, url, author, likes }, {
    new: true,
  });
  res.json(update);
});

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const check = await Blog.findById(req.params.id);
  if (!check) {
    return res.status(404).end();
  }
  // console.log(req.user);
  const targetUserId = req.user.id.toString();
  // console.log(`target ID ${targetUserId}`)

  const { user } = req;
  const userId = user.id.toString();

  // console.log(`user ID ${userId}`)
  if (userId !== targetUserId) {
    return res.status(401).json({ error: 'user not authorized to delete this blog' });
  }

  await Blog.findByIdAndRemove(req.params.id);
  return res.status(204).end();
});

module.exports = blogsRouter;
