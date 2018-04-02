import React from 'react'
import { Comment, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { voteOnPost } from 'actions'
import { withRouter } from 'react-router-dom'

import Vote from './Vote'

const PostListView = ({ post, downvote, upvote , history }) => (
  <Comment className="PostListView">
    <Vote
      voteScore={post.voteScore}
      upvote={upvote}
      downvote={downvote}
    />

    <Comment.Content>
      <Link to={`/${post.category}/${post.id}`}>
        <Comment.Author>{post.title}</Comment.Author>
        <Comment.Metadata>
          Posted by <b>{post.author}</b> on <Moment format="MMMM Do YYYY, h:mm a">{post.timestamp}</Moment>
        </Comment.Metadata>
      </Link>
    </Comment.Content>
    <Comment.Actions>
      <Label
        className="comment-label"
        content={post.commentCount}
        icon="comment"
      />
      <Comment.Action
        onClick={() => history.push(`/${post.category}/${post.id}/edit`)}
      >
        Edit
      </Comment.Action>
    </Comment.Actions>


    {/* <div className="actions">
      <Link to={`/${post.category}/${post.id}`}>
      <Label
      content={post.commentCount}
      icon="comment"
      />
        </Link>
        <Button
      basic
      content="edit"
      size="mini"
      onClick={() => history.push(`/${post.category}/${post.id}/edit`)}
        />
        <Button
      basic
      content="delete"
      size="mini"
        />
      </div>
    </div> */}

    <div className="clearfix"></div>

    <style jsx>{`
      :global(.comment-label) {
        margin-right: 20px !important;
        :global(i.icon) {
          padding-right: 10px !important;
        }
      }
      :global(.metadata) {
        display: block !important;
        b {
          margin: 0 !important;
        }
      }
    `}</style>
  </Comment>
)

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    upvote: () => dispatch(voteOnPost(ownProps.post, 'upVote')),
    downvote: () => dispatch(voteOnPost(ownProps.post, 'downVote'))
  }
)

export default withRouter(connect(null, mapDispatchToProps)(PostListView))
