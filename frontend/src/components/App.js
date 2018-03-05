import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts } from 'actions'
import logo from 'logo.svg'
import { colors } from 'styles'
import _ from 'lodash'
import Post from './Post'

class App extends Component {

  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    return (
      <div className="App">
        {this.props.posts.map( post =>
          <Post
            key={post.id}
            post={post}
          />
        )}

        <style jsx>{`

          p {
            color: ${colors.primary};
          }
        `}</style>
      </div>
    );
  }
}



const mapStateToProps = (state, ownProps) => {
  return {
    posts: _.values(state.posts)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPosts: () => {
      dispatch(getPosts())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
