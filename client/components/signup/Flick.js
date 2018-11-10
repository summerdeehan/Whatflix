import React from 'react'
import {connect} from 'react-redux'
import { fetchRecommended, addToFavorites, addToWatched, addRecommended } from '../../store'
import {Link} from 'react-router-dom'
import {Swipeable} from 'react-touch'

class Flick extends React.Component {
  constructor() {
    super();
    this.state = {
      recs: []
    }
    this.handleSwipeRight = this.handleSwipeRight.bind(this);
    this.handleSwipeLeft = this.handleSwipeLeft.bind(this);
    this.handleSwipeDown = this.handleSwipeDown.bind(this);
  }
  async componentDidMount () {
    await this.props.fetchRecommended();
    this.setState({recs: this.props.recommended.slice(0, 50)})
  }
  handleSwipeRight (rec) {
    console.log('swiped right')
    this.setState({ recs: this.state.recs.slice(1)})
    this.props.addToFavorites(rec.movieId, rec, this.props.userId)

  }
  handleSwipeLeft (rec) {
    console.log("rec", rec);
    this.setState({ recs: this.state.recs.slice(1)})
    this.props.addToWatched(rec, this.props.userId);
    console.log('swiped left')
  }
  handleSwipeDown (rec) {
    this.setState({ recs: this.state.recs.slice(1)})
    console.log('swiped down')
    this.props.addToWatchList(rec, this.props.userId);
  }
  render() {
    console.log(this.state);
    const rec = this.state.recs[0]
    return (
      rec ?
      <div>
        <Link to="/home"> <button type = "button"> Done </button> </Link>
        <div id="recommended-posters" className="flex-center" key={rec.id}>
          <Swipeable onSwipeRight={() => this.handleSwipeRight(rec)} onSwipeLeft={() => this.handleSwipeLeft(rec)} onSwipeDown={() => this.handleSwipeDown(rec)} >
            <img src={`https://image.tmdb.org/t/p/w500/${rec.poster_path}`}/>
          </Swipeable>
        </div>
    </div>
    :  "No Suggested Movies"
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
