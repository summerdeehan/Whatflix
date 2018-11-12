import React from 'react'
import { fetchRecommended } from "../../../store"
import {connect} from 'react-redux'
import history from '../../../history'
import SingleMovie from './SingleMovie.js'
import Coverflow from 'react-coverflow';
import { StyleRoot } from 'radium';
import {Link} from 'react-router-dom';

class Whatflix extends React.Component {
constructor() {
  super();
  this.handleSelect = this.handleSelect.bind(this);
}
componentDidMount() {
  this.props.fetchRecommended();
  //fetch watch list ids in array- take out any that are in finalArr
  return !this.props.movieIds ? this.props.movieIds.length && history.push('/pick') : null;

}
handleSelect(movieId) {
  this.props.history.push(`/movie/${movieId}`)
}
render() {
  const {movieIds} = this.props;
  const containsId = movieIds ? this.props.recommended.filter(rec => movieIds.includes(rec.movieId)): [];
  // const containsGenreAndKeys = containsGenre.filter(rec => {
  //   console.log("keys", keywords)
  //   for (let i=0; i< keywords.length; i++ ) {
  //     return rec.keywords && rec.keywords.includes(keywords[i]);
  //   }
  // })
  //console.log("contains g and k", containsGenreAndKeys);

  const recommended = this.props.recommended
  return (
    <div>
        <StyleRoot>
          <Coverflow
              clickable={true}
              displayQuantityOfSide={2}
              navigation
              infiniteScroll
              enableHeading
              height='100%'
              media={{
                '@media ': {
                  width: '85vw',
                  height: '75vh'
                }
              }}
            >
            {
              containsId ? containsId.length && containsId.map(movie => (
                // <Link key={movie.id} to={`/movie/${movieId}`}>
                  <div key={movie.id} onClick={() => this.handleSelect(movie.movieId)}>
                    <SingleMovie movie={movie}/>
                  </div>
                // </Link>
              ))
              : recommended.map(movie => (
                  <div key={movie.id} onClick={() => this.handleSelect(movie.movieId)}>
                    <SingleMovie movie={movie}/>
                  </div>
              ))
            }
          </Coverflow>
        </StyleRoot>
      {/* {
        containsGenre.filter(rec => !containsGenreAndKeys.includes(rec)).map(movie => (
          <div key={movie.id}>
            <SingleMovie movie={movie}/>
          </div>
        ))
      } */}
    </div>
  )
}
}
const mapState = state => ({
  movieIds: state.moviePicks.genreMovieIds,
  keywords: state.moviePicks.selectedKeywords,
  recommended: state.results.filteredPicks
})
const mapDispatch = dispatch => ({
  fetchRecommended : () => dispatch(fetchRecommended())
})
export default connect(mapState, mapDispatch)(Whatflix)
