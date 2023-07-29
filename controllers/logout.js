const router = require('express').Router();
const { tokenExtractor } = require('../util/middleware');

const { User, Session } = require('../models');
const { client_encoding } = require('pg/lib/defaults');

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  
  if (!user) {
    throw new Error('Not logged in');
  }
  
  const session = await Session.findOne({
    include: [
      {
        model: User,
        where: {
          id: user.id
        }
      }
    ]
  })

  console.log(session.toJSON());

  session.active = false
  await session.save()

  res.status(200).end();
});

module.exports = router;