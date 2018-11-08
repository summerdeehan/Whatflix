import React from 'react'
import {fetchGenres, setGenre} from "../../../store"
import { connect } from 'react-redux'
import history from '../../../history'

class PickGenre extends React.Component {
constructor() {
  super();
  this.pickGenre=this.pickGenre.bind(this);
}
componentDidMount() {
  this.props.getGenres();
}
pickGenre(movieId) {
  this.props.setGenre(movieId);
  history.push('/pick/keys')
  console.log("props", this.props)
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
    </div>
  )
}
}
const mapState = state => ({
  genres: state.moviePicks.genres
})
const mapDispatch = dispatch => ({
  getGenres : () => dispatch(fetchGenres()),
  setGenre : (id) => dispatch(setGenre(id))
})

export default connect(mapState, mapDispatch)(PickGenre);
