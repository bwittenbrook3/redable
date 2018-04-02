import React from 'react'
import { connect } from 'react-redux'
import { Comment } from 'semantic-ui-react'
import Moment from 'react-moment'
import { voteOnComment } from 'actions'

import Vote from './Vote'

const PostComment = ({ comment, upvote, downvote }) => (
  <Comment className="PostComment">

    <Vote
      small
      voteScore={comment.voteScore}
      upvote={upvote}
      downvote={downvote}
    />

    <Comment.Content>
      <Comment.Author as="span">{comment.author}</Comment.Author>
      <Comment.Metadata>
        <Moment format="MMMM Do YYYY, h:mm a">{comment.timestamp}</Moment>
      </Comment.Metadata>
      <Comment.Text>{comment.body}</Comment.Text>
    </Comment.Content>
    
    <style jsx>{`
      :global(.metadata) {
        display: block !important;
        margin-left: 0 !important;
        b {
          margin: 0 !important;
        }
      }

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
  </Comment>
)

const mapDispatchToProps = (dispatch, { comment }) => (
  {
    upvote: () => dispatch(voteOnComment(comment, 'upVote')),
    downvote: () => dispatch(voteOnComment(comment, 'downVote'))
  }
)

export default connect(null, mapDispatchToProps)(PostComment)
