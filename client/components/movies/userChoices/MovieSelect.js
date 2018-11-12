import React from 'react'
import {fetchTrailer, fetchMovie} from '../../../store'
import {connect} from 'react-redux'
import axios from 'axios'

class MovieSelect extends React.Component {
  constructor() {
    super()
    // this.state = {
    //   showTrailer: false
    // }
    // this.toggleTrailer.bind(this);
  }
  componentDidMount  () {
    const movieId = this.props.match.params.movieId;
    this.props.fetchTrailer(movieId)
    this.props.fetchMovie(movieId)
  }
  // toggleTrailer () {
  //   let currentTrailer = !this.state.showTrailer;
  //   this.setState({showTrailer: currentTrailer})
  // }
  render() {
    const movie = this.props.movie;
    console.log("movie", movie)
    return (
      movie ?
      <div className='centre-container-col'>
        <div className='centre-title'>
          <h3>{movie.title}</h3>
        </div>
        <div className='movie-container'>
          <div id="vid-container">
            <iframe height="450" width="650" src={this.props.trailer} />
          </div>
          <div id="txt-container">
            <p >Genres: {movie.genres && movie.genres.map(val=> val =val.name).join(', ')}</p>
            <p >{movie.overview}</p>
          </div>
        </div>
      </div>
      : <p>Page Not Found</p>
    )
  }
}
const mapState = state => ({
  trailer: state.results.trailer,
  movie: state.results.movie
})
const mapDispatch = dispatch => ({
  fetchTrailer: (id) => dispatch(fetchTrailer(id)),
  fetchMovie: (id) => dispatch(fetchMovie(id))
})
export default connect(mapState, mapDispatch)(MovieSelect);
