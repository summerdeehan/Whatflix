import React from 'react'
import {connect} from 'react-redux'
import { searchMovie, addToFavorites, addToWatched, addToRecommended } from '../../../store'
import {Link} from 'react-router-dom'

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
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input onChange={this.handleChange} type="text" name="title" placeholder="Movie Title.." />
          <button type="submit" value="Submit" disabled={!this.state.searchVal}>Search</button>
        </form>

        { results.length
        ? <div>
            <h1> Search Results: </h1>
            {results.map(movie => <p key={movie.id} onClick={()=> this.handleSelect(use, movie,  this.props.userId)}> {movie.title} </p>)}
            <Link to="/flick"> <button type="button"> Next </button> </Link>
          </div>
        : this.state.searchVal && !results.length ? <h3>No Results Found</h3> : null }
      </div>
    )
  }
}

const mapState = state => ({
  userId: state.user.id,
  searchResults: state.search.searchMovieResults
  // favoriteCount : state.moviePicks.countFaves
})
const mapDispatch = dispatch => ({
  searchMovies: (movie) => dispatch(searchMovie(movie)),
  addToFavorites: (movie, userId) => dispatch(addToFavorites(movie, userId)),
  addToWatched: (movie, userId) => dispatch(addToWatched(movie, userId)),
})
export default connect(mapState, mapDispatch)(SearchMovies)
