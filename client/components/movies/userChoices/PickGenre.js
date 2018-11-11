import React from 'react'
import {fetchGenres, setGenres, setMovieIds, filterRecommended, fetchRecommended} from "../../../store"
import { connect } from 'react-redux'
import history from '../../../history'
import {Link} from 'react-router-dom'

class PickGenre extends React.Component {
constructor() {
  super();
  this.state = {
    movieIds: []
  }
  this.pickGenre=this.pickGenre.bind(this);
}
componentDidMount() {
  // this.props.getRecommended()
  // this.props.filterRecommended(this.props.recommended)
  // this.props.getGenres(this.props.filtered)

  //this.props.getGenres();
}
pickGenre(movieIdsArr) {
  const movieIds = this.state.movieIds;
  !movieIds ? this.setState({movieIds: 0})
  : movieIdsArr.map(id=> {
    if (!this.state.movieIds.includes(id)) movieIds.push(id)
  })
   this.setState({movieIds})
   console.log("movieIDs" , movieIds)
}
render () {
  const genres = Object.keys(this.props.genres).map(key => {
    return [key, this.props.genres[key][0], this.props.genres[key][1], this.props.genres[key][2] ]
  })
  genres.sort((a,b) => {
    return b[2] - a[2]
  });
  console.log(genres);
  return (
    <div>
      <div type="button" className="pick-buttons" > Any </div>
      <Link to="/whatflix"><button type="button" onClick={() => this.props.setGenreMovieIds(this.state.movieIds)}> Submit </button></Link>
      <div className="flex-row">
        {genres.map(genre => {
          return (
            <div key={genre[0]} type="button" className="pick-buttons hvr-grow-shadow" onClick={() => this.pickGenre(genre[3])}> {genre[1]} </div>
          )
        })}
      </div>
    </div>

  )
}
}
const mapState = state => ({
  recommended: state.moviePicks.recommended,
  genres: state.moviePicks.genres,
  filtered: state.results.filteredPicks
})
const mapDispatch = dispatch => ({
  getRecommended: () => dispatch(fetchRecommended()),
  getGenres : (rec) => dispatch(fetchGenres(rec)),
  setGenres : (id) => dispatch(setGenres(id)),
  filterRecommended: (rec) => dispatch(filterRecommended(rec)),
  setGenreMovieIds: (ids) => dispatch(setMovieIds(ids))
})

export default connect(mapState, mapDispatch)(PickGenre);
