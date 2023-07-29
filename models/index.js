const Blog = require('./blog');
const User = require('./user');
const UsersBlogs = require('./usersblogs');
const Readinglist = require('./readinglist');
const Session = require('./session');

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Readinglist, { through: UsersBlogs });
Readinglist.belongsToMany(User, { through: UsersBlogs });

Blog.belongsToMany(Readinglist, { through: UsersBlogs });
Readinglist.belongsToMany(Blog, { through: UsersBlogs });

Readinglist.hasMany(UsersBlogs);
UsersBlogs.belongsTo(Readinglist);

Session.hasOne(User);
User.belongsTo(Session);

module.exports = {
  Blog, User, UsersBlogs, Readinglist, Session
};