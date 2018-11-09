import React from 'react'
import {connect} from 'react-redux'
import { fetchRecommended, addToFavorites, addToWatched, addRecommended } from '../../store'
import {Link} from 'react-router-dom'

class Flick extends React.Component {
  // constructor() {
  //   super();
  //   //this.handleChange = this.handleChange.bind(this);
  // }
  componentDidMount () {
    this.props.fetchRecommended();
  }
  render() {
    const recommended = this.props.recommended.slice(0, 50);
    return (
      <div>
        <h1>Please Select An Option For Each Movie</h1>

      {recommended.map(rec => (
        //get img and description
        <div key={rec.id}>
          <h4> {rec.title} </h4>
          <button type="button" onClick={() => this.props.addToWatched({title: rec.title, movieId: rec.movieId}, this.props.userId)}>Seen Dont Like</button>
          <button type="button" onClick={() => this.props.addToWatchList(rec, this.props.userId)}>Not seen</button>
          <button type="button" onClick={() => this.props.addToFavorites(rec.id, rec, this.props.userId)}>Favorite</button>
        </div>
        ))
      }
      <Link to="/home"> <button> Register </button> </Link>
    </div>
    )
  }
}

const mapState = state => ({
  userId: state.user.id,
  recommended : state.moviePicks.recommended
})
const mapDispatch = dispatch => ({
  fetchRecommended: () => dispatch(fetchRecommended()),
  addToWatched: (movie, userId) => dispatch(addToWatched(movie, userId)),
  addToWatchList: (movie, userId) => dispatch(addRecommended(movie, userId)),
  addToFavorites: (movieId, movie, userId) => dispatch(addToFavorites(movieId, movie, userId))
})
export default connect(mapState, mapDispatch)(Flick)
