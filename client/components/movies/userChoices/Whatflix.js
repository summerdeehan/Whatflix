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
  return !this.props.genres.length ? history.push('/pick') : null;

}
handleSelect(movieId) {
  this.props.history.push(`/movie/${movieId}`)
}
render() {
  //const {genres, keywords} = this.props;
  // const containsGenre = this.props.recommended.filter(rec => {
  //   for (let i=0; i< genres.length; i++ ) {
  //     return rec.genre_ids.includes(genres[i])
  //   }})
  // const containsGenreAndKeys = containsGenre.filter(rec => {
  //   console.log("keys", keywords)
  //   for (let i=0; i< keywords.length; i++ ) {
  //     return rec.keywords && rec.keywords.includes(keywords[i]);
  //   }
  // })
  //console.log("contains g and k", containsGenreAndKeys);

  const recommended = this.props.recommended ? this.props.recommended.slice(0, 50) : [];
  return (
    <div>
      <h1> Movies </h1>
        <StyleRoot>
          <Coverflow
              clickable={true}
              displayQuantityOfSide={2}
              navigation
              infiniteScroll
              enableHeading
              media={{
                '@media (max-width: 900px)': {
                  width: '600px',
                  height: '300px'
                },
                '@media (min-width: 900px)': {
                  width: '960px',
                  height: '600px'
                }
              }}
            >
            {
              recommended.map(movie => (
                // <Link key={movie.id} to={`/movie/${movieId}`}>
                  <div key={movie.id} onClick={() => this.handleSelect(movie.movieId)}>
                    <SingleMovie movie={movie}/>
                  </div>
                // </Link>
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
  genres: state.moviePicks.genres,
  keywords: state.moviePicks.selectedKeywords,
  recommended: state.moviePicks.recommended
})
const mapDispatch = dispatch => ({
  fetchRecommended : () => dispatch(fetchRecommended())
})
export default connect(mapState, mapDispatch)(Whatflix)
