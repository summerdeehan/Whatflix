import React from 'react'
import PickGenre from './PickGenre'

class UserChoices extends React.Component {
render () {
  return (
    <div>
      <h1>Find a Movie</h1>
      <PickGenre />
    </div>
  )
}
}

export default UserChoices;
