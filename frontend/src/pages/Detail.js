import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Comment, Icon, Segment } from 'semantic-ui-react'
import { getPost, fetchPostComments } from 'actions'
import Moment from 'react-moment'
import _ from 'lodash'

import PostComment from 'components/PostComment'
import NewComment from 'components/NewComment'

class Detail extends Component {

  componentDidMount() {
    const { match } = this.props
    this.props.getPost(match.params.id)
    this.props.fetchPostComments(match.params.id)
  }

  render() {
    const { post, comments, history } = this.props
    const orderedComments = _.sortBy(comments, 'timestamp')

    return(
      <div className="PostDetail">
        <a onClick={() => history.push('/')}>
          <Icon name="reply" />back to all posts
        </a>

        <Segment>
          <h1 className="ui header">
            {post && post.title}
            <div className="sub header">
              Posted by <b>{post && post.author}</b> at <Moment format="YYYY/MM/DD @ HH:MM">{post && post.timestamp}</Moment>
            </div>
          </h1>

          <p className="ui header">
            {post && post.body}
          </p>
        </Segment>


        <Comment.Group>
          {orderedComments.map(comment =>
            <PostComment
              key={comment.id}
              comment={comment}
            />
          )}
          <NewComment
            parentId={post && post.id}
          />
        </Comment.Group>

        <style jsx>{`
          div > a {
            cursor: pointer;
          }
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps
  const { id } = match.params

  return {
    post: state.posts[id],
    comments: _.values(state.comments).filter(post => post.parentId === id)
  }
}



const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPost: id => dispatch(getPost(id)),
    fetchPostComments: id => dispatch(fetchPostComments(id))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Detail)
