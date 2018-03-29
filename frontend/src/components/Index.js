import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import Post from './Post'

class Index extends Component {

  render() {
    const { posts } = this.props;

    return(
      <div className="App">
        {posts.map( post =>
          <Post
            key={post.id}
            post={post}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: _.values(state.posts),
    categories: _.values(state.categories)
  }
}

export default connect(mapStateToProps)(Index);
