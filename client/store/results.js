import axios from 'axios'

const GOT_TRAILER = "GOT_TRAILER"
const GOT_MOVIE = "GOT_MOVIE"
const SET_FILTERED = "SET_FILTERED"

const initialState = {
   trailer: '',
   movie: {},
   filteredPicks: []
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

export const filterRecommended = (recommended) => async (dispatch) => {
   const {data} = await axios.get('/api/viewHistory');
   const viewed = data.map(movie => {
     return movie.movieId
   });
   console.log("viewed" , viewed)
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
  const {data} = await axios.get(`/api/movies/${movieId}`)
  dispatch(gotMovie(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_TRAILER:
      return {...state, trailer: action.trailer}
    case GOT_MOVIE:
      return {...state, movie: action.movie}
    case SET_FILTERED:
      return {...state, filteredPicks: action.picks}
    default:
      return state
  }
}
