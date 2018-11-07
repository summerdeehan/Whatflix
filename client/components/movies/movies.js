import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
class Movies extends React.Component {
  render() {
    return "hello world";
  }
}
const mapState = state => ({
  user: state
})
export default connect(mapState)(Movies)
