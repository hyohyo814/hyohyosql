const Blog = require('./blog');
const User = require('./user');
const Readinglist = require('./readinglist');

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: Readinglist, as: 'user_blog' });
Blog.belongsToMany(User, { through: Readinglist, as: 'blog_user' });

module.exports = {
  Blog, User, Readinglist
};