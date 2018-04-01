import React from 'react'
import { Comment } from 'semantic-ui-react'
import Moment from 'react-moment'

const PostComment = ({ comment }) => (
  <Comment>
    <Comment.Content>
      <Comment.Author as="span">{comment.author}</Comment.Author>
      <Comment.Metadata>
        <Moment format="YYYY/MM/DD @ HH:MM">{comment.timestamp}</Moment>
      </Comment.Metadata>
      <Comment.Text>{comment.body}</Comment.Text>
    </Comment.Content>
  </Comment>
)

export default PostComment
