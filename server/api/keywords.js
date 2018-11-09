const router = require('express').Router()
const {Keyword} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const keys = await Keyword.findAll();
    console.log(keys)
    res.status(200).json(keys);
  }
  catch(err) {
    console.error(err)
  }
})
router.post('/', async (req, res, next) => {
  try {
    const [keys, created] = await Keyword.findOrCreate(req.body)
    res.status(200).json(keys);
  }
  catch(err) {
    console.error(err)
  }
})
