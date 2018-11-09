import React from 'react'
import {fetchGenres, setGenres} from "../../../store"
import { connect } from 'react-redux'
import history from '../../../history'
import {Link} from 'react-router-dom'

class PickGenre extends React.Component {
constructor() {
  super();
  this.state = {
    genres: []
  }
  this.pickGenre=this.pickGenre.bind(this);
}
componentDidMount() {
  this.props.getGenres();
}
pickGenre(movieId) {
  this.state.genres.push(movieId)
}
render () {
  return (
    <div>
      <h1> Please Pick A Genre </h1>
      {this.props.genres.map(genre => {
        const movieId = genre.movieDBId
        return (
          <div key={genre.id}><button type="button" onClick={() => this.pickGenre(movieId)}> {genre.name} </button></div>
        )
      })}
      <Link to="/pick/keys"><button type="button" onClick={() => this.props.setGenres(this.state.genres)}> Submit </button></Link>
    </div>

  )
}
}
const mapState = state => ({
  genres: state.moviePicks.genres
})
const mapDispatch = dispatch => ({
  getGenres : () => dispatch(fetchGenres()),
  setGenres : (id) => dispatch(setGenres(id))
})

export default connect(mapState, mapDispatch)(PickGenre);
