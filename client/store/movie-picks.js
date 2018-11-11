import axios from 'axios'

//--------add pick/fave/watched----------
const GOT_RECOMMENDED = "GOT_RECOMMENDED"

const gotRecommended = (recs) => {
    return ({
      type: GOT_RECOMMENDED,
      recs
    });
}


//thunks
export const fetchRecommended = () => async (dispatch) => {
    const {data} = await axios.get('/api/movies/recommendations');
    dispatch(gotRecommended(data));
}
export const addRecommended = (result, userId) => async () => {
  const movieId = result.id;
  const {genre_ids, title, poster_path, overview, keywords} = result
  await axios.post('/api/movies/recommended', ({movieId, title, poster_path, overview, userId }))
}

export const getRecommendedAndAdd  = async (movieId, userId) => {
  try {
    //find recommended and post all to db
    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=09c9f42cffc2ed60c067c488dd5ed974&language=en-US&page=1`)
    //add keywords
    data.results.slice(0,10).map( async (result) => {
      // const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/keywords?api_key=09c9f42cffc2ed60c067c488dd5ed974`);
      // const keys = []
      // data.keywords.map(key => {
      //   keys.push(key.id);
      // })
      // result.keywords = keys;
      const {title, poster_path, overview} = result;
      await axios.post('/api/movies/recommended', ({movieId: result.id, title, poster_path, overview, userId}))
    });
  }
  catch (err) {
      console.error(err);
  }
}
export const addToWatched = (movie, userId) => {
  return async () => {
    try {
      if (userId) {
        movie.userId = userId
      }
      await axios.post('/api/movies/viewHistory', movie);
      //delete seen from recommended
      //const {data} = await axios.delete(`/api/movies/recommended/${movie.id}/${userId}`)
      //console.log("deleted", data);
    }
    catch (err) {
      console.error(err);
    }
  }
}


export const addToFavorites = (movieId, movie, userId) => {

  return async () => {
    try {
      //set movie obj for update
      movie.movieId = movieId
      if (userId) movie.userId = userId

      //add to watched
      await axios.post('/api/movies/viewHistory', {title: movie.title, userId, movieId});

      //get keywords for this movie and store in keys array
      // const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/keywords?api_key=09c9f42cffc2ed60c067c488dd5ed974`);
      // const keys = []
      // data.keywords.map(key => {
      //   keys.push(key.id);
      // })
      // movie.keywords = keys;
      const {title, poster_path, overview, keywords} = movie;
      await axios.post('/api/movies/favorites', {movieId, title, poster_path, overview, userId});

      //post keywords in key db
      // data.keywords.map(async (keyword) => {
      //   await axios.post('/api/keywords', ({where: {movieDBId: keyword.id, name: keyword.name, userId }}))
      // })

      //find recs of favorite and add to recommended db
      //addToWatched(movie, userId)
      getRecommendedAndAdd(movieId, userId)
    }
    catch (err) {
      console.error(err);
    }
  }
}


//-----------Genres---------------------
const GOT_GENRES = "GOT_GENRES"
const GOT_GENRE = "SET_GENRE"
const GOT_IDS = "GOT_IDS"

const gotGenres = (genres) => {
  return ({
    type: GOT_GENRES,
    genres
  })
}
const gotIds = (ids) => {
  return ({
    type: GOT_IDS,
    ids
  })
}

export const fetchGenres = (picks) => async (dispatch) => {
  try {
    const genres = [];
    const  genresObj = {}
    picks = picks.slice(0,30);
    picks.map( async (movie)=> {
      const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${movie.movieId}?api_key=09c9f42cffc2ed60c067c488dd5ed974&language=en-US`);
        await data.genres.map(genre => {
          if (!genres.includes(genre.id)) {
            genres.push(genre.id)
            genresObj[genre.id] = [genre.name, 1, [(movie.movieId)]]
          }
          else {
            const weight = genresObj[genre.id][1];
            const movieIds = genresObj[genre.id][2];
            genresObj[genre.id][1] = weight+1
            genresObj[genre.id][2] = genresObj[genre.id][2].concat([movie.movieId])
          }
        })
        dispatch(gotGenres(genresObj));
    })

  } catch (err) {
    console.error(err);
  }
}

export const setGenres = (genreIdArr) => (dispatch) => {
  dispatch(gotGenres(genreIdArr))
}

export const setMovieIds = (genreIdArr) => (dispatch) => {
  dispatch(gotIds(genreIdArr))
}

//-------KEYWORDS--------------------------
//searchKeyword, fetchKeywords, selectKeyword
const GOT_KEYWORDS = "GOT_KEYWORDS"
const SELECT_KEYWORD = "SELECT_KEYWORD"
const SELECT_KEYWORDS = "SELECT_KEYWORDS"

const gotKeywords = (keywords) => {
  return ({
    type: GOT_KEYWORDS,
    keywords
  })
}
const selectKeywords = (key) => {
  return ({
    type: SELECT_KEYWORDS,
    key
  })
}
export const fetchKeywords = () => async (dispatch) => {
  try {
    const {data} = await axios.get('/api/keywords');
    dispatch(gotKeywords(data))
  } catch (err) {
    console.error(err);
  }
}
export const setKeywords = (idArr, userId) => (dispatch) => {
  try {
    // idArr.map( async (id) => {
    //   const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=09c9f42cffc2ed60c067c488dd5ed974&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_keywords=${id}`)
    //   data.results.map( async (result) => {
    //     //filter db for just these

    //   });
  //})
    dispatch(selectKeywords(idArr))
  } catch (err) {
    console.error(err);
  }
}

//trailer



const initialState = {
                      selectedKeywords: [],
                      genres: {},
                      genreId: '',
                      recommended: [],
                      keywords: [],
                      genreMovieIds: []
                      }

//reducer
export default function(state = initialState, action) {
    switch (action.type) {
      case GOT_GENRES:
        return {...state, genres: action.genres}
      case GOT_GENRE:
        return {...state, genreId: action.genreId}
      case GOT_RECOMMENDED:
        return {...state, recommended: action.recs}
      case GOT_KEYWORDS:
        return {...state, keywords: action.keywords}
      case SELECT_KEYWORDS:
        return {...state, selectedKeywords: action.key}
      case SELECT_KEYWORD:
        return {...state, selectedKeywords: [...state.selectedKeywords, action.key]}
      case GOT_IDS:
        return {...state, genreMovieIds: action.ids}
        default:
        return state
    }
}

