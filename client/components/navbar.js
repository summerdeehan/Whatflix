import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
    <div id="nav">
        <div id="logo">
          <Link to="/home">
            <img src="/logo.png"/>
            {/* /<img src="/movie-title.png"/> */}
          </Link>
        </div>


      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/popular">Trending</Link>
          <Link to="/signup-data">Pick</Link>
          <Link to="/flick">Flick</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/watchList">Watch-List</Link>


          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </div>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
