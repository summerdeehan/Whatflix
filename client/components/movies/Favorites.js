import React from 'react'
import {connect} from 'react-redux'
import { fetchFavorites } from '../../store'
import {Link} from 'react-router-dom'


class Favorites extends React.Component {
  componentDidMount () {
    this.props.fetchFavorites();
  }
  render () {
    console.log(this.props)
    return (
      <div>
        {this.props.favorites.map(movie=> {
          return (
            <p key={movie.id}> {movie.title} </p>
          )
        })}
      </div>
    )
  }
}
const mapState=(state) => ({
  favorites: state.results.favorites
})
const mapDispatch=(dispatch) => ({
  fetchFavorites: () => dispatch(fetchFavorites())
})
export default connect(mapState, mapDispatch)(Favorites)
