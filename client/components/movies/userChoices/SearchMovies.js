import React from 'react'
import {connect} from 'react-redux'
import { searchMovie, addToFavorites, addToWatched, addToRecommended } from '../../../store'
import {Link} from 'react-router-dom'
import {ToastContainer, ToastStore} from 'react-toasts';

class SearchMovies extends React.Component {
  constructor() {
    super();
    this.state = {
      searchVal: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleChange(e) {
    this.setState({searchVal: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();
    const formattedVal = this.state.searchVal.split(" ").join("%20");
    this.props.searchMovies(formattedVal);
  }
  handleSelect (use, movie, userId) {
    const movieId = movie.id;
    const {genre_ids, title, poster_path, overview} = movie
    //use- where is the search happening??
    switch (use) {
      case "favorite":
      ToastStore.error("added to favorites!")
        this.props.addToFavorites(movieId, {genre_ids, title, poster_path, overview}, userId)
        break;
      // case "watched":
      // //console.log("watched", id, title, userId);
      //   this.props.addToWatched({movieId, title}, userId)
        // break;
      default:
       break;
    }
  }
  render() {
    const results = this.props.searchResults;
    const use = this.props.use
    return (

      <div className="centre-container-col">
        <ToastContainer lightBackground position={ToastContainer.POSITION.TOP_RIGHT} store={ToastStore}/>
        <div className="centre-container">
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <input className="form-entry" onChange={this.handleChange} type="text" name="title" placeholder="Movie Title.." />
            <img className="form-icon"  src="/search.png" onClick={(e) => this.handleSubmit(e)}/>
          </form>
        </div>
        { results.length
        ? <div className="movie-list-center">
            {results.map(movie => {
              return (
              <div id="movie-search" className="hvr-grow" key={movie.id} onClick={()=> this.handleSelect(use, movie,  this.props.user.id)}>
                <div className="centre">
                  <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
                </div>
                <div className="centre-container-col centre">
                  <h3  > {movie.title} </h3>
                  <p  > {movie.overview} </p>
                </div>
              </div>
              )
            })}

          </div>
       : null }
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  searchResults: state.search.searchMovieResults
  // favoriteCount : state.moviePicks.countFaves
})
const mapDispatch = dispatch => ({
  searchMovies: (movie) => dispatch(searchMovie(movie)),
  addToFavorites: (movieId, movie, userId) => dispatch(addToFavorites(movieId, movie, userId)),
  addToWatched: (movie, userId) => dispatch(addToWatched(movie, userId)),
})
export default connect(mapState, mapDispatch)(SearchMovies)
