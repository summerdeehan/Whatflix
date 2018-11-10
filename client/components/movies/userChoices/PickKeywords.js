import React from 'react'
import {searchKeyword, fetchKeywords, setKeywords } from "../../../store"
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class PickKeywords extends React.Component {
constructor() {
  super();
  this.state = {
    keywords: []
  }
  this.pickKeyword = this.pickKeyword.bind(this);
}
componentDidMount() {
  this.props.fetchKeywords();
  console.log(this.props)
}
pickKeyword(id) {
  const keywords = this.state.keywords
  keywords.push(id);
  this.setState({keywords})
}
render () {
  return (
    <div>
      <h1> Please Pick Keywords </h1>
      <input type="text" name="keyword" placeholder="Search for keyword.."  />
      <Link to="/loading"><button type="button" onClick={()=> {this.props.selectKeywords(this.state.keywords)}}> Whatflix?! </button></ Link>
      <div className="flex-row">
          {this.props.keywords && this.props.keywords.length && this.props.keywords.slice(0,70).map(keyword => {
            const keywordId = keyword.movieDBId
            return (
              <div className="pick-buttons" key={keyword.id} onClick={() => this.pickKeyword(keywordId, this.props.user.id)}> {keyword.name} </div>
            )
          })}
      </div>
    </div>
  )
}
}
const mapState = state => ({
  genres: state.moviePicks.genres,
  keywords: state.moviePicks.keywords,
  user: state.user,
})
const mapDispatch = dispatch => ({
  fetchKeywords : () => dispatch(fetchKeywords()),
  findKeyword : (searchVal) => dispatch(searchKeyword(searchVal)),
  selectKeywords: (idArr) => dispatch(setKeywords(idArr))
})

export default connect(mapState, mapDispatch)(PickKeywords);
