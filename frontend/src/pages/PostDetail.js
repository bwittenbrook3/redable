import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Comment, Icon, Header  } from 'semantic-ui-react'
import { getPost, fetchPostComments, voteOnPost } from 'actions'
import _ from 'lodash'

import PostListView from 'components/PostListView'
import PostComment from 'components/PostComment'
import NewComment from 'components/NewComment'

class PostDetail extends Component {

  componentDidMount() {
    const { match } = this.props
    this.props.getPost(match.params.id)
    this.props.fetchPostComments(match.params.id)
  }

  render() {
    const { post, comments, history } = this.props
    const orderedComments = _.sortBy(comments, 'voteScore').reverse()

    return(
      <div className="PostDetail">

        <a onClick={() => history.push('/')}>
          <Icon name="reply" />back to all posts
        </a>

        <div className="ui divider"></div>

        {post &&
          <div className="post">
            <Comment.Group size="massive">
              {post &&
                <PostListView post={post} />
              }
            </Comment.Group>

            <p className="post-body">
              {post.body}
            </p>

          </div>
        }



        <Comment.Group size="large">
          <Header as='h3' dividing>Comments</Header>
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

            .post-body {
              font-size: 20px;
              margin-left: 100px;
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
