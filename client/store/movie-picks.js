import axios from 'axios'

//--------add pick/fave/watched----------
const ADD_MOVIE = "ADD_MOVIE"
// const ADD_WATCHED = "ADD_WATCHED"
// const ADD_FAVORITE = "ADD_FAVORITE"

const addMovie = (id, userId) => {
  return ({
    type: ADD_MOVIE,
    id,
    userId
  })
}
// const addWatched = (movie, userId) => {
//   return ({
//     type: ADD_MOVIE,
//     movie,
//     userId
//   })
// }
// const addFavorite = (movie, userId) => {
//   return ({
//     type: ADD_FAVORITE,
//     movie,
//     userId
//   })
// }
export const getRecommendedAndAdd  = async (movieId, userId) => {
  try {
    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=09c9f42cffc2ed60c067c488dd5ed974&language=en-US&page=1`)
    const recs = []
    data.results.map(async (result) => {
      recs.push(result.id)
      await axios.post('/api/movies/recommended', ({movieId: result.id, title: result.title, userId}))
    });
    console.log ("recsArr", recs)
  }
  catch (err) {
      console.error(err);
    }
  }

export const addToFavorites = async (movie) => {
  try {
    await axios.post('/api/movies/favorites', movie);
    getRecommendedAndAdd(movie.movieId, movie.userId)
  }
  catch (err) {
    console.error(err);
  }
}
export const addToWatched = async (movie) => {
  try {
    await axios.post('/api/movies/viewHistory', movie);
  }
  catch (err) {
    console.error(err);
  }
}

// export const addToRecommended = async (movie) => {
//   try {
//     await axios.post('/api/movies/recommended', movie);
//   }
//   catch (err) {
//     console.error(err);
//   }
// }


//-----------Genres---------------------
const GOT_GENRES = "GOT_GENRES"
const GOT_GENRE = "SET_GENRE"

const gotGenres = (genres) => {
  return ({
    type: GOT_GENRES,
    genres
  })
}
const gotGenre = (genreId) => {
  return ({
    type: GOT_GENRE,
    genreId
  })
}

export const fetchGenres = () => async (dispatch) => {
  try {
    const {data} = await axios.get('/api/genres');
    console.log("genres in fetch", data)
    dispatch(gotGenres(data))
  } catch (err) {
    console.error(err);
  }
}
export const setGenre = (genreId) => (dispatch) => {
  dispatch(gotGenre(genreId))
}

//-------KEYWORDS--------------------------
//searchKeyword, fetchKeywords, selectKeyword

const initialState = {
                      moviePicks:{},
                      genres: [],
                      genreId: ''
                      }

//reducer
export default function(state = initialState, action) {
    switch (action.type) {
      case ADD_MOVIE:
        return {...state, moviePicks: addToSelection(action.id, {...state.moviePicks})}
      case GOT_GENRES:
        return {...state, genres: action.genres}
        case GOT_GENRE:
        return {...state, genreId: action.genreId}
      default:
        return state
    }
}
//helper func nb. id is string
function addToSelection (id, movieObj) {
  const movieIds = Object.keys(movieObj);
  movieIds.includes(id) ? movieObj[id]++ : movieObj[id] = 1
}

