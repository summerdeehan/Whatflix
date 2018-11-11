import React from 'react'
import {connect} from 'react-redux'
import { fetchWatchList } from '../../store'
import {Link} from 'react-router-dom'

class WatchList extends React.Component {
  render () {
    return (
      <div>
        {this.props.watch.map(movie=> {
          return (
            <p key={movie.id}>{movie.title}</p>
          )
        })}
      </div>
    )
  }
}
const mapState=(state) => ({
  watch: state.results.watchList
})
const mapDispatch=(dispatch) => ({
  fetchWatchList: (dispatch(fetchWatchList()))
})
export default connect(mapState, mapDispatch)(WatchList)
