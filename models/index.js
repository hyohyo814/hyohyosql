const Blog = require('./blog');
const User = require('./user');
const UsersBlogs = require('./usersblogs');
const Readinglist = require('./readinglist');

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Readinglist, { through: UsersBlogs });
Readinglist.belongsToMany(User, { through: UsersBlogs });

module.exports = {
  Blog, User, UsersBlogs, Readinglist
};