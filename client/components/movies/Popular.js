import React from 'react'
import {connect} from 'react-redux'
import { getPopular } from '../../store'
import {Link} from 'react-router-dom'


class Popular extends React.Component {
  componentDidMount () {
  }
  render () {
    return (
      <div>
        {this.props.popular.map(movie=> {
          return (
            <p key={movie.id}>{movie.title}</p>
          )
        })}
      </div>
    )
  }
}
const mapState=(state) => ({
  popular: state.results.popular
})
const mapDispatch=(dispatch) => ({
  fetchPopular: (dispatch(getPopular()))
})
export default connect(mapState, mapDispatch)(Popular)
