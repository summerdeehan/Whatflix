import React from 'react'
import {fetchTrailer, fetchMovie} from '../../../store'
import {connect} from 'react-redux'
import axios from 'axios'

class MovieSelect extends React.Component {
  constructor() {
    super()
    this.state = {
      showTrailer: false
    }
    this.toggleTrailer.bind(this);
  }
  componentDidMount  () {
    const movieId = this.props.match.params.movieId;
    this.props.fetchTrailer(movieId)
    this.props.fetchMovie(movieId)
  }
  toggleTrailer () {
    let currentTrailer = !this.state.showTrailer;
    this.setState({showTrailer: currentTrailer})
  }
  render() {
    const movie = this.props.movie;
    return (
      movie ?
      <div>
        <h3>{movie.title}</h3>
        <p>{movie.overview}</p>
        {this.state.showTrailer ? <button type="button" onClick={()=> this.toggleTrailer()} > Hide Trailer </button> : <button type="button" onClick={()=> this.toggleTrailer()} > Show Trailer </button>}
        {this.state.showTrailer ? <iframe width="420" height="315" src={this.props.trailer} /> : null}
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
