import React, { Component } from 'react'

class Post extends Component {

  render() {
    const { post } = this.props

    return (
      <div>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>
    )
  }
}

export default Post
