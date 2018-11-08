import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'


/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  render () {
  const {user} = this.props
  return (
    <div>Welcome {user}</div>
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
