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
router.post('/favorites/', async (req,res,next) => {
  try {
    const fave = await Favorite.create({
      title: req.body.title,
      movieId: req.body.movieId,
      genre: req.body.genre_ids,
      userId: req.body.userId
    });
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
router.post('/recommended/', async (req,res,next) => {
  try {
    const rec = await Recommended.create({
      title: req.body.title,
      movieId: req.body.movieId,
      userId: req.body.userId
    });
    res.status(201).json(rec)
  } catch (err) {
    next(err);
  }
})
