import React from 'react'

class SingleMovie extends React.Component {
  constructor() {
    super();

  }
  render() {
    const {movie} = this.props
    return (
      <div id="image-carousel">
        {<img style={{
          width: '100%',
          height: '50%'
        }} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>}
      </div>
    )
  }
}
export default SingleMovie;
