import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchGenres, setGenres, filterRecommended, fetchRecommended} from "../store"

const styles = {
  transition : 'all 0.2s ease-out'
}
/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor() {
    super();
    this.state = {
      scale: 1
    }
    this.growOnHover= this.growOnHover.bind(this);
    this.shrinkOnLeave = this.shrinkOnLeave.bind(this);
  }
  async componentDidMount () {
  await this.props.getRecommended();
  await this.props.filterRecommended(this.props.recommended);
  await this.props.getGenres(this.props.filtered)
  }
  growOnHover(dir) {
    this.setState({scale: 1.3})
  }
  shrinkOnLeave () {
    this.setState({scale: 1})
  }
  render () {
  const {user} = this.props
  return (
    <div className=" centre-container flex-center hvr-grow" >
      <Link to="/pick"><img onMouseOver={() => this.growOnHover()} onMouseLeave={() => this.shrinkOnLeave()} src="/homeimg.png"/></Link>
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
