import axios from 'axios'

const GOT_TRAILER = "GOT_TRAILER"
const GOT_MOVIE = "GOT_MOVIE"
const SET_FILTERED = "SET_FILTERED"
const SET_POPULAR = "SET_POPULAR"
const SET_FAVORITES = "FETCH_FAVORITES"
const SET_WATCHLIST = "FETCH_WATCHLIST"

const initialState = {
   trailer: '',
   movie: {},
   filteredPicks: [],
   popular: [],
   favorites: [],
   watchList: []
}

const gotTrailer = (trailer) => {
  return ({
    type: GOT_TRAILER,
    trailer
  });
}
const gotMovie = (movie) => {
  return ({
    type: GOT_MOVIE,
    movie
  });
}
const setFiltered = (picks) => {
  return ({
    type: SET_FILTERED,
    picks
  });
}
const setPopular = (pop) => {
  return ({
    type: SET_POPULAR,
    pop
  });
}
const setFavorites = faves => ({
  type: SET_FAVORITES,
  faves
})
const setWatchList = watch => ({
  type: SET_WATCHLIST,
  watch
})

export const filterRecommended = (recommended) => async (dispatch) => {
   const {data} = await axios.get('/api/movies/favorites');
   const viewed = data.map(movie => {
     return movie.movieId
   });
   const filtered = recommended.filter(rec => !viewed.includes(rec.movieId))
   dispatch(setFiltered(filtered))
}

export const fetchTrailer = (movieId) => async (dispatch) => {
  try {
  const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=09c9f42cffc2ed60c067c488dd5ed974&language=en-US`)
  const key = data.results[0].key;
  const trailer = `https://www.youtube.com/embed/${key}`
  dispatch(gotTrailer(trailer))
  } catch (err) {
    console.error(err)
  }
}

export const fetchMovie = (movieId) => async (dispatch) => {
  try {
    console.log("in fetch")
  const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=09c9f42cffc2ed60c067c488dd5ed974&language=en-US`)
  dispatch(gotMovie(data))
  } catch (err) {
    console.error(err)
  }
}
export const fetchFavorites = () => async (dispatch) => {
  try {
  const {data} = await axios.get(`/api/movies/favorites`)
  dispatch(setFavorites(data))
  } catch (err) {
    console.error(err)
  }
}
export const fetchWatchList = () => async (dispatch) => {
  try {
  const {data} = await axios.get(`/api/movies/watchlist`)
  dispatch(setWatchList(data))
  } catch (err) {
    console.error(err)
  }
}

export const getPopular = () => async (dispatch) => {
  const {data} = await axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=09c9f42cffc2ed60c067c488dd5ed974')
  dispatch(setPopular(data.results))
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_TRAILER:
      return {...state, trailer: action.trailer}
    case GOT_MOVIE:
      return {...state, movie: action.movie}
    case SET_FILTERED:
      return {...state, filteredPicks: action.picks}
    case SET_POPULAR:
      return {...state, popular: action.pop}
    case SET_FAVORITES:
      return {...state, favorites: action.faves}
    case SET_WATCHLIST:
      return {...state, favorites: action.watch}
    default:
      return state
  }
}
