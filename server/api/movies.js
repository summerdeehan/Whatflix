const router = require('express').Router()
const {Favorite, WatchList, ViewHistory, Recommended} = require('../db/models')
module.exports = router

//favorites
router.get('/favorites', async (req,res,next) => {
  try {
    const faves = await Favorite.findAll();
    res.status(200).json(faves)
  } catch (err) {
    next(err);
  }
})
// title: req.body.title,
//       movieId: req.body.movieId,
//       genre: req.body.genre_ids,
//       userId: req.body.userId
router.post('/favorites/', async (req,res,next) => {
  try {
    const fave = await Favorite.create(req.body);
    res.status(201).json(fave)
  } catch (err) {
    next(err);
  }
})
//history
router.post('/viewHistory/', async (req,res,next) => {
  try {
    const viewed = await ViewHistory.create({
      title: req.body.title,
      movieId: req.body.movieId,
      userId: req.body.userId
    });
    res.status(201).json(viewed)
  } catch (err) {
    next(err);
  }
})
//recommended
router.get('/recommendations', async (req,res,next) => {
  try {
    const recs = await Recommended.findAll();
    res.status(200).json(recs)
  } catch (err) {
    next(err);
  }
})
router.post('/recommended/', async (req,res,next) => {
  try {
    const [rec, created] = await Recommended.findOrCreate({ where : req.body});
    if (!created) {
      console.log("adding one")
      rec.addCount();
    }

    res.status(201).json(rec)
  } catch (err) {
    next(err);
  }
})
