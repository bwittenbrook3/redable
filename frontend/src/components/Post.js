import React, { Component } from 'react'

class Post extends Component {

  render() {
    const { post } = this.props

    return (
      <div className="post">
        <h1 className="ui header">{post.title}</h1>
        <p>{post.body}</p>


        <style jsx>{`
          div.post {
            margin: 20px 0;
          }

          h1.ui.header {
            margin-bottom: 0px;
          }
        `}</style>
      </div>
    )
  }
}

export default Post
