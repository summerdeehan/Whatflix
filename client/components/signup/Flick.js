import React from 'react'
import {connect} from 'react-redux'
import { fetchRecommended, addToFavorites, addToWatched, addRecommended } from '../../store'
import {Link} from 'react-router-dom'
import {Swipeable} from 'react-touch'

const styles = {
  transition : 'all 0.2s ease-out'
}

class Flick extends React.Component {
  constructor() {
    super();
    this.state = {
      recs: [],
      scaleLeft: 1,
      scaleRight: 1,
      scaleDown: 1
    }
    this.handleSwipeRight = this.handleSwipeRight.bind(this);
    this.handleSwipeLeft = this.handleSwipeLeft.bind(this);
    this.handleSwipeDown = this.handleSwipeDown.bind(this);
    this.growOnHover= this.growOnHover.bind(this);
    this.shrinkOnLeave = this.shrinkOnLeave.bind(this);
  }
  async componentDidMount () {
    await this.props.fetchRecommended();
    this.setState({recs: this.props.recommended.slice(0, 50)})
  }
  handleSwipeRight (rec) {
    this.setState({ recs: this.state.recs.slice(1)})
    this.props.addToFavorites(rec.movieId, rec, this.props.userId)

  }
  handleSwipeLeft (rec) {
    this.setState({ recs: this.state.recs.slice(1)})
    this.props.addToWatched(rec, this.props.userId);
  }
  handleSwipeDown (rec) {
    this.setState({ recs: this.state.recs.slice(1)})
    this.props.addToWatchList(rec, this.props.userId);
  }
  growOnHover(dir) {
    switch(dir){
    case "right":
      this.setState({scaleRight: 1.3})
      break;
    case "left":
      this.setState({scaleLeft: 1.3})
      break;
    case "down":
      this.setState({scaleDown: 1.3})
      break;
    default:
      break;
    }
  }
  shrinkOnLeave (dir) {
    switch(dir){
      case "right":
        this.setState({scaleRight: 1})
        break;
      case "left":
        this.setState({scaleLeft: 1})
        break;
      case "down":
        this.setState({scaleDown: 1})
        break;
      default:
        break;
    }
  }
  render() {
    const rec = this.state.recs[0]
    return (
      rec ?
      <div className="centre-container no-wrap">
        <div ><Link to="/home" > <button type="button" className="button-style top-right-button"> Done </button> </Link></div>
        <div  className="flex-center" key={rec.id}>
          <img onClick={()=> this.handleSwipeLeft(rec)} onMouseOver={() => this.growOnHover("left")} onMouseLeave={() => this.shrinkOnLeave("left")} className="thumb-right" src={"/thumbs-down.png"} style={{...styles, transform: `scale(${this.state.scaleLeft})`}}/>
            <div className="flex-col">
              <img id="recommended-posters" src={`https://image.tmdb.org/t/p/w500/${rec.poster_path}`}/>
              <div className="flex-center watch"><img className="flex-center watch" onMouseOver={() => this.growOnHover("down")} onMouseLeave={() => this.shrinkOnLeave("down")} onClick={() => this.handleSwipeDown(rec)} id="add" src={"/down-arrow.png"} style={{...styles, transform: `scale(${this.state.scaleDown})`}}/></div>
            </div>
          <img onMouseOver={() => this.growOnHover("right")} onMouseLeave={() => this.shrinkOnLeave("right")} onClick={() => this.handleSwipeRight(rec)} className="thumb-left" src={"/thumbs-up.png"} style={{...styles, transform: `scale(${this.state.scaleRight})`}}/>
        </div>
    </div>
    :  <div className="container-center centre-title para-text">No Suggested Movies</div>
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
