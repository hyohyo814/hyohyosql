const jwt = require('jsonwebtoken');
const router = require('express').Router();
const { uuid } = require('uuidv4'); 

const { SECRET } = require('../util/config');
const { User, Session } = require('../models');


router.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: {
      username: username
    }
  });

  const userJSON = user.toJSON();

  console.log(userJSON.disabled)

  if (userJSON.disabled === true) {
    throw new Error('User has been disabled');
  }

  const passwordCorrect = password ==='banana';

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    });
  };

  const userForToken = {
    username: user.username,
    id: user.id
  };

  const seedGen = uuid();



  console.log(`===================${seedGen}==================`)

  const createSession = await Session.create({
    seed: seedGen
  });
  
  if (typeof window !== 'undefined') {
    console.log('success')
  }

  user.sessionId = createSession.id
  await user.save();

  const token = jwt.sign(userForToken, SECRET);

  res.status(200).send({
    token, username: user.username, name: user.name, sessionId: user.sessionId
  });
});

module.exports = router;