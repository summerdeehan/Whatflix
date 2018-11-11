import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchGenres, setGenres, filterRecommended, fetchRecommended} from "../store"


/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  async componentDidMount () {
  await this.props.getRecommended();
  await this.props.filterRecommended(this.props.recommended);
  await this.props.getGenres(this.props.filtered)
  }
  render () {
  const {user} = this.props
  return (
    <div>
      <div>Welcome {user}</div>
      <Link to="/pick"><button type="button"> Find me a Flick! </button></Link>


    </div>

  )
 }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return ({
    user: state.user.email,
    recommended: state.moviePicks.recommended,
    filtered: state.results.filteredPicks
  })
}
const mapDispatch = dispatch => ({
  getRecommended: () => dispatch(fetchRecommended()),
  getGenres : (rec) => dispatch(fetchGenres(rec)),
  setGenres : (id) => dispatch(setGenres(id)),
  filterRecommended: (rec) => dispatch(filterRecommended(rec))
})

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
