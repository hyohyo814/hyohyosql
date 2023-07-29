const router = require('express').Router();

const { Session, User } = require('../models');

router.get('/', async (req, res) => {
  const sessions = await Session.findAll({
    attributes: {
      exclude: ['']
    },
    include: [
      {
        model: User,
        attributes: [
          'id', 'username', 'disabled'
        ]
      }
    ]
  })

  res.json(sessions)
})

module.exports = router;