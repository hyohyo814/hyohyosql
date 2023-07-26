const jwt = require('jsonwebtoken');

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

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
  } else {
    return res.status(401).json({ error: 'token missing'});
  };

  next();
};

module.exports = { errorHandler, tokenExtractor }