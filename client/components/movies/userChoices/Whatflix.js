import React from 'react'
import { fetchRecommended } from "../../../store"
import {connect} from 'react-redux'

class Whatflix extends React.Component {
constructor() {
  super();

}
componentDidMount() {
  this.props.fetchRecommended()

}
render() {
  console.log("whatflix state" , this.props.state)
  const recommended = this.props.recommended


  //recommended = recommended.slice(0, 50) : [];
  return (
    <div>
      <h1> Checkout These Flix </h1>
      {
        recommended.map(movie => (
          <div key={movie.id}>
            {/* //poster */}
            {movie.title}
            {/* //description
            //press for trailer, reviews */}

          </div>
        ))
      }
    </div>
  )
}
}
const mapState = state => ({
  state: state,
  user: state.user,
  recommended: state.moviePicks.recommended
})
const mapDispatch = dispatch => ({
  fetchRecommended : () => dispatch(fetchRecommended())
})
export default connect(mapState, mapDispatch)(Whatflix)
