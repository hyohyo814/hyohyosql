require('express-async-errors');
const express = require('express');
const app = express();
const middleware = require('./util/middleware');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const logoutRouter = require('./controllers/logout');
const authorsRouter = require('./controllers/authors');
const readinglistRouter = require('./controllers/readinglist');
const sessionsRouter = require('./controllers/sessions');

const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/readinglist', readinglistRouter);
app.use('/api/sessions', sessionsRouter);

app.use(middleware.errorHandler)

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();