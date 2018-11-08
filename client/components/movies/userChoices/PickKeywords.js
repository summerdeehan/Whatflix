import React from 'react'
import {searchKeyword, fetchKeywords, selectKeyword } from "../../../store"
import { connect } from 'react-redux'

class PickKeywords extends React.Component {
constructor() {
  super();
}
componentDidMount() {
  //this.props.fetchKeywords();
}
pickKeyword(id) {
  //this.props.selectKeyword(id)
}
render () {
  return (
    <div>
      <h1> Please Pick Keywords </h1>
      {/* {this.props.keywords.map(keyword => {
        const keywordId = keyword.movieDBId
        return (
          <div key={keyword.id}>
            <button type="button" onClick={() => this.pickKeyword(keywordId)}> {keyword.name} </button>
          </div>
        )
      })} */}
      <input type="text" name="keyword" placeholder="Search for keyword.."  />
    </div>
  )
}
}
const mapState = state => ({
  genres: state
})
const mapDispatch = dispatch => ({
  fetchKeywords : () => dispatch(fetchKeywords()),
  findKeyword : (searchVal) => dispatch(searchKeyword(searchVal)),
  selectKeyword: (id) => dispatch(selectKeyword(id))
})

export default connect(mapState, mapDispatch)(PickKeywords);
