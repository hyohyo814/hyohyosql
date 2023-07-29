const jwt = require('jsonwebtoken');
const { client_encoding } = require('pg/lib/defaults');

const { User, Session } = require('../models');

const { SECRET } = require('./config');

const errorHandler = (err, req, res, next) => {
  console.log(`================${err.name}================`);

  if (err.name === 'SequelizeValidationError') {
    console.log(`================${err.message}================`);
    
    if (err.message.includes('year')) {
      res.status(400).json({
        error: 'Validation error: Year must be from 1991 to present'
      });
    }
    
    res.status(400).json({ error: err.message });
  } else if (err.name === 'Error') {
    res.status(400).json({ error: err.message });
  } else if ( err.name === 'ReferenceError') {
    res.status(400).json({ error: err.message });
  }

  next(err);
};


const sessionVerifier = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);

  const session = await Session.findOne({
    where: {
      id: user.sid
    },
    include: {
      model: User,
      where: {
        id: req.decodedToken.id
      }
    }
  });

  console.log(session.toJSON());
  if (session.active === false) {
    throw new Error('Session expired')
  }

  next();
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
  } else {
    return res.status(401).json({ error: 'token missing'});
  };

  next();
};

module.exports = { errorHandler, tokenExtractor, sessionVerifier }