import React from 'react'
import {SearchMovies} from '../'
import {Link} from 'react-router-dom'

class SignupData extends React.Component {
render () {
  return (
    <div className='centre-container-col'>
      <div>
        <h1 className='centre-title'> Please Tell Us A Bit More... </h1>
        <Link to="/flick"> <h1 className="text-right" type="button"> Continue  </h1> </Link>
      </div>
      <p className='para-text'>NB. Please enter at least 10 movies to optimize our recommendations, the more the better!</p>

      <div className='centre-container-col'>
        <SearchMovies use="favorite"/>
      </div>
    </div>
  )
}
}

export default SignupData;
