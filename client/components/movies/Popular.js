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
        <div className="centre-title">
          <h1>Trending Now: </h1>
        </div>
        <div className="movie-list-center">
        {this.props.popular.map(movie=> {
          return (
              <div id="movie-search"  key={movie.id} onClick={()=> this.handleSelect(use, movie,  this.props.user.id)}>
                <div className="centre">
                  <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
                </div>
                <div className="centre-container-col centre">
                  <h3  > {movie.title} </h3>
                  <p  > {movie.overview} </p>
                </div>
              </div>
              )
            })}

          </div>
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
