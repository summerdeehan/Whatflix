import React from 'react'
import {connect} from 'react-redux'
import { getRecomended, addToFavorites, addToWatched } from '../../store'
import {Link} from 'react-router-dom'

class Flick extends React.Component {
  // constructor() {
  //   super();
  //   //this.handleChange = this.handleChange.bind(this);
  // }
  componentDidMount () {
    //fetchRecommended();
  }
  render() {
    return (
      <h1>Please Select An Option For Each Movie</h1>
    )
  }
}

const mapState = state => ({
  userId: state.user.id
  // favoriteCount : state.moviePicks.countFaves
})
const mapDispatch = dispatch => ({
  //searchMovies: (movie) => dispatch(searchMovie(movie))
})
export default connect(mapState, mapDispatch)(Flick)
