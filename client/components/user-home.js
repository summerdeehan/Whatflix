import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchSessionToken, fetchToken } from '../store';
import {Route} from 'react-router-dom'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {

  async componentDidMount() {
    try {
      await this.props.fetchToken()
      this.props.fetchSessionToken({ "request_token" : this.props.accessToken});
    }
    catch (err) {
        console.error(err);
    }
  }
  render () {
  const accessToken = this.props.accessToken;
  const redirectLink = "http://localhost:8090/movies";



  const {email} = this.props
  return (
    <div>
      <Link path='/authenticate' component={() => window.location = `/https://www.themoviedb.org/authenticate/${accessToken}?redirect_to=${redirectLink}`}/>
    </div>
  )
 }
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log(state)
  return {
    email: state.user.email,
    accessToken: state.movie.accessToken
  }
}
const mapDispatch = dispatch => {
  return {
    fetchToken: () => dispatch(fetchToken()),
    fetchSessionToken: (token) => dispatch(fetchSessionToken(token))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
