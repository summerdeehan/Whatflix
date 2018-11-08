import React from 'react'
import {SearchMovies} from '../'

class SignupData extends React.Component {
render () {
  return (
    <div>
      <h1> Please Tell Us A Bit More... </h1>
      <p>NB. Please enter at least 10 movies to optimize our recommendations, the more the better!</p>
      <SearchMovies use="favorite"/>
    </div>
  )
}
}

export default SignupData;
