const router = require('express').Router()
const {Genre} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const genres = await Genre.findAll();
    res.status(200).json(genres);
  }
  catch(err) {
    console.error(err)
  }
})
router.post('/', async (req, res, next) => {
  try {
    const [genres, created] = await Genre.findOrCreate(req.body)
    res.status(200).json(genres);
  }
  catch(err) {
    console.error(err)
  }
})
