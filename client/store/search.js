import axios from 'axios'

//actions
const SEARCH_MOVIE = "SEARCH_MOVIE";

//action creators
const searchMovieResults = (movies) => {
  return ({
    type: SEARCH_MOVIE,
    movies
  })
}

//thunks
//grab configuration data
export const searchMovie = (query) => async (dispatch) => {
    try {
        //trim query and seperate with %20
        const {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=09c9f42cffc2ed60c067c488dd5ed974&language=en-US&query=${query}&page=1`)
        dispatch(searchMovieResults(data.results));
    } catch (err) {
      console.error(err);
    }
}

const initialState = {
                      key: process.env.MDB_API_KEY,
                      configData: "",
                      baseUrl: "",
                      searchMovieResults: []
                      }

//reducer
export default function(state = initialState, action) {
    switch (action.type) {
      case SEARCH_MOVIE:
        return {...state, searchMovieResults: action.movies}
      default:
        return state
    }
}
