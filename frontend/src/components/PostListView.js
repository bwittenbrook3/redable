import React from 'react'
import { Button, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { voteOnPost } from 'actions'
import { withRouter } from 'react-router-dom'

import Vote from './Vote'

const PostListView = ({ post, downvote, upvote , history }) => (
  <div className="post">
    <Vote
      voteScore={post.voteScore}
      upvote={upvote}
      downvote={downvote}
    />
    <div className="content">
      <Link to={`/${post.category}/${post.id}`}>
        <h1 className="ui header">
          {post.title}
          <div className="sub header">
            Posted by <b>{post.author}</b> at <Moment format="YYYY/MM/DD @ HH:MM">{post.timestamp}</Moment>
          </div>
        </h1>
      </Link>

      <div className="actions">
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
    </div>

    <div className="clearfix"></div>

    <style jsx>{`
      div.post {
        clear: both;
        margin: 20px 20px;
      }

      h1.ui.header {
        margin-bottom: 5px;
      }

      div.content {
        float: left;
        margin: 5px 0 0 10px;
      }

      div.actions :global(.ui.button) {
        margin-left: 15px;
      }

      .clearfix {
        clear: both;
      }
    `}</style>
  </div>
)

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    upvote: () => dispatch(voteOnPost(ownProps.post, 'upVote')),
    downvote: () => dispatch(voteOnPost(ownProps.post, 'downVote'))
  }
)

export default withRouter(connect(null, mapDispatchToProps)(PostListView))
