import React from 'react'
import {fetchGenres, setGenres, filterRecommended} from "../../../store"
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
  this.props.filterRecommended();
}
pickGenre(movieId) {
  !movieId ? this.setState({genres: 0}): this.state.genres.push(movieId)
}
render () {
  return (
    <div>
      <h1> Please Pick A Genre </h1>
      <Link to="/pick/keys"><button type="button" onClick={() => this.props.setGenres(this.state.genres)}> Submit </button></Link>
      <div className="flex-row">
      <div type="button" className="pick-buttons" onClick={() => this.pickGenre()}> Any </div>
        {this.props.genres.map(genre => {
          const movieId = genre.movieDBId
          return (
            <div key={genre.id} type="button" className="pick-buttons" onClick={() => this.pickGenre(movieId)}> {genre.name} </div>
          )
        })}
      </div>
    </div>

  )
}
}
const mapState = state => ({
  genres: state.moviePicks.genres
})
const mapDispatch = dispatch => ({
  getGenres : () => dispatch(fetchGenres()),
  setGenres : (id) => dispatch(setGenres(id)),
  filterRecommended: (rec) => dispatch(filterRecommended(rec))
})

export default connect(mapState, mapDispatch)(PickGenre);
