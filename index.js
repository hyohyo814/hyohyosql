require('express-async-errors');
const express = require('express');
const app = express();
const middleware = require('./util/middleware');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/login', loginRouter);

app.use(middleware.errorHandler)

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();