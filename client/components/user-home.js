import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


/**
 * COMPONENT
 */
export class UserHome extends React.Component {
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
    user: state.user.email
  })
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
