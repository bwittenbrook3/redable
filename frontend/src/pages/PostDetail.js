import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Comment, Icon  } from 'semantic-ui-react'
import { getPost, fetchPostComments, voteOnPost } from 'actions'
import Moment from 'react-moment'
import _ from 'lodash'

import PostComment from 'components/PostComment'
import NewComment from 'components/NewComment'
import Vote from 'components/Vote'

class PostDetail extends Component {

  componentDidMount() {
    const { match } = this.props
    this.props.getPost(match.params.id)
    this.props.fetchPostComments(match.params.id)
  }

  render() {
    const { post, comments, history, upvote, downvote } = this.props
    const orderedComments = _.sortBy(comments, 'voteScore').reverse()

    return(
      <div className="PostDetail">


        <a onClick={() => history.push('/')}>
          <Icon name="reply" />back to all posts
        </a>

        <div className="post">

          <Vote
            voteScore={post && post.voteScore}
            upvote={() => upvote(post)}
            downvote={() => downvote(post)}
          />

          <div className="content">
            <h1 className="ui header">
              {post && post.title}
              <div className="sub header">
                Posted by <b>{post && post.author}</b> at <Moment format="YYYY/MM/DD @ HH:MM">{post && post.timestamp}</Moment>
              </div>
            </h1>

            <p className="ui header b">
              {post && post.body}
            </p>
          </div>

          <div className="clearfix"></div>

        </div>


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

          .content {
            float: left;
          }

          .post {
            margin-top: 20px;
            margin-bottom: 50px;
            font-size: 25px;

            p {
              font-size: 20px;
            }
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



const mapDispatchToProps = (dispatch, {post}) => {
  return {
    getPost: id => dispatch(getPost(id)),
    fetchPostComments: id => dispatch(fetchPostComments(id)),
    upvote: (post) => dispatch(voteOnPost(post, 'upVote')),
    downvote: (post) => dispatch(voteOnPost(post, 'downVote')),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
