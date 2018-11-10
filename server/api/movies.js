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
    const [fave, created] = await Favorite.findOrCreate({ where :
      {movieId: req.body.movieId,
      //genre_ids: req.body.genre_ids,
      title: req.body.title,
      poster_path: req.body.poster_path,
      overview: req.body.overview,
      //keywords: req.body.keywords,
      userId: req.body.userId} });
    !created ? res.status(200).json(fave) : res.status(201)
  } catch (err) {
    next(err);
  }
})
//history
router.get('/viewHistory', async (req,res,next) => {
  try {
    const hist = await ViewHistory.findAll();
    res.status(200).json(hist)
  } catch (err) {
    next(err);
  }
})
router.post('/viewHistory/', async (req,res,next) => {
  try {
    const [viewed, created] = await ViewHistory.findOrCreate({ where: {
      title: req.body.title,
      movieId: req.body.movieId,
      userId: req.body.userId
    }});
    !created ? res.status(200).json(viewed) : res.status(201)
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
router.post('/recommended', async (req,res,next) => {
  try {
    const [rec, created] = await Recommended.findOrCreate({ where :
      {movieId: req.body.movieId,
      //genre_ids: req.body.genre_ids,
      title: req.body.title,
      poster_path: req.body.poster_path,
      overview: req.body.overview,
      //keywords: req.body.keywords,
      userId: req.body.userId} });
    // if (!created) {
    //   console.log("adding one")
    //   rec.addCount();
    // }
    if (!created ){
      res.status(200).json(rec);
    }
    else  {

      rec.addCount();
      res.status(201).send(rec);
    }
  } catch (err) {
    next(err);
  }
})
router.get('/:movieId', async (req,res,next) => {
  console.log("api movie id", req.params.movieId)
  try {
    const movie = await Recommended.findOne({
      where: {
        movieId: req.params.movieId
      }
    });
    console.log("movie", movie)
    res.status(200).json(movie)
  } catch (err) {
    next(err);
  }
})
router.delete('recommended/:movieId/:userId', async (req,res,next) => {
  try {
    const rec = await Recommended.destroy( {
      where: {
        movieId: req.params.movieId,
        userId: req.params.userId
       }
    })
   res.status(204).send(rec)
  }
  catch (err) {
    next(err);
  }
})

