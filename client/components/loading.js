import React from 'react'
import history from '../history'

const Loading = () => {
  return (
    <div>
      <p> Loading... </p>
      {setTimeout(()=> history.push('/whatflix'), 1000)}
    </div>
  )
}

export default Loading;
