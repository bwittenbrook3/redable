import React from 'react'
import { connect } from 'react-redux'
import { Comment } from 'semantic-ui-react'
import Moment from 'react-moment'
import { voteOnComment } from 'actions'

import Vote from './Vote'

const PostComment = ({ comment, upvote, downvote }) => (
  <div className="PostComment">

    <Vote
      small
      voteScore={comment.voteScore}
      upvote={upvote}
      downvote={downvote}
    />

    <Comment>
      <Comment.Content>
        <Comment.Author as="span">{comment.author}</Comment.Author>
        <Comment.Metadata>
          <Moment format="YYYY/MM/DD @ HH:MM">{comment.timestamp}</Moment>
        </Comment.Metadata>
        <Comment.Text>{comment.body}</Comment.Text>
      </Comment.Content>
    </Comment>

    <div className="clearfix"></div>

    <style jsx>{`
      div {
        margin: 25px 0;
      }
      div :global(.comment) {
        float: left;
      }
      .clearfix {
        clear: both;
      }
    `}</style>
  </div>
)

const mapDispatchToProps = (dispatch, { comment }) => (
  {
    upvote: () => dispatch(voteOnComment(comment, 'upVote')),
    downvote: () => dispatch(voteOnComment(comment, 'downVote'))
  }
)

export default connect(null, mapDispatchToProps)(PostComment)
